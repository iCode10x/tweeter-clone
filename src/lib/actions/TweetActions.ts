'use server'
import { connectToDB } from '../mongoose'
import { Tweet } from '../models/TweetModel'
import { User } from '../models/UserModel'
import { revalidatePath } from 'next/cache'

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
    const allTweets = await Tweet.find()
      .populate({
        path: 'User',
        model: User,
        select: 'name profileImage clerkId',
      })
      .populate({
        path: 'tweetComments.commentator',
        model: User,
        select: 'name profileImage',
      })
    return allTweets
  } catch (error: any) {
    throw new Error('Unable to fetch tweets', error.message)
  }
}

export async function likeTweet(
  tweetId: string,
  action: 'inc' | 'dec',
  path: string
) {
  try {
    await connectToDB()
    const targetTweet = await Tweet.findById(tweetId)

    if (action === 'inc') {
      const updatedlikes = targetTweet.likes + 1
      await Tweet.findByIdAndUpdate(tweetId, {
        likes: updatedlikes,
      })
    } else {
      if (targetTweet.likes > 0) {
        const updatedlikes = targetTweet.likes - 1
        await Tweet.findByIdAndUpdate(tweetId, {
          likes: updatedlikes,
        })
      }
    }
    revalidatePath(path)
  } catch (error: any) {
    throw new Error('Unable to like tweet', error.message)
  }
}

export async function addComment(
  tweetId: string,
  commentText: string,
  LoggedInUserDatabaseId: string,
  path: string
) {
  try {
    await connectToDB()
    await Tweet.findByIdAndUpdate(tweetId, {
      $push: {
        tweetComments: {
          commentator: LoggedInUserDatabaseId,
          text: commentText,
        },
      },
    })
    revalidatePath(path)
  } catch (error: any) {
    throw new Error('Unable to add comment', error.message)
  }
}
