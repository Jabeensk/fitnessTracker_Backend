import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true
  },
  
  bio: {
    type: String,
    default: ''
  },
  avatar: {
    type: String,
    default: '' // URL of the avatar image here
  },
 
}, { timestamps: true });

export default mongoose.model('Profile', profileSchema);
