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
  notificatinsNumber: number
  notifications: any
}

export type DatabaseResponceTweets = {
  _id: string
  User: {
    _id: string
    name: string
    profileImage: string
    clerkId: string
  }
  LoggedInUserClerkId: string
  tweetText: string
  likes: string[]
  tweetComments: {
    commentator: {
      _id: string
      name: string
      profileImage: string
    }
    text: string
    _id: string
  }[]
  tweetImage: string
  tweetImageCaption: string
}

export type singleTweetType = {
  _id: string
  userName: string
  userProfileImage: string
  userClerkId: string
  LoggedInUserClerkId: string
  tweetCreaterID: string
  tweetText: string
  likes: string[]
  tweetComments: any
  tweetImage: string
  tweetImageCaption: string
  LoggedInUserDatabaseId: string
}

export type NotificationsType = {
  visitorId: {
    _id: string
    name: string
    profileImage: string
  }
  activity: 'like' | 'comment'
  _id: string
}
