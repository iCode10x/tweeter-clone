import ThemeSwitcher from '@/components/theme-switcher'
import Image from 'next/image'
import { SignOutButton } from '@clerk/nextjs'
import Link from 'next/link'
import { createUserInDB } from '@/lib/actions/UserActions'
import Profile from '@/components/profile'
import ProfileDropDown from '@/components/profile-dropDown'
import { currentUser, SignedIn } from '@clerk/nextjs'
import { ClerkUserTypes, DatabaseResponceTweet } from '@/Types'
import AddTweetButton from '@/components/add-tweet-button'
import { fetchAllTweets } from '@/lib/actions/TweetActions'
import SingleTweet from '@/components/single-tweet'
const Home = async () => {
  // @ts-ignore
  const User: ClerkUserTypes = await currentUser()

  let databaseResponceId: string = ''
  if (User) {
    const res: string = await createUserInDB(
      User.firstName,
      User.emailAddresses[0].emailAddress,
      User.imageUrl,
      User.id
    )
    databaseResponceId = res
  }
  // @ts-ignore
  const allTweets: DatabaseResponceTweet[] = await fetchAllTweets()
  return (
    <div className="flex relative">
      {/* left section */}
      <div className="hidden sm:flex fixed h-screen  flex-col justify-between  px-3 pr-8">
        {User ? (
          <Profile
            name={User.firstName}
            imgUrl={User.imageUrl}
            email={User.emailAddresses[0].emailAddress}
            profileLink={databaseResponceId}
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
      <div className="bg-[#F6F6F6] dark:bg-[#060606] w-screen sm:w-[60vw]">
        <div className="sm:p-3 p-5  border border-[#CACACA] dark:border-[#242424] flex items-center justify-between sm:justify-center">
          {User ? (
            <ProfileDropDown imgUrl={User.imageUrl} />
          ) : (
            <Link
              href="/login"
              className="sm:hidden p-2 rounded-md dark:bg-[#121212] bg-[#EAEAEA] "
            >
              <button className="w-full font-SamsungSharpSansBold text-center p-4 bg-white dark:bg-black dark:text-white">
                Login
              </button>
            </Link>
          )}
          <Image src="/X.png" alt="X" width={50} height={50} className="" />
          <div className="sm:hidden">
            <ThemeSwitcher />
          </div>
        </div>
        {/* Tweets */}
        {/* ///////////// */}
        <div>
          {allTweets.map((tweet) => (
            <SingleTweet
              LoggedInUserClerkId={User.id}
              key={tweet._id}
              tweetText={tweet.tweetText}
              userClerkId={User.id}
              userId={User.id}
              userName={User.firstName}
              userProfileImage={User.imageUrl}
              tweetImage={tweet.tweetImage}
              tweetImageCaption={tweet.tweetImageCaption}
              tweetComments={tweet.tweetComments}
              _id={tweet._id}
              likes={tweet.likes}
            />
          ))}
        </div>

        {/* ////////////// */}
      </div>
      {/* right section  */}
      <div className="hidden sm:block fixed right-6 top-6">
        <ThemeSwitcher />
      </div>
      <div className="fixed bottom-[50px] right-6">
        <AddTweetButton userId={databaseResponceId} />
      </div>

      {/* Popover section */}

      {/* <div className="fixed   h-screen w-screen dark:bg-black/40 bg-white/70 "></div> */}
    </div>
  )
}
export default Home
