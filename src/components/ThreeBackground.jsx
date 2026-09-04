import { Suspense, memo, useMemo, useRef, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import usePerfTier from '../hooks/usePerfTier'

const SIZE = 36
const SEGS = 40        // fewer segments → cheaper vertex loop (1681 verts)

const COLOR_DEEP = '#4b1b32'
const COLOR_MID  = '#db2777'
const COLOR_HIGH = '#22d3ee'

function Terrain() {
  const geometry = useMemo(() => {
    const g = new THREE.PlaneGeometry(SIZE, SIZE, SEGS, SEGS)
    g.rotateX(-Math.PI / 2)
    const colors = new Float32Array(g.attributes.position.array.length)
    g.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    g.userData.base = g.attributes.position.array.slice()
    return g
  }, [])

  // Precompute a small color lookup gradient once — avoids per-vertex
  // Color.lerp allocations and buffer color re-uploads every frame.
  const colorLUT = useMemo(() => {
    const steps = 32
    const cDeep = new THREE.Color(COLOR_DEEP)
    const cMid = new THREE.Color(COLOR_MID)
    const cHigh = new THREE.Color(COLOR_HIGH)
    const tmp = new THREE.Color()
    const lut = new Float32Array(steps * 3)
    for (let i = 0; i < steps; i++) {
      const c = i / (steps - 1)
      if (c < 0.5) tmp.copy(cDeep).lerp(cMid, c * 2)
      else tmp.copy(cMid).lerp(cHigh, (c - 0.5) * 2)
      lut[i * 3] = tmp.r
      lut[i * 3 + 1] = tmp.g
      lut[i * 3 + 2] = tmp.b
    }
    return { lut, steps }
  }, [])

  const frameCount = useRef(0)

  useFrame((state) => {
    // Throttle: only update every 3rd frame (~20fps for the wave motion,
    // which is plenty for a slow ambient background).
    frameCount.current++
    if (frameCount.current % 3 !== 0) return

    const t = state.clock.elapsedTime * 0.28
    const positions = geometry.attributes.position.array
    const colors = geometry.attributes.color.array
    const base = geometry.userData.base
    const { lut, steps } = colorLUT
    const maxIdx = steps - 1

    for (let i = 0; i < positions.length; i += 3) {
      const x = base[i]
      const z = base[i + 2]

      const h =
        Math.sin(x * 0.22 + t) * 0.55 +
        Math.cos(z * 0.27 - t * 0.7) * 0.45 +
        Math.sin((x + z) * 0.14 + t * 0.5) * 0.70

      positions[i + 1] = h

      const tint = (h + 1.7) / 3.4
      const c = tint < 0 ? 0 : tint > 1 ? 1 : tint
      const li = (c * maxIdx + 0.5) | 0
      const o = li * 3
      colors[i] = lut[o]
      colors[i + 1] = lut[o + 1]
      colors[i + 2] = lut[o + 2]
    }

    geometry.attributes.position.needsUpdate = true
    geometry.attributes.color.needsUpdate = true
  })

  return (
    <mesh geometry={geometry} position={[0, -0.5, 0]}>
      <meshBasicMaterial
        wireframe
        vertexColors
        transparent
        opacity={0.38}
        depthWrite={false}
      />
    </mesh>
  )
}

function CameraRig() {
  const baseY = 3.2
  const baseZ = 7
  const lookAt = useMemo(() => new THREE.Vector3(0, -0.8, -2), [])
  const targetPos = useRef({ x: 0, y: 0 })

  useFrame((state, delta) => {
    const k = Math.min(1, delta * 3)
    targetPos.current.x += (state.pointer.x * 0.6 - targetPos.current.x) * k
    targetPos.current.y += (state.pointer.y * 0.35 - targetPos.current.y) * k

    state.camera.position.x = targetPos.current.x
    state.camera.position.y = baseY + targetPos.current.y
    state.camera.position.z = baseZ
    state.camera.lookAt(lookAt)
  })

  return null
}

function Scene() {
  return (
    <>
      <fogExp2 attach="fog" args={['#070318', 0.05]} />
      <Terrain />
      <CameraRig />
    </>
  )
}

function ThreeBackground() {
  const tier = usePerfTier()
  const [visible, setVisible] = useState(false)
  const [tabActive, setTabActive] = useState(true)
  const containerRef = useRef(null)

  // Only render Canvas when component is in viewport
  useEffect(() => {
    if (tier !== 'high') return
    const el = containerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [tier])

  // Pause the render loop when the tab is hidden (saves battery/CPU).
  useEffect(() => {
    const onVis = () => setTabActive(!document.hidden)
    document.addEventListener('visibilitychange', onVis)
    return () => document.removeEventListener('visibilitychange', onVis)
  }, [])

  // Only the "high" tier gets the WebGL terrain. Low-power / reduced-motion
  // devices skip it entirely — this is the single biggest CPU/GPU saver.
  if (tier !== 'high') return null

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ contain: 'strict' }}
    >
      {visible && (
        <Canvas
          dpr={[1, 1.25]}
          camera={{ position: [0, 3.2, 7], fov: 60, near: 0.1, far: 60 }}
          gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
          frameloop={tabActive ? 'always' : 'never'}
          style={{ background: 'transparent' }}
        >
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      )}
    </div>
  )
}

export default memo(ThreeBackground)
