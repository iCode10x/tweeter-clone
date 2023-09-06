import Link from 'next/link'
import Image from 'next/image'

interface Props {
  name: string
  imgUrl: string
  email: string
}
const Profile = ({ name, email, imgUrl }: Props) => {
  return (
    <Link href="#">
      <div className="bg-[#EAEAEA] dark:bg-[#121212] p-2 flex flex-col items-center rounded-b-md w-[250px]">
        <p className="font-SamsungSharpSansBold p-3 flex items-center gap-2 dark:text-white">
          My Profile
          <Image
            src="/profileIcon.png"
            alt="icon"
            width={15}
            height={15}
            className="object-contain dark:invert"
          />
        </p>
        <div className="flex items-center gap-2 bg-white dark:bg-black rounded-md p-2 pr-8">
          <Image
            src={imgUrl}
            width={60}
            height={60}
            alt="profile"
            className="rounded-full"
          />
          <div>
            <p className="font-SamsungSharpSansBold dark:text-white">{name}</p>
            <p className="text-[12px] font-SamsungSharpSans dark:text-[#787878]">
              {email}
            </p>
          </div>
        </div>
      </div>
    </Link>
  )
}
export default Profile
