import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Link from 'next/link'
import Image from 'next/image'
const ProfileSettingsButton = () => {
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
            <p className="font-PoppinsLight">Edit Profile</p>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="dark:border-[#242424]" />
          <DropdownMenuItem>
            <p className="font-PoppinsLight">Copy link</p>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
export default ProfileSettingsButton
