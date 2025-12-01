const mongoose = require('mongoose');

const dogSpotSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: [true, 'Spot name is required'],
    trim: true,
    maxlength: 100,
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
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
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
      index: true,
    },
    postalCode: String,
    country: {
      type: String,
      default: 'Germany',
    },
  },
  propertyDetails: {
    size: {
      type: Number,
      required: [true, 'Size in square meters is required'],
      min: 10,
    },
    fenced: {
      type: Boolean,
      required: true,
    },
    fenceHeight: Number, // in cm
    surface: [{
      type: String,
      enum: ['grass', 'paving', 'gravel', 'sand', 'mixed'],
    }],
    shade: Boolean,
    shelterAvailable: Boolean,
  },
  amenities: {
    waterSource: { type: Boolean, default: false },
    seating: { type: Boolean, default: false },
    dogToys: { type: Boolean, default: false },
    wasteDisposal: { type: Boolean, default: false },
    parking: { type: Boolean, default: false },
    parkingSpots: Number,
    accessibleForWheelchair: { type: Boolean, default: false },
  },
  capacity: {
    maxDogsSimultaneous: {
      type: Number,
      required: true,
      min: 1,
    },
    maxOwnersSimultaneous: Number,
  },
  restrictions: {
    allowedSizes: [{
      type: String,
      enum: ['small', 'medium', 'large'],
    }],
    allowedAges: {
      minMonths: { type: Number, default: 0 },
      maxMonths: Number,
    },
    neuteredOnly: { type: Boolean, default: false },
    restrictedBreeds: [String],
    requireVaccinated: { type: Boolean, default: true },
    leashRequired: { type: Boolean, default: false },
    allowChildren: { type: Boolean, default: true },
    smokingAllowed: { type: Boolean, default: false },
  },
  photos: {
    type: [String],
    validate: {
      validator: function(v) {
        return v.length >= 3;
      },
      message: 'At least 3 photos are required',
    },
  },
  rules: {
    type: String,
    maxlength: 500,
  },
  availability: {
    schedule: [{
      day: {
        type: String,
        enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
      },
      slots: [{
        start: String, // "09:00"
        end: String,   // "12:00"
        available: { type: Boolean, default: true },
      }],
    }],
    blockedDates: [Date],
    allowSpontaneous: { type: Boolean, default: false },
    advanceBookingDays: {
      type: Number,
      default: 14,
    },
  },
  pricing: {
    type: {
      type: String,
      enum: ['free', 'paid', 'donation'],
      default: 'free',
    },
    pricePerHour: Number,
    pricePerVisit: Number,
    donationSuggestion: Number,
    currency: {
      type: String,
      default: 'EUR',
    },
  },
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
    cleanliness: { type: Number, min: 1, max: 5 },
    accuracy: { type: Number, min: 1, max: 5 },
    hospitality: { type: Number, min: 1, max: 5 },
    date: {
      type: Date,
      default: Date.now,
    },
  }],
  avgRating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  totalBookings: {
    type: Number,
    default: 0,
  },
  totalRevenue: {
    type: Number,
    default: 0,
  },
  stats: {
    totalVisitors: { type: Number, default: 0 },
    repeatVisitors: { type: Number, default: 0 },
    averageDuration: { type: Number, default: 0 },
  },
  verification: {
    verified: { type: Boolean, default: false },
    verifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    verifiedAt: Date,
    verificationDocuments: [String],
  },
  insurance: {
    hasLiabilityInsurance: { type: Boolean, default: false },
    insuranceProvider: String,
    policyNumber: String,
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'pending', 'suspended'],
    default: 'pending',
  },
  featured: {
    type: Boolean,
    default: false,
  },
  views: {
    type: Number,
    default: 0,
  },
  favoriteCount: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

// Indexes
dogSpotSchema.index({ location: '2dsphere' });
dogSpotSchema.index({ owner: 1 });
dogSpotSchema.index({ 'location.city': 1 });
dogSpotSchema.index({ 'pricing.type': 1 });
dogSpotSchema.index({ avgRating: -1 });
dogSpotSchema.index({ status: 1 });

// Calculate average rating
dogSpotSchema.methods.calculateAvgRating = function() {
  if (this.ratings.length === 0) {
    this.avgRating = 0;
    return;
  }

  const sum = this.ratings.reduce((acc, rating) => acc + rating.rating, 0);
  this.avgRating = (sum / this.ratings.length).toFixed(1);
};

// Pre-save middleware to update avgRating
dogSpotSchema.pre('save', function(next) {
  if (this.isModified('ratings')) {
    this.calculateAvgRating();
  }
  next();
});

// Virtual for availability status
dogSpotSchema.virtual('isAvailable').get(function() {
  return this.status === 'active';
});

module.exports = mongoose.model('DogSpot', dogSpotSchema);
