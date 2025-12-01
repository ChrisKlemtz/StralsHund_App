const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const dogSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Dog name is required'],
    trim: true,
  },
  breed: {
    type: String,
    trim: true,
  },
  birthDate: Date,
  age: Number,
  size: {
    type: String,
    enum: ['small', 'medium', 'large'],
    required: true,
  },
  weight: Number,
  gender: {
    type: String,
    enum: ['male', 'female'],
  },
  neutered: {
    type: Boolean,
    default: false,
  },
  temperament: [{
    type: String,
    enum: ['friendly', 'shy', 'energetic', 'playful', 'calm', 'protective'],
  }],
  photos: [String],
  vaccinations: [{
    type: {
      type: String,
      required: true,
    },
    date: Date,
    nextDue: Date,
    veterinarian: String,
  }],
  medicalNotes: String,
  microchipNumber: String,
});

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
  },
  password: {
    type: String,
    required: function() {
      return !this.oauthProvider;
    },
    minlength: [6, 'Password must be at least 6 characters'],
    select: false,
  },
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 30,
  },
  firstName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
  },
  avatar: {
    type: String,
    default: 'https://res.cloudinary.com/stralshund/image/upload/v1/defaults/avatar-default.png',
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
    },
    city: String,
    country: {
      type: String,
      default: 'Germany',
    },
  },
  dogs: [dogSchema],
  bio: {
    type: String,
    maxlength: 500,
  },
  preferences: {
    searchRadius: {
      type: Number,
      default: 5000, // meters
    },
    notifications: {
      meetups: { type: Boolean, default: true },
      lostDogs: { type: Boolean, default: true },
      messages: { type: Boolean, default: true },
      likes: { type: Boolean, default: true },
      comments: { type: Boolean, default: true },
    },
    privacySettings: {
      profilePublic: { type: Boolean, default: true },
      showLocation: { type: Boolean, default: true },
      showDogs: { type: Boolean, default: true },
      messagesFromEveryone: { type: Boolean, default: true },
    },
  },
  accountType: {
    type: String,
    enum: ['standard', 'premium', 'host', 'premium_plus'],
    default: 'standard',
  },
  premium: {
    active: {
      type: Boolean,
      default: false,
    },
    expiresAt: Date,
    features: [String],
  },
  stats: {
    totalRoutes: { type: Number, default: 0 },
    totalDistance: { type: Number, default: 0 },
    totalMeetups: { type: Number, default: 0 },
    schnuffelScore: { type: Number, default: 0 },
  },
  oauthProvider: {
    type: String,
    enum: ['google', 'apple', 'facebook'],
  },
  oauthId: String,
  emailVerified: {
    type: Boolean,
    default: false,
  },
  verificationToken: String,
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  refreshToken: String,
  lastLogin: Date,
  blockedUsers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  friends: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  status: {
    type: String,
    enum: ['active', 'suspended', 'deleted'],
    default: 'active',
  },
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

// Indexes (email and username already have unique index from schema)
userSchema.index({ 'location.coordinates': '2dsphere' });
userSchema.index({ 'stats.schnuffelScore': -1 });

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Virtual for full name
userSchema.virtual('fullName').get(function() {
  return `${this.firstName || ''} ${this.lastName || ''}`.trim() || this.username;
});

module.exports = mongoose.model('User', userSchema);
