"use client"

import { createContext, useContext, useEffect, useState } from "react"

type Theme = "dark" | "light" | "system"

interface ThemeProviderProps {
  children: React.ReactNode
  defaultTheme?: Theme
  enableSystem?: boolean
}

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  resolvedTheme: "light" | "dark"
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({
  children,
  defaultTheme = "system",
  enableSystem = true,
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(defaultTheme)
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem("aml-theme") as Theme | null
    if (saved) setThemeState(saved)
  }, [])

  useEffect(() => {
    if (!mounted) return
    const root = window.document.documentElement
    root.classList.remove("light", "dark")

    let resolved: "light" | "dark"
    if (theme === "system" && enableSystem) {
      resolved = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
    } else {
      resolved = theme === "dark" ? "dark" : "light"
    }

    root.classList.add(resolved)
    setResolvedTheme(resolved)
    localStorage.setItem("aml-theme", theme)
  }, [theme, mounted, enableSystem])

  useEffect(() => {
    if (!enableSystem) return
    const media = window.matchMedia("(prefers-color-scheme: dark)")
    const handler = () => {
      if (theme === "system") {
        setResolvedTheme(media.matches ? "dark" : "light")
      }
    }
    media.addEventListener("change", handler)
    return () => media.removeEventListener("change", handler)
  }, [theme, enableSystem])

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
