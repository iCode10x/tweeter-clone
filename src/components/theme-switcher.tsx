'use client'
import Image from 'next/image'
import { useAppContext } from '@/Context/AppContext'
import { useEffect, useState } from 'react'
const ThemeSwitcher = () => {
  const { theme, setTheme } = useAppContext()
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])
  return (
    <Image
      onClick={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))}
      height={50}
      width={50}
      alt="icon"
      src={`${
        theme === 'light' ? '/light-theme-icon.png' : '/dark-theme-icon.png'
      }`}
    />
  )
}
export default ThemeSwitcher
