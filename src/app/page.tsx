import ThemeSwitcher from '@/components/theme-switcher'
import Image from 'next/image'
import { SignOutButton } from '@clerk/nextjs'
import Link from 'next/link'
import Profile from '@/components/profile'
import { currentUser, SignedIn, SignedOut } from '@clerk/nextjs'
import { ClerkUserTypes } from '@/Types'
const Home = async () => {
  // @ts-ignore
  const User: ClerkUserTypes = await currentUser()

  return (
    <div className="flex relative">
      {/* left section */}
      <div className="hidden sm:flex fixed h-screen  flex-col justify-between  px-3 pr-8">
        {User?.id ? (
          <Profile
            name={User.firstName}
            imgUrl={User.imageUrl}
            email={User.emailAddresses[0].emailAddress}
          />
        ) : (
          <Link
            href="/login"
            className="w-[250px] mt-8 p-2 rounded-md dark:bg-[#121212] bg-[#EAEAEA] mb-[50px]"
          >
            <button className="w-full font-SamsungSharpSansBold text-center p-4 bg-white dark:bg-black dark:text-white">
              Login
            </button>
          </Link>
        )}
        <SignedIn>
          <SignOutButton>
            <div className="w-[250px] p-2 rounded-md dark:bg-[#121212] bg-[#EAEAEA] mb-[50px]">
              <button className="w-full font-SamsungSharpSansBold text-center p-4 bg-white dark:bg-black dark:text-white">
                Logout
              </button>
            </div>
          </SignOutButton>
        </SignedIn>
      </div>
      <div className="w-[295px] hidden sm:flex"></div>
      {/* middle scroll section */}
      <div className="bg-[#F6F6F6] dark:bg-[#060606] w-screen sm:w-[60vw] h-[200vh]">
        <div className="sm:p-3 p-5  border border-[#242424] flex items-center justify-between sm:justify-center">
          <Image
            src="/profile.png"
            width={50}
            height={50}
            alt="profile"
            className="sm:hidden"
          />
          <Image src="/X.png" alt="X" width={70} height={70} className="" />
          <div className="sm:hidden">
            <ThemeSwitcher />
          </div>
        </div>
        {/* Tweets */}
        <div></div>
      </div>
      {/* right section  */}

      <div className="hidden sm:block fixed right-6 top-6">
        <ThemeSwitcher />
      </div>
      <div>
        <Image
          src="/addlight.png"
          alt=""
          height={60}
          width={60}
          className="dark:invert fixed bottom-[50px] right-6"
        />
      </div>
    </div>
  )
}
export default Home
