'use server'
import { connectToDB } from '../mongoose'
import { User } from '../models/UserModel'
import { DatabaseResponceUser } from '@/Types'

export async function createUserInDB(
  name: string,
  email: string,
  imageUrl: string,
  clerkId: string
) {
  try {
    await connectToDB()
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
    throw new Error('Could not create User', error.message)
  }
}

export async function fetchUserData(id: string) {
  try {
    await connectToDB()
    const res = await User.findById(id)
    return res
  } catch (error: any) {
    throw new Error('Could not fetch User', error.message)
  }
}
