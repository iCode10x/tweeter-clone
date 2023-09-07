import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Image from 'next/image'
import Link from 'next/link'
import { SignOutButton } from '@clerk/nextjs'
interface Props {
  imgUrl: string
}
const ProfileDropDown = ({ imgUrl }: Props) => {
  return (
    <div className="font-PoppinsMedium">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Image
            src={imgUrl}
            width={50}
            height={50}
            alt="profile"
            className="sm:hidden rounded-full"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="ml-6 rounded-xl dark:bg-black dark:border-[#242424]">
          <DropdownMenuLabel>
            <Link href="/">Home</Link>
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="border-[#CACACA] dark:border-[#242424] " />
          <DropdownMenuItem>
            <Link href="/profile">My Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="dark:border-[#242424]" />
          <DropdownMenuItem>
            <SignOutButton>Logout</SignOutButton>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
export default ProfileDropDown
