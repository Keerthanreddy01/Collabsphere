'use client'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Sun, Moon } from 'lucide-react'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => setMounted(true), [])
  
  if (!mounted) return <div className="w-9 h-9" /> // prevent hydration mismatch
  
  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="w-9 h-9 flex items-center justify-center rounded-full 
                 bg-[hsl(var(--card))] border border-[hsl(var(--border))] 
                 hover:border-[hsl(var(--primary))] transition-all duration-200 group"
      aria-label="Toggle theme"
    >
      {theme === 'dark' 
        ? <Sun size={16} className="text-[hsl(var(--foreground))] group-hover:text-primary transition-colors" /> 
        : <Moon size={16} className="text-[hsl(var(--foreground))] group-hover:text-primary transition-colors" />}
    </button>
  )
}
