import ProfileDropDown from '@/components/profile-dropDown'
import ThemeSwitcher from '@/components/theme-switcher'
import { SignOutButton, SignedIn } from '@clerk/nextjs'
import AddTweetButton from '@/components/add-tweet-button'
import Image from 'next/image'
import ProfilePageHomeLink from '@/components/profile-page-home-link'
import { fetchUserData } from '@/lib/actions/UserActions'
import { DatabaseResponceTweets, DatabaseResponceUser } from '@/Types'
import ProfileSettingsButton from '@/components/profile-settings-button'
import SingleTweet from '@/components/single-tweet'
import { fetchUserTweets } from '@/lib/actions/TweetActions'

const Profile = async ({ params: { id } }: { params: { id: string } }) => {
  const UserData: DatabaseResponceUser = await fetchUserData(id)
  // @ts-ignore
  const UserTweets: DatabaseResponceTweets[] = await fetchUserTweets(id)
  return (
    <div className="flex relative">
      {/* left section */}
      <div className="hidden sm:flex fixed h-screen  flex-col justify-between  px-3 pr-8">
        <ProfilePageHomeLink />
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
          <ProfileDropDown imgUrl={UserData.profileImage} />

          <Image src="/X.png" alt="X" width={50} height={50} className="" />
          <div className="sm:hidden">
            <ThemeSwitcher />
          </div>
        </div>
        {/* Profile data */}
        <div>
          <div className="relative border border-[#CACACA] dark:border-[#242424] p-4">
            <div className="flex flex-col items-center">
              <Image
                src={UserData.profileImage}
                alt="profile"
                width={150}
                height={150}
                className="rounded-full"
              />
              <div className="flex flex-col items-center">
                <p className="my-2 font-SamsungSharpSansBold text-lg dark:text-white">
                  {UserData.name}
                </p>
                <p className="font-SamsungSharpSansMedium text-[#787878]">
                  {UserData.email}
                </p>
              </div>
            </div>
            <p className="text-xl mt-12 font-SamsungSharpSansBold dark:text-white">
              My Posts
            </p>
            <div className="absolute right-5 top-5">
              <ProfileSettingsButton
                userId={UserData._id}
                username={UserData.name}
              />
            </div>
          </div>
          <div>
            {UserTweets.map((tweet) => (
              <SingleTweet
                LoggedInUserClerkId={UserData.clerkId}
                LoggedInUserDatabaseId={id}
                key={tweet._id}
                tweetText={tweet.tweetText}
                userClerkId={tweet.User.clerkId}
                userName={UserData.name}
                userProfileImage={UserData.profileImage}
                tweetImage={tweet.tweetImage}
                tweetImageCaption={tweet.tweetImageCaption}
                tweetComments={JSON.stringify(tweet.tweetComments.reverse())}
                _id={tweet._id}
                likes={tweet.likes}
              />
            ))}
          </div>
        </div>
      </div>
      {/* right section  */}

      <div className="hidden sm:block fixed right-6 top-6">
        <ThemeSwitcher />
      </div>
      <div className="fixed bottom-[50px] right-6">
        <AddTweetButton userId={id} />
      </div>
    </div>
  )
}
export default Profile
