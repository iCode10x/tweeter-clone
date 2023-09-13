import mongoose from 'mongoose'

const userModel = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  profileImage: { type: String, required: true },
  clerkId: { type: String, required: true },
  tweets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tweet' }],
  notifications: [
    {
      visitorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      activity: { type: String },
    },
  ],
  notificatinsNumber: { type: Number },
})

export const User = mongoose.models.users || mongoose.model('users', userModel)
