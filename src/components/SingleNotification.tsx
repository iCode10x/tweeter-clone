interface Props {
  name: string
  profileImage: string
  activity: 'like' | 'comment'
}
import Image from 'next/image'
const SingleNotification = ({ activity, name, profileImage }: Props) => {
  return (
    <div className="flex gap-2 border-b border-[#CACACA] dark:border-[#242424] items-center p-2">
      <Image
        src={profileImage}
        alt="profile"
        width={30}
        height={30}
        className="rounded-full"
      />
      <p className="text-[14px]">
        {name} {activity === 'like' ? 'liked' : 'commented on'} your tweet
      </p>
    </div>
  )
}
export default SingleNotification
