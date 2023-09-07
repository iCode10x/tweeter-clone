import { Dispatch, SetStateAction } from 'react'

export type AppContextTypes = {
  theme: 'light' | 'dark'
  setTheme: Dispatch<SetStateAction<'light' | 'dark'>>
  openPopover1: boolean
  setopenPopover1: Dispatch<SetStateAction<boolean>>
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

export type DatabaseResponceTweet = {
  _id: string
  User: {
    _id: string
    name: string
    profileImage: string
  }
  tweetText: string
  likes: number
  tweetComments: any
}
