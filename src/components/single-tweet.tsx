'use client'
import { singleTweetType } from '@/Types'
import Image from 'next/image'
import TweetOptions from './tweet-options'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

import { likeTweet } from '@/lib/actions/TweetActions'
import Comments from './comments'
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
  LoggedInUserDatabaseId,
}: singleTweetType) => {
  const commentsData = JSON.parse(tweetComments)
  const pathname = usePathname()
  const [openComments, setOpenComments] = useState(false)
  const [imageOpen, setImageOpen] = useState(false)
  const [liked, setLiked] = useState(false)
  async function handleLike() {
    setLiked((prev) => !prev)
    if (!liked) await likeTweet(_id, 'inc', pathname)
    else await likeTweet(_id, 'dec', pathname)
  }
  return (
    <div className="border border-[#CACACA] dark:border-[#242424] p-7 relative">
      <div className="flex items-start  gap-3">
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
            <p className="font-PoppinsMedium  w-full mt-2">{tweetText}</p>
          )}
          {tweetImage && (
            <div className="mt-2">
              <p className="font-PoppinsMedium ">{tweetImageCaption}</p>

              <Image
                onClick={() => setImageOpen(true)}
                src={tweetImage}
                alt="image"
                width={280}
                height={280}
                className="rounded-[13px]  object-cover mt-3 h-auto w-auto max-h-[280px] cursor-pointer"
              />
            </div>
          )}
        </div>
      </div>
      <div className="flex gap-4 mt-6">
        <div className="flex gap-2 items-center">
          <Image
            onClick={handleLike}
            src={`${likes > 0 ? '/heart.png' : '/white-heart.png'}`}
            alt="like"
            width={20}
            height={20}
          />
          <p className="font-PoppinsLight text-[15px] cursor-pointer">
            {likes} likes
          </p>
        </div>
        {commentsData.length > 0 ? (
          <div
            className="flex gap-2 items-center"
            onClick={() => setOpenComments(true)}
          >
            <Image src="/message.png" alt="like" width={20} height={20} />
            <p className="font-PoppinsLight text-[15px] cursor-pointer">
              view all {commentsData.length} comments
            </p>
          </div>
        ) : (
          <div
            className="flex gap-2 items-center"
            onClick={() => setOpenComments(true)}
          >
            <Image src="/message.png" alt="like" width={20} height={20} />
            <p className="font-PoppinsLight text-[15px] cursor-pointer">
              Comment
            </p>
          </div>
        )}
      </div>
      <div className="absolute top-5 right-4">
        <TweetOptions
          pathname={pathname}
          tweetId={_id}
          tweetUserClerkID={userClerkId}
          LoggedInUserClerkId={LoggedInUserClerkId}
          textTweet={tweetText && tweetText}
          imageTweetCaption={tweetImageCaption}
        />
      </div>
      {imageOpen && (
        <div className="fixed dark:bg-white/10 bg-black/30  backdrop-blur-xl h-screen w-screen z-20 top-0 left-0 flex justify-center items-center">
          <Image
            onClick={() => setImageOpen(false)}
            src="/close.png"
            alt="close"
            width={35}
            height={35}
            className="absolute top-6 right-6 sm:right-12 rounded-full bg-white p-2"
          />
          {tweetImage && (
            <Image
              src={tweetImage}
              alt="image"
              height={800}
              width={800}
              className="rounded-[15px] sm:w-[500px] h-auto 2xl:w-[800px] w-[350px]"
            />
          )}
        </div>
      )}
      {openComments && (
        <div className="fixed dark:bg-white/10 bg-black/30 backdrop-blur-md h-screen w-screen z-20 top-0 left-0 flex justify-center items-center">
          <Comments
            tweetComments={commentsData}
            LoggedInUserDatabaseId={LoggedInUserDatabaseId}
            tweetId={_id}
            setOpenComments={setOpenComments}
          />
        </div>
      )}
    </div>
  )
}
export default SingleTweet

// const SingleTweet = ({ likes, _id , LoggedInUserClerkId,}: DatabaseResponceTweet) => {
//   console.log(_id, likes)
//   return <div>SingleTweet</div>
// }
// export default SingleTweet
