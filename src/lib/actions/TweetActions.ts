'use server'
import { connectToDB } from '../mongoose'
import { Tweet } from '../models/TweetModel'
import { User } from '../models/UserModel'

export async function createTweetInDB(userId: string, tweetText: string) {
  try {
    await connectToDB()

    const newlyCreatedTweet = await Tweet.create({
      User: userId,
      tweetText: tweetText,
    })
    console.log(newlyCreatedTweet)
  } catch (error: any) {
    throw new Error('Unable to create tweet', error.message)
  }
}

export async function createImageTweetInDB(
  userId: string,
  tweetImageUrl: string,
  caption: string
) {
  try {
    await connectToDB()
    const newlyCreatedImageTweet = await Tweet.create({
      User: userId,
      tweetImage: tweetImageUrl,
      tweetImageCaption: caption,
    })
  } catch (error: any) {
    throw new Error('Unable to create image tweet', error.message)
  }
}

export async function fetchAllTweets() {
  try {
    await connectToDB()
    const allTweets = await Tweet.find().populate({
      path: 'User',
      model: User,
      select: 'name profileImage clerkId',
    })
    return allTweets
  } catch (error: any) {
    throw new Error('Unable to fetch tweets', error.message)
  }
}
