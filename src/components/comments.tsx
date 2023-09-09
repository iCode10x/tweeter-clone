'use client'
import { useState } from 'react'
import Image from 'next/image'
import { addComment } from '@/lib/actions/TweetActions'

interface SingleCommentProps {
  image: string
  commentText: string
}

interface Props {
  tweetComments: any
  LoggedInUserDatabaseId: string
  tweetId: string
}

const SingleComment = ({ image, commentText }: SingleCommentProps) => {
  return <div></div>
}

const Comments = ({
  tweetComments,
  LoggedInUserDatabaseId,
  tweetId,
}: Props) => {
  console.log('Id:', tweetId)
  const [comment, setcomment] = useState('')
  async function handleAddComment() {
    await addComment(tweetId, comment, LoggedInUserDatabaseId)
  }
  return (
    <div className="bg-white w-[320px] sm:w-[393px] rounded-[25px] flex flex-col items-center">
      <p className="text-[18px] font-SamsungSharpSansBold text-center p-4">
        Comments
      </p>
      <div className="border border-[#CACACA] w-full" />
      <div>{/* <SingleComment /> */}</div>
      {/* Enter comments */}
      <div className="flex gap-4 p-4">
        <input
          type="text"
          value={comment}
          onChange={(e) => setcomment(e.target.value)}
          placeholder="Type your comment here..."
          className="w-[290px] rounded-[11px] bg-[#CACACA] p-5 outline-none font-PoppinsLight"
        />
        <button
          onClick={handleAddComment}
          className="p-5 bg-black dark:bg-white rounded-[11px]"
        >
          <Image src="/send.png" alt="send" width={24} height={24} />
        </button>
      </div>
    </div>
  )
}
export default Comments
