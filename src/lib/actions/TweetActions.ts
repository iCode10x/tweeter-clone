'use server'
import { connectToDB } from '../mongoose'
import { Tweet } from '../models/TweetModel'
import { User } from '../models/UserModel'
import { revalidatePath } from 'next/cache'

export async function createTweetInDB(
  userId: string,
  tweetText: string,
  path: string
) {
  try {
    await connectToDB()
    const newlyCreatedTweet = await Tweet.create({
      User: userId,
      tweetText: tweetText,
    })
    console.log(newlyCreatedTweet)
    revalidatePath(path)
  } catch (error: any) {
    throw new Error('Unable to create tweet', error.message)
  }
}

export async function createImageTweetInDB(
  userId: string,
  tweetImageUrl: string,
  caption: string,
  path: string
) {
  try {
    await connectToDB()
    const newlyCreatedImageTweet = await Tweet.create({
      User: userId,
      tweetImage: tweetImageUrl,
      tweetImageCaption: caption,
    })
    revalidatePath(path)
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
  likerId: string,
  path: string
) {
  try {
    await connectToDB()
    const alreadyLiked = await Tweet.find({ _id: tweetId, likes: likerId })
    if (alreadyLiked.length === 0) {
      console.log('Not liked, liking')
      await Tweet.findByIdAndUpdate(tweetId, {
        $push: {
          likes: likerId,
        },
      })
    } else {
      console.log('Already liked, removing like')
      await Tweet.findByIdAndUpdate(tweetId, {
        $pull: {
          likes: likerId,
        },
      })
    }
    const likesNumber = await Tweet.findById(tweetId)
    revalidatePath(path)
    return likesNumber.likes.length
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

export const deleteTweet = async (tweetId: string, path: string) => {
  try {
    await connectToDB()
    await Tweet.findByIdAndDelete(tweetId)
    revalidatePath(path)
  } catch (error: any) {
    throw new Error('Unable to delete tweet', error.message)
  }
}

export async function editTweet(
  tweetId: string,
  textTweet: string | undefined,
  caption: string | undefined,
  path: string
) {
  try {
    await connectToDB()
    if (textTweet) {
      await Tweet.findByIdAndUpdate(tweetId, {
        tweetText: textTweet,
      })
    } else if (caption) {
      await Tweet.findByIdAndUpdate(tweetId, {
        tweetImageCaption: caption,
      })
    }
    revalidatePath(path)
  } catch (error: any) {
    throw new Error('Unable to edit tweet', error.message)
  }
}

export async function fetchUserTweets(userId: string) {
  try {
    await connectToDB()
    const tweets = await Tweet.find({ User: userId })
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
    return tweets
  } catch (error: any) {
    throw new Error('Unable to fetch tweets', error.message)
  }
}
