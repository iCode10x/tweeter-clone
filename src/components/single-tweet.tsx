import { DatabaseResponceTweet } from '@/Types'

const SingleTweet = ({
  tweetText,
  User,
  _id,
  likes,
  tweetComments,
  tweetImage,
  tweetImageCaption,
}: DatabaseResponceTweet) => {
  return (
    <div className="border-2">
      {tweetText && <p>{tweetText}</p>}
      {tweetImage && (
        <div>
          <p>{tweetImageCaption}</p>
          <p>{tweetImage}</p>
        </div>
      )}
    </div>
  )
}
export default SingleTweet
