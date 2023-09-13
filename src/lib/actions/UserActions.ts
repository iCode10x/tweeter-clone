'use server'
import { connectToDB } from '../mongoose'
import { User } from '../models/UserModel'
import { DatabaseResponceUser } from '@/Types'
import { revalidatePath } from 'next/cache'

export async function createUserInDB(
  name: string,
  email: string,
  imageUrl: string,
  clerkId: string
) {
  try {
    await connectToDB()
    console.log('connection hogya he')
    const foundUser: DatabaseResponceUser | null = await User.findOne({
      clerkId: clerkId,
    })
    if (!foundUser) {
      const createdUser: DatabaseResponceUser = await User.create({
        name: name,
        email: email,
        profileImage: imageUrl,
        clerkId: clerkId,
      })
      return createdUser._id
    } else {
      return foundUser._id
    }
  } catch (error: any) {
    console.log('ERROR AYA HE:', error)
    throw new Error('Could not create User', error.message)
  }
}

export async function fetchUserData(id: string) {
  try {
    await connectToDB()
    const res = await User.findById(id).populate({
      path: 'notifications.visitorId',
      model: User,
      select: 'name profileImage',
    })
    return res
  } catch (error: any) {
    throw new Error('Could not fetch User', error.message)
  }
}

export const editUsernameInDB = async (
  userId: string,
  updatedUsername: string,
  path: string
) => {
  try {
    await connectToDB()
    await User.findByIdAndUpdate(userId, {
      name: updatedUsername,
    })
    revalidatePath(path)
    revalidatePath('/')
  } catch (error: any) {
    throw new Error('Could not update Username', error.message)
  }
}

export async function resetNotificationNumber(
  loggedInUserID: string,
  path: string
) {
  console.log('Update count')
  try {
    await connectToDB()
    await User.findByIdAndUpdate(loggedInUserID, {
      notificatinsNumber: 0,
    })
    revalidatePath(path)
  } catch (error: any) {
    throw new Error('Could not update notification number', error.message)
  }
}
