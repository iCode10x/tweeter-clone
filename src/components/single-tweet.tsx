'use client'
import { DatabaseResponceTweet } from '@/Types'
import Image from 'next/image'
import TweetOptions from './tweet-options'
import { useState } from 'react'

const SingleTweet = ({
  tweetText,
  userClerkId,
  userId,
  userName,
  userProfileImage,
  _id,
  likes,
  tweetComments,
  tweetImage,
  tweetImageCaption,
  LoggedInUserClerkId,
}: DatabaseResponceTweet) => {
  return (
    <div className="border border-[#CACACA] dark:border-[#242424] p-7 relative">
      <div className="flex items-start gap-4">
        <Image
          src={userProfileImage}
          alt="profile-image"
          width={40}
          height={40}
          className="rounded-full"
        />
        <div>
          <p className="font-SamsungSharpSansBold">{userName}</p>
          {tweetText && (
            <p className="font-PoppinsMedium sm:w-[65%] w-full mt-2">
              {tweetText}
            </p>
          )}
          {tweetImage && (
            <div className="mt-2">
              <p className=" font-PoppinsMedium ">{tweetImageCaption}</p>

              <Image
                src={tweetImage}
                alt="image"
                width={280}
                height={280}
                className="rounded-[13px]  object-cover mt-3 h-auto w-auto max-h-[280px]"
              />
            </div>
          )}
        </div>
      </div>
      <div className="flex gap-4 mt-6">
        <div className="flex gap-2 items-center">
          <Image
            src={`${likes > 0 ? '/heart.png' : '/white-heart.png'}`}
            alt="like"
            width={20}
            height={20}
          />
          <p className="font-PoppinsLight text-[15px]">{likes} likes</p>
        </div>
        {tweetComments.length > -1 && (
          <div className="flex gap-2 items-center">
            <Image src="/message.png" alt="like" width={20} height={20} />
            <p className="font-PoppinsLight text-[15px]">
              view all {tweetComments.length} comments
            </p>
          </div>
        )}
      </div>
      <div className="absolute top-5 right-4">
        <TweetOptions
          tweetUserClerkID={userClerkId}
          LoggedInUserClerkId={LoggedInUserClerkId}
        />
      </div>
    </div>
  )
}
export default SingleTweet

// const SingleTweet = ({ likes, _id , LoggedInUserClerkId,}: DatabaseResponceTweet) => {
//   console.log(_id, likes)
//   return <div>SingleTweet</div>
// }
// export default SingleTweet
