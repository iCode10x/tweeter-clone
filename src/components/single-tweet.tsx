import { DatabaseResponceTweet } from '@/Types'

const SingleTweet = ({
  tweetText,
  User,
  _id,
  likes,
  tweetComments,
}: DatabaseResponceTweet) => {
  console.log(_id)
  return <div>{tweetText}</div>
}
export default SingleTweet
