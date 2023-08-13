'use client'

import React, { useState, useEffect, createContext } from 'react'

const getInitialTheme = (): string => {
  if (typeof window !== 'undefined') {
    const localStorageTheme = window.localStorage.getItem('color-theme')
    if (typeof localStorageTheme === 'string') {
      return localStorageTheme
    }

    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark'
    }
  }

  // Default Theme
  return 'light'
}

interface ThemeContextType {
  theme: string
  setTheme: React.Dispatch<React.SetStateAction<string>>
}

export const ThemeContext = createContext<ThemeContextType | null>(null)

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [theme, setTheme] = useState(getInitialTheme)

  const rawSetTheme = (theme: string): void => {
    const root = window.document.documentElement
    const isDark = theme === 'dark'

    root.classList.remove(isDark ? 'light' : 'dark')
    root.classList.add(theme)

    localStorage.setItem('color-theme', theme)
  }

  useEffect(() => {
    rawSetTheme(theme)
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider
