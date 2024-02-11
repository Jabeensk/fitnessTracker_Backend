import mongoose from 'mongoose';

const workoutSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true
  },
  activity: {
    type: String,
    required: true
  },
  durationMinutes: {
    type: Number,
    required: true
  },
  caloriesBurned: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Workout', workoutSchema);
