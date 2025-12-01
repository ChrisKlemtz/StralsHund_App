const mongoose = require('mongoose');

const meetupSchema = new mongoose.Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: 100,
  },
  description: {
    type: String,
    maxlength: 1000,
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true,
      index: '2dsphere',
    },
    name: String,
    address: String,
  },
  dateTime: {
    type: Date,
    required: true,
    index: true,
  },
  duration: {
    type: Number, // in minutes
    default: 60,
  },
  maxParticipants: Number, // null = unlimited
  participants: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    dogs: [String], // IDs from user.dogs
    joinedAt: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ['confirmed', 'maybe', 'cancelled'],
      default: 'confirmed',
    },
  }],
  dogRequirements: {
    minAge: Number, // in months
    maxAge: Number,
    sizes: [{
      type: String,
      enum: ['small', 'medium', 'large'],
    }],
    temperament: [String],
    vaccinated: { type: Boolean, default: false },
  },
  activity: {
    type: String,
    enum: ['walk', 'play', 'training', 'beach', 'hike', 'cafe', 'other'],
    default: 'walk',
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
  },
  status: {
    type: String,
    enum: ['open', 'full', 'cancelled', 'completed'],
    default: 'open',
  },
  photos: [String], // uploaded after event
  tags: [String],
  recurringPattern: {
    enabled: { type: Boolean, default: false },
    frequency: {
      type: String,
      enum: ['daily', 'weekly', 'monthly'],
    },
    endDate: Date,
  },
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

// Indexes
meetupSchema.index({ location: '2dsphere' });
meetupSchema.index({ dateTime: 1 });
meetupSchema.index({ creator: 1 });
meetupSchema.index({ status: 1 });
meetupSchema.index({ activity: 1 });

// Virtual for participant count
meetupSchema.virtual('participantCount').get(function() {
  return this.participants.filter(p => p.status === 'confirmed').length;
});

// Check if meetup is full
meetupSchema.virtual('isFull').get(function() {
  if (!this.maxParticipants) return false;
  return this.participantCount >= this.maxParticipants;
});

// Pre-save middleware to update status
meetupSchema.pre('save', function(next) {
  if (this.isFull && this.status === 'open') {
    this.status = 'full';
  }
  next();
});

module.exports = mongoose.model('Meetup', meetupSchema);
