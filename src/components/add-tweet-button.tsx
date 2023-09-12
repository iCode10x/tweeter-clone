'use client'
import Image from 'next/image'
import { ChangeEvent, useState } from 'react'
import { createTweetInDB } from '@/lib/actions/TweetActions'
import { useUploadThing } from '@/lib/uploadthing'
import { isBase64Image } from '@/lib/utils'
import { toast } from 'react-hot-toast'
import { createImageTweetInDB } from '@/lib/actions/TweetActions'
import { usePathname } from 'next/navigation'
import Spinner from './Spinner'

const AddTweetButton = ({ userId }: { userId: string }) => {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [files, setFiles] = useState<File[]>([])
  const [openPopover1, setopenPopover1] = useState(false)
  const [openPopover2, setopenPopover2] = useState(false)
  const [imageUrl, setImageUrl] = useState<string | undefined>()
  const [caption, setCaption] = useState('')
  const [tweetText, setTweetText] = useState('')
  const { startUpload } = useUploadThing('media')
  async function addTextTweet() {
    if (tweetText === '') {
      toast.error('Input field empty!')
      return
    }
    setLoading(true)
    await createTweetInDB(userId, tweetText, pathname)
    toast.success('Tweet added!')
    setLoading(false)
    setTweetText('')
    setopenPopover1(false)
  }
  async function addImageTweet() {
    if (imageUrl === undefined || caption === '') {
      if (imageUrl === undefined) {
        toast.error('Image field empty!')
        return
      } else if (caption === '') {
        toast.error('Caption field empty')
        return
      }
    }
    setLoading(true)
    let uploadedImageUrl = ''
    const blob = imageUrl
    const hasImageChanged = isBase64Image(blob || '')
    if (hasImageChanged) {
      const imgRes = await startUpload(files)
      if (imgRes && imgRes[0].url) {
        uploadedImageUrl = imgRes[0].url
      }
    }

    await createImageTweetInDB(userId, uploadedImageUrl, caption, pathname)
    setLoading(false)
    setImageUrl(undefined)
    setCaption('')
    setopenPopover2(false)
    toast.success('Tweet added!')
  }
  function handleImage(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault()
    const fileReader = new FileReader()
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      setFiles(Array.from(e.target.files))
      if (!file.type.includes('image')) return
      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || ''
        setImageUrl(imageDataUrl)
      }
      fileReader.readAsDataURL(file)
    }
  }
  return (
    <div>
      {/* text tweet popover */}
      {openPopover1 && (
        <div
          onClick={() => setopenPopover1(false)}
          className="fixed backdrop-blur-sm flex justify-center items-center left-0 top-0 h-screen w-screen dark:bg-white/10 bg-black/20 "
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-[#060606]  p-6 rounded-[25px] relative"
          >
            <p className="font-SamsungSharpSansBold text-xl dark:text-white">
              Whats on your mind?
            </p>
            <textarea
              value={tweetText}
              onChange={(e) => setTweetText(e.target.value)}
              className="font-SamsungSharpSans p-3 dark:bg-[#060606] rounded-[10px] w-[290px] sm:w-[393px] my-3 h-[110px] sm:h-[160px] outline-none border-[#CACACA] dark:border-[#242424] border"
            />
            <div className="flex">
              {loading ? (
                <div className="mx-auto">
                  <Spinner width="30" height="30" color="black" />
                </div>
              ) : (
                <button
                  onClick={addTextTweet}
                  className=" rounded-[9px] font-SamsungSharpSansBold mx-auto bg-black text-white py-2 px-12 dark:bg-white dark:text-black"
                >
                  Post
                </button>
              )}
            </div>
            <Image
              onClick={() => setopenPopover1(false)}
              src="/close.png"
              alt="close"
              width={13}
              height={13}
              className="object-contain dark:invert absolute top-5 right-5"
            />
          </div>
        </div>
      )}
      {/* Image upload popover */}
      {openPopover2 && (
        <div
          onClick={() => setopenPopover2(false)}
          className="fixed backdrop-blur-sm flex justify-center items-center left-0 top-0 h-screen w-screen dark:bg-white/10 bg-black/20 "
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-[#060606] w-[320px] sm:w-[393px] p-6 rounded-[25px] relative"
          >
            <p className="font-SamsungSharpSansBold  dark:text-white">
              Upload Image
            </p>
            <div className="flex flex-col items-center w-full  ">
              {imageUrl ? (
                <div className="relative">
                  <Image
                    style={{
                      width: 'auto',
                      height: 'auto',
                      maxWidth: 300,
                      maxHeight: 200,
                    }}
                    src={imageUrl}
                    alt="image"
                    width={150}
                    height={150}
                    className="my-5"
                  />
                  <div className="absolute top-8 right-4 w-[20px] h-[20px] rounded-full bg-white flex justify-center items-center">
                    <Image
                      onClick={() => {
                        setImageUrl(undefined)
                        setFiles([])
                      }}
                      src="/close.png"
                      alt="close"
                      width={12}
                      height={12}
                      className="object-contain "
                    />
                  </div>
                </div>
              ) : (
                <label
                  htmlFor="fileInput"
                  className="relative cursor-pointer text-white"
                >
                  <Image
                    src="/upload-image.png"
                    alt="image"
                    width={60}
                    height={60}
                    className="mx-auto my-5"
                  />
                  <input
                    type="file"
                    id="fileInput"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={(e) => handleImage(e)}
                  />
                </label>
              )}
            </div>
            <p className="font-SamsungSharpSansBold  dark:text-white">
              Add Caption
            </p>
            <input
              onChange={(e) => setCaption(e.target.value)}
              value={caption}
              type="text"
              className="w-full font-SamsungSharpSans dark:bg-[#060606] outline-none border border-[#CACACA] rounded-[10px] mt-3 mb-5 p-2"
            />

            <div className="flex">
              {loading ? (
                <div className="mx-auto">
                  <Spinner width="30" height="30" color="black" />
                </div>
              ) : (
                <button
                  onClick={addImageTweet}
                  className=" rounded-[9px] font-SamsungSharpSansBold mx-auto bg-black text-white py-2 px-12 dark:bg-white dark:text-black"
                >
                  Post
                </button>
              )}
            </div>
            <Image
              onClick={() => setopenPopover2(false)}
              src="/close.png"
              alt="close"
              width={13}
              height={13}
              className="object-contain dark:invert absolute top-5 right-5"
            />
          </div>
        </div>
      )}
      <div>
        {open ? (
          <div className="bg-black dark:bg-white flex relative p-3 px-5 h-[60px] gap-5 rounded-full">
            <Image
              onClick={() => {
                setopenPopover2(true)
                setOpen(false)
              }}
              src="/gallery-add.png"
              alt="gallery"
              width={27}
              height={27}
              className="object-contain dark:invert"
            />

            <div className="border-white border dark:invert" />

            <Image
              onClick={() => {
                setopenPopover1(true)
                setOpen(false)
              }}
              src="/edit-2.png"
              alt="gallery"
              width={27}
              height={27}
              className="object-contain dark:invert"
            />

            <Image
              onClick={() => setOpen(false)}
              src="/close-circle.png"
              alt="gallery"
              width={20}
              height={20}
              className="object-contain absolute right-1 -top-2"
            />
          </div>
        ) : (
          <Image
            onClick={() => setOpen(true)}
            src="/addlight.png"
            alt=""
            height={60}
            width={60}
            className="dark:invert"
          />
        )}
      </div>
    </div>
  )
}
export default AddTweetButton
