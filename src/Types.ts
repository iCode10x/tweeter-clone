import { Dispatch, SetStateAction } from 'react'

export type AppContextTypes = {
  theme: 'light' | 'dark'
  setTheme: Dispatch<SetStateAction<'light' | 'dark'>>
}
