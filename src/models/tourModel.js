const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      trim: true,
      required: [true],
    },

    destination: {
      type: String,
      required: [true],
    },

    duration: {
      type: Number,
      required: [true],
    },

    groupSize: {
      type: Number,
      required: [true],
      min: [1],
    },

    type: {
      type: String,
      default: 'General',
    },

    difficulty: {
      type: String,
      enum: ['easy', 'medium', 'difficult'],
      default: 'easy',
    },

    price: {
      type: Number,
      required: [true],
      min: [0],
    },

    summary: {
      type: String,
      trim: true,
      maxlength: [200],
      required: [true],
    },

    description: {
      type: String,
      trim: true,
    },

    startDates: [Date],

    availability: [
      {
        date: { type: Date, required: true },
        seatsLeft: { type: Number, required: true }, 
      },
    ],

    bookingsCount: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ['active', 'cancelled', 'completed'],
      default: 'active',
    },

    // Stripe integration (optional)
    // stripePriceId: {
    //   type: String,
    // },

    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1],
      max: [5],
    },

    ratingsQuantity: {
      type: Number,
      default: 0,
    },

    imageCover: {
      type: String,
      default: 'default-tour.jpg',
    },

    images: [String],

    contact: {
      type: String,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true, versionKey: false }
);


const Tour = mongoose.model('Tour', tourSchema);
module.exports = Tour;
