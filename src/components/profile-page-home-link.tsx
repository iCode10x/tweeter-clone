import Link from 'next/link'
import Image from 'next/image'
const ProfilePageHomeLink = () => {
  return (
    <Link href="/">
      <div className="bg-[#EAEAEA] dark:bg-[#121212] p-2 flex flex-col items-center rounded-b-md w-[250px]">
        <div className="flex w-full justify-center mt-12 items-center gap-2 bg-white dark:bg-black rounded-md p-2 pr-8">
          <Image
            src="/home-icon-w.png"
            alt="home"
            width={20}
            height={20}
            className="invert "
          />
          <p className="font-SamsungSharpSansBold dark:text-white">Home</p>
        </div>
      </div>
    </Link>
  )
}
export default ProfilePageHomeLink
