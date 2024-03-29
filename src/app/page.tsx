import ThemeSwitcher from '@/components/theme-switcher'
import Image from 'next/image'
import { SignOutButton } from '@clerk/nextjs'
import Link from 'next/link'
import { createUserInDB, fetchUserData } from '@/lib/actions/UserActions'
import Profile from '@/components/profile'
import ProfileDropDown from '@/components/profile-dropDown'
import { currentUser, SignedIn } from '@clerk/nextjs'
import Notifications from '@/components/Notifications'
import {
  ClerkUserTypes,
  DatabaseResponceTweets,
  DatabaseResponceUser,
} from '@/Types'
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
  const allTweets: DatabaseResponceTweets[] = await fetchAllTweets()

  const UserData: DatabaseResponceUser = await fetchUserData(databaseResponceId)
  // console.log(UserData.notifications)
  return (
    <div className="flex relative">
      {/* left section */}
      <div className="hidden sm:flex fixed h-screen  flex-col justify-between  px-3 pr-8">
        <div>
          {User ? (
            <div>
              <Profile
                name={UserData.name}
                imgUrl={UserData.profileImage}
                email={UserData.email}
                profileLink={UserData._id}
              />
              {/* <div>
                <Notifications
                  LoggedInUserId={UserData._id}
                  notifications={JSON.stringify(UserData.notifications)}
                  notificationsNumber={UserData.notificatinsNumber}
                />
              </div> */}
            </div>
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
        </div>

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
            <ProfileDropDown
              imgUrl={UserData.profileImage}
              linkId={UserData._id}
            />
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
        {allTweets.length > 0 && (
          <div>
            {allTweets.reverse().map((tweet) => (
              <SingleTweet
                LoggedInUserClerkId={UserData.clerkId}
                LoggedInUserDatabaseId={UserData._id}
                key={tweet._id}
                tweetCreaterID={tweet.User._id}
                tweetText={tweet.tweetText}
                userClerkId={tweet.User.clerkId}
                userName={tweet.User.name}
                userProfileImage={tweet.User.profileImage}
                tweetImage={tweet.tweetImage}
                tweetImageCaption={tweet.tweetImageCaption}
                tweetComments={JSON.stringify(tweet.tweetComments.reverse())}
                _id={tweet._id}
                likes={tweet.likes}
              />
            ))}
          </div>
        )}

        {/* ////////////// */}
      </div>
      {/* right section  */}
      <div className="hidden sm:block fixed right-6 top-6">
        <ThemeSwitcher />
      </div>
      <div className="fixed bottom-[50px] right-6">
        <AddTweetButton userId={databaseResponceId} />
      </div>
    </div>
  )
}
export default Home
