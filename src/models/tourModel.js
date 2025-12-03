const mongoose = require('mongoose');
/**
 * @param {string} name - tour's name.
 * @param {string} destination - tour's destination.
 * @param {string} duration - tour's duration .
 * @param {string} groupSize -groupSize
 * @param {string} price - tour's price.
 */
const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    //   required: [true, 'A tour must have a name'],
      unique: true,
      trim: true,
    },

    destination: {
      type: String,
    //   required: [true, 'A tour must have a destination'],
    },

    duration: {
      type: Number,
    //   required: [true, 'A tour must have a duration (in days)'],
    },

    groupSize: {
      type: Number,
    //   required: [true, 'Please provide the group size'],
    },

    type: {
      type: String,
      default: 'General',
    },

    difficulty: {
      type: String,
    //   required:true,
      enum: ['easy', 'medium', 'difficult'],
      default: 'easy',
    },

    price: {
      type: Number,
    //   required: [true, 'A tour must have a price'],
      min: [0, 'Price must be positive'], // added validation
    },

    summary: {
      type: String,
      trim: true,
    //   required: [true, 'A tour must have a summary'],
      maxlength: [200, 'Summary cannot exceed 200 characters'],
    },

    description: {
      type: String,
      trim: true,
    },

    startDates: [Date],

    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0'],
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
      ref: 'User'
    },
  },
  { timestamps: true,versionKey:false }
);

const Tour = mongoose.model('Tour', tourSchema);
module.exports = Tour ;