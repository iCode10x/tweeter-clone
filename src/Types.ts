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

export type DatabaseResponceUser = {
  name: string
  email: string
  profileImage: string
  clerkId: string
  tweets: any
  _id: string
}
