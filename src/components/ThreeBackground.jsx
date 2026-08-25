import { Suspense, memo, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import useReducedMotion from '../hooks/useReducedMotion'

const SIZE = 36       // plane width/depth in world units
const SEGS = 80       // subdivisions per side (80×80 = 6561 vertices)

// Aurora gradient endpoints — low valleys to high peaks
const COLOR_DEEP = '#1e1b4b'   // indigo dark (valley)
const COLOR_MID  = '#7c3aed'   // violet
const COLOR_HIGH = '#22d3ee'   // cyan (peak)

function Terrain() {
  const geometry = useMemo(() => {
    const g = new THREE.PlaneGeometry(SIZE, SIZE, SEGS, SEGS)
    g.rotateX(-Math.PI / 2)
    const colors = new Float32Array(g.attributes.position.array.length)
    g.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    // base positions snapshot (post-rotation), so we always sample noise
    // from a stable grid instead of compounding displacement
    g.userData.base = g.attributes.position.array.slice()
    return g
  }, [])

  const cDeep = useMemo(() => new THREE.Color(COLOR_DEEP), [])
  const cMid  = useMemo(() => new THREE.Color(COLOR_MID), [])
  const cHigh = useMemo(() => new THREE.Color(COLOR_HIGH), [])
  const tmp   = useMemo(() => new THREE.Color(), [])

  useFrame((state) => {
    const t = state.clock.elapsedTime * 0.28
    const positions = geometry.attributes.position.array
    const colors = geometry.attributes.color.array
    const base = geometry.userData.base

    for (let i = 0; i < positions.length; i += 3) {
      const x = base[i]
      const z = base[i + 2]

      // Layered sine waves with varying frequency for organic ridge look
      const h =
        Math.sin(x * 0.22 + t) * 0.55 +
        Math.cos(z * 0.27 - t * 0.7) * 0.45 +
        Math.sin((x + z) * 0.14 + t * 0.5) * 0.70 +
        Math.cos(x * 0.42 + z * 0.38 + t * 1.1) * 0.28

      positions[i + 1] = h

      // 3-stop gradient: deep → mid → high based on normalized height
      const tint = (h + 1.7) / 3.4   // ~0..1
      const c = Math.max(0, Math.min(1, tint))
      if (c < 0.5) {
        tmp.copy(cDeep).lerp(cMid, c * 2)
      } else {
        tmp.copy(cMid).lerp(cHigh, (c - 0.5) * 2)
      }
      colors[i]     = tmp.r
      colors[i + 1] = tmp.g
      colors[i + 2] = tmp.b
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
        opacity={0.55}
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
    // smooth pointer-driven tilt
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
      {/* exponential fog to fade distant ridges into the void */}
      <fogExp2 attach="fog" args={['#070318', 0.05]} />
      <Terrain />
      <CameraRig />
    </>
  )
}

function ThreeBackground() {
  const reduce = useReducedMotion()
  if (reduce) return null

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ contain: 'strict' }}
    >
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 3.2, 7], fov: 60, near: 0.1, far: 60 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default memo(ThreeBackground)
