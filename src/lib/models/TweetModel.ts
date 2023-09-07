import mongoose from 'mongoose'

const tweetModel = new mongoose.Schema({
  User: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  tweetText: { type: String },
  tweetImage: { type: String },
  tweetImageCaption: { type: String },
  likes: { type: Number, default: 0 },
  tweetComments: [
    {
      commentator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      text: { type: String },
    },
  ],
})

export const Tweet =
  mongoose.models.tweets || mongoose.model('tweets', tweetModel)
