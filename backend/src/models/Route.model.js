const mongoose = require('mongoose');

const routeSchema = new mongoose.Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: [true, 'Route name is required'],
    trim: true,
    maxlength: 100,
  },
  description: {
    type: String,
    maxlength: 1000,
  },
  city: {
    type: String,
    required: true,
    index: true,
  },
  country: {
    type: String,
    default: 'Germany',
  },
  path: [{
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
    elevation: Number,
  }],
  startPoint: {
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
    address: String,
  },
  endPoint: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
    },
    coordinates: {
      type: [Number],
      required: true,
    },
    address: String,
  },
  distance: {
    type: Number,
    required: true, // in meters
  },
  duration: {
    type: Number, // in minutes
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: 'easy',
  },
  surface: [{
    type: String,
    enum: ['asphalt', 'grass', 'sand', 'gravel', 'forest', 'mixed'],
  }],
  features: {
    offLeash: { type: Boolean, default: false },
    waterAccess: { type: Boolean, default: false },
    dogPark: { type: Boolean, default: false },
    wasteStations: { type: Boolean, default: false },
    lighting: { type: Boolean, default: false },
    parking: { type: Boolean, default: false },
    shade: { type: Boolean, default: false },
    benches: { type: Boolean, default: false },
  },
  photos: [String],
  ratings: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    comment: String,
    date: {
      type: Date,
      default: Date.now,
    },
  }],
  warnings: [{
    type: {
      type: String,
      enum: ['traffic', 'poison', 'aggressive_dogs', 'construction', 'other'],
    },
    description: String,
    location: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point',
      },
      coordinates: [Number],
    },
    reportedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    date: {
      type: Date,
      default: Date.now,
    },
    resolved: {
      type: Boolean,
      default: false,
    },
  }],
  avgRating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  timesCompleted: {
    type: Number,
    default: 0,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  tags: [String],
  status: {
    type: String,
    enum: ['active', 'inactive', 'flagged'],
    default: 'active',
  },
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

// Indexes
routeSchema.index({ city: 1 });
routeSchema.index({ startPoint: '2dsphere' });
routeSchema.index({ creator: 1 });
routeSchema.index({ avgRating: -1 });
routeSchema.index({ difficulty: 1 });

// Calculate average rating
routeSchema.methods.calculateAvgRating = function() {
  if (this.ratings.length === 0) {
    this.avgRating = 0;
    return;
  }

  const sum = this.ratings.reduce((acc, rating) => acc + rating.rating, 0);
  this.avgRating = (sum / this.ratings.length).toFixed(1);
};

// Pre-save middleware
routeSchema.pre('save', function(next) {
  if (this.isModified('ratings')) {
    this.calculateAvgRating();
  }
  next();
});

// Virtual for like count
routeSchema.virtual('likeCount').get(function() {
  return this.likes.length;
});

module.exports = mongoose.model('Route', routeSchema);
