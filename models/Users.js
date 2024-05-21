import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 20,
  },
  email: {
    type: String,
    required: true,
    // unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
    maxLength: 12,
  },
  role: {
    type: String,
    enum: ['Admin', 'Regular', 'Premium'],
    default: 'Regular',
    message: '{VALUE} is not valid for role.'
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  age: {
    min: 18,
    type: Number,
  },
});

userSchema.index({email: 1})
userSchema.index({username: 1})
userSchema.index({age: -1})

export default new mongoose.model('User', userSchema);
