import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'theme'

const readInitialTheme = () => {
  if (typeof window === 'undefined') return 'dark'
  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (stored === 'light' || stored === 'dark') return stored
  return 'dark'
}

export default function useTheme() {
  const [theme, setTheme] = useState(readInitialTheme)

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'light') root.classList.add('light')
    else root.classList.remove('light')
    try {
      window.localStorage.setItem(STORAGE_KEY, theme)
    } catch (_) {}
  }, [theme])

  const toggleTheme = useCallback(
    () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light')),
    []
  )

  return { theme, toggleTheme }
}
