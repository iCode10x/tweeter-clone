'use client'

import Image from 'next/image'
import { toast } from 'react-hot-toast'
import { deleteTweet, editTweet } from '@/lib/actions/TweetActions'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useEffect, useState } from 'react'

interface Props {
  tweetId: string
  tweetUserClerkID: string
  LoggedInUserClerkId: string
  pathname: string
  textTweet?: string
  imageTweetCaption?: string
}
const TweetOptions = ({
  tweetUserClerkID,
  LoggedInUserClerkId,
  tweetId,
  pathname,
  imageTweetCaption,
  textTweet,
}: Props) => {
  const [openDeletePopup, setOpenDeletePopup] = useState(false)
  const [showTweetOptions, setShowTweetOptions] = useState(true)
  const [editText, setEditText] = useState<string | undefined>(textTweet)
  const [editCaption, setEditCaption] = useState<string | undefined>(
    imageTweetCaption
  )
  const [openEditPopup, setOpenEditPopup] = useState(false)
  useEffect(() => {
    if (openDeletePopup) setShowTweetOptions(false)
    if (openEditPopup) setShowTweetOptions(false)
  }, [openDeletePopup, openEditPopup])
  async function handleDelete() {
    setOpenDeletePopup(false)
    setShowTweetOptions(true)
    await deleteTweet(tweetId, pathname)
    toast.error('Tweet deleted!')
  }
  async function handleEdit() {
    setOpenEditPopup(false)
    setShowTweetOptions(true)
    await editTweet(tweetId, editText, editCaption, pathname)
    toast.success('Tweet updated!')
  }
  return (
    <div>
      {showTweetOptions && (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Image src="/more.png" alt="options" width={20} height={20} />
          </DropdownMenuTrigger>
          <div>
            {tweetUserClerkID === LoggedInUserClerkId ? (
              <div>
                <div>
                  <DropdownMenuContent className="rounded-[10px] relative  dark:bg-black dark:border-[#242424] mr-6">
                    <DropdownMenuLabel>
                      <p
                        onClick={() => setOpenEditPopup(true)}
                        className="text-[16px] font-PoppinsLight p-1 cursor-pointer"
                      >
                        Edit Tweet
                      </p>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel>
                      <p
                        className="text-[16px] font-PoppinsLight p-1 cursor-pointer"
                        onClick={() => setOpenDeletePopup(true)}
                      >
                        Delete
                      </p>
                    </DropdownMenuLabel>
                  </DropdownMenuContent>
                </div>
              </div>
            ) : (
              <DropdownMenuContent className="rounded-[10px] relative  dark:bg-black dark:border-[#242424] mr-6">
                <DropdownMenuLabel>
                  <p className="text-[16px] font-PoppinsLight p-1">
                    Copy Tweet
                  </p>
                </DropdownMenuLabel>
              </DropdownMenuContent>
            )}
          </div>
        </DropdownMenu>
      )}
      {openDeletePopup && (
        <div
          onClick={() => {
            setOpenDeletePopup(false)
            setShowTweetOptions(true)
          }}
          className="fixed dark:bg-white/10 bg-black/30 backdrop-blur-md h-screen w-screen z-20 top-0 left-0 flex justify-center items-center"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className=" sm:w-[390px] dark:bg-[#060606] bg-[#F6F6F6] flex flex-col items-center rounded-[20px] p-8 gap-5"
          >
            <div className="p-4 rounded-full bg-[#D60000]/10">
              <Image src="/trash.png" alt="delete" width={45} height={45} />
            </div>
            <p className="font-SamsungSharpSansBold text-[19px] sm:text-[22px] w-[248px] text-center dark:text-white">
              Do you want to delete this tweet?
            </p>
            <div className="flex gap-6">
              <button
                className="text-[16px] font-SamsungSharpSansBold py-2 px-6 bg-[#CACACA]/20 rounded-[6px]"
                onClick={() => {
                  setOpenDeletePopup(false)
                  setShowTweetOptions(true)
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="text-[16px] font-SamsungSharpSansBold py-2 px-6 bg-black text-white rounded-[6px] dark:bg-white dark:text-black"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      {openEditPopup && (
        <div
          onClick={() => {
            setOpenEditPopup(false)
            setShowTweetOptions(true)
          }}
          className="fixed dark:bg-white/10 bg-black/30 backdrop-blur-md h-screen w-screen z-20 top-0 left-0 flex justify-center items-center"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="sm:w-[420px] dark:bg-[#060606] bg-[#F6F6F6] flex flex-col items-center rounded-[20px] relative"
          >
            <Image
              onClick={() => {
                setOpenEditPopup(false)
                setShowTweetOptions(true)
              }}
              src="/close.png"
              alt="close"
              width={14}
              height={14}
              className="object-contain absolute right-5 top-5"
            />
            <p className="font-SamsungSharpSansBold text-[19px] sm:text-[22px] w-[248px] text-center dark:text-white p-5">
              Edit Tweet
            </p>
            <div className="w-full border border-[#CACACA] dark:border-[#242424]" />
            <div className="flex flex-col gap-4 sm:p-8 p-6 items-center">
              <textarea
                className="outline-none rounded-[8px] p-3 w-[280px] sm:w-[330px] bg-[#F6F6F6] dark:bg-[#060606] border-2 border-[#787878] dark:border-[#FFFFFF] h-[144px] font-PoppinsMedium"
                value={editText ? editText : editCaption}
                onChange={(e) => {
                  editText
                    ? setEditText(e.target.value)
                    : setEditCaption(e.target.value)
                }}
              />
              <button
                onClick={handleEdit}
                className="bg-black text-white font-SamsungSharpSansBold rounded-[12px] py-2 px-6 text-[16px] mt-2 dark:bg-white dark:text-black"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
export default TweetOptions
