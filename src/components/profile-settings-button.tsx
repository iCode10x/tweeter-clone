'use client'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { toast } from 'react-hot-toast'
import { editUsernameInDB } from '@/lib/actions/UserActions'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import Spinner from './Spinner'
import Image from 'next/image'
const ProfileSettingsButton = ({
  userId,
  username,
}: {
  userId: string
  username: string
}) => {
  const pathname = usePathname()
  const [loading, setloading] = useState(false)
  const [openEditProfile, setOpenEditProfile] = useState(false)
  const [editUsername, setEditUsername] = useState(username)
  async function handleEdit() {
    if (editUsername === '') {
      toast.error('Username field is empty!')
      return
    }
    setloading(true)
    await editUsernameInDB(userId, editUsername, pathname)
    setloading(false)
    setOpenEditProfile(false)
    toast.success('Username updated successfully!')
  }
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Image
            src="/settings.png"
            width={22}
            height={22}
            alt="settings"
            className="dark:invert"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="ml-6 mr-3 sm:mr-0 mt-1 rounded-xl dark:bg-black dark:border-[#242424]">
          <DropdownMenuLabel>
            <p className="text-lg text-center py-2 px-6  font-SamsungSharpSansBold">
              Settings
            </p>
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="border-[#CACACA] dark:border-[#242424] " />
          <DropdownMenuItem>
            <p
              className="font-PoppinsLight"
              onClick={() => setOpenEditProfile(true)}
            >
              Edit Profile
            </p>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="dark:border-[#242424]" />
          <DropdownMenuItem>
            <p className="font-PoppinsLight">Copy link</p>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {openEditProfile && (
        <div
          onClick={() => setOpenEditProfile(false)}
          className="fixed dark:bg-white/10 bg-black/30 backdrop-blur-md h-screen w-screen z-20 top-0 left-0 flex justify-center items-center"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="sm:w-[420px] w-[320px] dark:bg-[#060606] bg-[#F6F6F6] flex flex-col items-center rounded-[20px] relative"
          >
            <Image
              onClick={() => setOpenEditProfile(false)}
              src="/close.png"
              alt="close"
              width={14}
              height={14}
              className="object-contain absolute right-5 top-5"
            />
            <p className="font-SamsungSharpSansBold text-[19px] sm:text-[22px] w-[248px] text-center dark:text-white p-5">
              Edit Profile
            </p>
            <div className="w-full border border-[#242424]/30" />
            <div className="flex flex-col gap-4 sm:px-12 p-6 w-full">
              <p className="font-SamsungSharpSansMedium text-[15px]">
                Change Username
              </p>
              <input
                value={editUsername}
                onChange={(e) => setEditUsername(e.target.value)}
                type="text"
                className="w-full outline-none border border-[#787878] dark:bg-[#060606] p-3 rounded-[8px] bg-[#F6F6F6] font-SamsungSharpSans"
              />
              {loading ? (
                <div className="mx-auto">
                  <Spinner width="30" height="30" color="black" />
                </div>
              ) : (
                <button
                  onClick={handleEdit}
                  className="bg-black text-white font-SamsungSharpSansBold rounded-[12px] py-2 px-6 text-[16px] mt-2 dark:bg-white dark:text-black mx-auto"
                >
                  Update
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
export default ProfileSettingsButton
