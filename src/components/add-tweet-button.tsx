'use client'
import Image from 'next/image'
import { useState } from 'react'
import { useAppContext } from '@/Context/AppContext'
const AddTweetButton = () => {
  const [open, setOpen] = useState(false)
  // const { openPopover1, setopenPopover1 } = useAppContext()
  const [openPopover1, setopenPopover1] = useState(false)

  return (
    <div>
      {openPopover1 && (
        <div className="fixed backdrop-blur-sm flex justify-center items-center left-0 top-0 h-screen w-screen dark:bg-white/10 bg-black/20 ">
          <div className="bg-white dark:bg-[#060606]  p-6 rounded-[25px] relative">
            <p className="font-SamsungSharpSansBold text-xl dark:text-white">
              Whats on your mind?
            </p>
            <textarea className="font-SamsungSharpSans p-3 dark:bg-[#060606] rounded-[10px] w-[290px] sm:w-[393px] my-3 h-[110px] sm:h-[160px] outline-none border-[#CACACA] dark:border-[#242424] border" />
            <div className="flex">
              <button className=" rounded-[9px] font-SamsungSharpSansBold mx-auto bg-black text-white py-2 px-12 dark:bg-white dark:text-black">
                Post
              </button>
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
      <div>
        {open ? (
          <div className="bg-black dark:bg-white flex relative p-3 px-5 h-[60px] gap-5 rounded-full">
            <Image
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
