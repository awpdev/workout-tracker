const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
  day: {
    type: Date,
    default: Date.now
  },
  exercises: [
    {
      type: String,
      name: {
        type: String,
        trim: true,
        required: true
      },
      duration: {
        type: Number,
        default: 0
      },
      weight: {
        type: Number,
        default: 0
      },
      reps: {
        type: Number,
        default: 0
      }
    }
  ]
});

const Workout = mongoose.model('Workout', workoutSchema);

module.exports = Workout;