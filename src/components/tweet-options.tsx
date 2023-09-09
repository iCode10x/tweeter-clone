'use client'

import Image from 'next/image'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
interface Props {
  tweetUserClerkID: string
  LoggedInUserClerkId: string
}
const TweetOptions = ({ tweetUserClerkID, LoggedInUserClerkId }: Props) => {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Image src="/more.png" alt="options" width={20} height={20} />
        </DropdownMenuTrigger>
        {tweetUserClerkID === LoggedInUserClerkId ? (
          <DropdownMenuContent className="rounded-[10px] relative  dark:bg-black dark:border-[#242424] mr-6">
            <DropdownMenuLabel>
              <p className="text-[16px] font-PoppinsLight p-1">Edit Tweet</p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>
              <p className="text-[16px] font-PoppinsLight p-1">Delete</p>
            </DropdownMenuLabel>
          </DropdownMenuContent>
        ) : (
          <DropdownMenuContent className="rounded-[10px] relative  dark:bg-black dark:border-[#242424] mr-6">
            <DropdownMenuLabel>
              <p className="text-[16px] font-PoppinsLight p-1">Copy Tweet</p>
            </DropdownMenuLabel>
          </DropdownMenuContent>
        )}
      </DropdownMenu>
    </div>
  )
}
export default TweetOptions

{
  /* <DropdownMenuLabel>
            <p className="font-SamsungSharpSansBold py-2 px-6 text-center text-[16px]">
              Settings
            </p>
          </DropdownMenuLabel> */
}

{
  /* <Image
            src="/close.png"
            alt="close"
            width={12}
            height={12}
            className="object-contain absolute right-3 top-2"
          /> */
}
