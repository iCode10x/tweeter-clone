'use client'
import { AppContextTypes } from '@/Types'
import { ReactNode, createContext, useContext, useState } from 'react'

const context = createContext({} as AppContextTypes)

const AppContext = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  return (
    <context.Provider value={{ theme, setTheme }}>{children}</context.Provider>
  )
}
export default AppContext

export const useAppContext = () => {
  return useContext(context)
}
