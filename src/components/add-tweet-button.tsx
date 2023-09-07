'use client'
import Image from 'next/image'
import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

const AddTweetButton = () => {
  const [open, setOpen] = useState(false)
  return (
    <div>
      {open ? (
        <div className="bg-black dark:bg-white flex relative p-3 px-5 h-[60px] gap-5 rounded-full">
          <Dialog>
            <DialogTrigger>
              <Image
                src="/gallery-add.png"
                alt="gallery"
                width={27}
                height={27}
                className="object-contain dark:invert"
              />
            </DialogTrigger>
            <DialogContent>
              <p>Upload Image </p>
            </DialogContent>
          </Dialog>

          <div className="border-white border dark:invert" />
          <Dialog>
            <DialogTrigger>
              <Image
                src="/edit-2.png"
                alt="gallery"
                width={27}
                height={27}
                className="object-contain dark:invert"
              />
            </DialogTrigger>
            <DialogContent className="flex  flex-col gap-4 dark:bg-[#060606]">
              <p className="font-SamsungSharpSansBold dark:text-white">
                What is on your mind?
              </p>
              <textarea className="w-full h-[100px] rounded-[10px] border dark:border-[#242424] dark:bg-[#060606] dark:text-white border-[#CACACA] outline-none p-2 font-SamsungSharpSans" />
              <div className="w-full flex">
                <button className="font-SamsungSharpSansBold text-xl px-12 mx-auto bg-black dark:text-black dark:bg-white text-white py-2  rounded-[9px]">
                  Post
                </button>
              </div>
            </DialogContent>
          </Dialog>

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
          className="dark:invert "
        />
      )}
    </div>
  )
}
export default AddTweetButton
