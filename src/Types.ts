import { Dispatch, SetStateAction } from 'react'

export type AppContextTypes = {
  theme: 'light' | 'dark'
  setTheme: Dispatch<SetStateAction<'light' | 'dark'>>
}

export type ClerkUserTypes = {
  id: string
  firstName: string
  imageUrl: string
  emailAddresses: [
    {
      emailAddress: string
    }
  ]
}
