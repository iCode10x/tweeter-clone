'use client'
import { Dispatch, SetStateAction, useState } from 'react'
import Image from 'next/image'
import { addComment } from '@/lib/actions/TweetActions'
import { ScrollArea } from '@/components/ui/scroll-area'
import { usePathname } from 'next/navigation'
import { toast } from 'react-hot-toast'

interface SingleCommentProps {
  name: string
  image: string
  commentText: string
}

interface Props {
  tweetComments: {
    commentator: {
      _id: string
      name: string
      profileImage: string
    }
    text: string
    _id: string
  }[]
  LoggedInUserDatabaseId: string
  tweetId: string
  setOpenComments: Dispatch<SetStateAction<boolean>>
}

const SingleComment = ({ name, image, commentText }: SingleCommentProps) => {
  return (
    <div>
      <div className="flex items-start gap-3 p-3 border border-[#CACACA] dark:border-[#242424]">
        <Image
          src={image}
          alt="image"
          width={34}
          height={34}
          className="rounded-full"
        />
        <div className="text-[16px] ">
          <p className="font-SamsungSharpSansBold">{name}</p>
          <p className="font-SamsungSharpSansMedium">{commentText}</p>
        </div>
      </div>
    </div>
  )
}

const Comments = ({
  tweetComments,
  LoggedInUserDatabaseId,
  tweetId,
  setOpenComments,
}: Props) => {
  const pathname = usePathname()
  const [comment, setcomment] = useState('')
  async function handleAddComment() {
    if (comment === '') {
      toast.error('Comment field is empty!')
      return
    }
    await addComment(tweetId, comment, LoggedInUserDatabaseId, pathname)
    setcomment('')
  }
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="bg-white dark:bg-[#060606] w-[320px] sm:w-[413px] rounded-[25px] flex flex-col items-center relative"
    >
      <Image
        onClick={() => setOpenComments(false)}
        src="/close.png"
        alt="close"
        width={13}
        height={13}
        className="object-contain dark:invert absolute top-5 right-5"
      />
      <p className="text-[18px] font-SamsungSharpSansBold text-center p-5">
        Comments
      </p>
      <div className="w-full">
        <ScrollArea className="h-[280px]">
          {/* <SingleComment /> */}
          {tweetComments.map((tweet) => (
            <SingleComment
              name={tweet.commentator.name}
              key={tweet._id}
              image={tweet.commentator.profileImage}
              commentText={tweet.text}
            />
          ))}
        </ScrollArea>
      </div>
      {/* Enter comments */}
      <div className="flex gap-4 p-3">
        <input
          type="text"
          value={comment}
          onChange={(e) => setcomment(e.target.value)}
          placeholder="Type your comment here..."
          className="sm:w-[290px] w-full rounded-[11px] dark:bg-[#242424] bg-[#CACACA] p-4 outline-none font-PoppinsLight"
        />
        <button
          onClick={handleAddComment}
          className="p-5 bg-black dark:bg-white rounded-[11px]"
        >
          <Image
            src="/send.png"
            alt="send"
            width={24}
            height={24}
            className="dark:invert"
          />
        </button>
      </div>
    </div>
  )
}
export default Comments
