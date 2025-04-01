const mongoose = require('mongoose');

const VehicleSchema = new mongoose.Schema({
  model: {
    type: String,
    required: [true, 'Please add a model name'],
    enum: ['Model S', 'Model 3', 'Model X', 'Model Y', 'Cybertruck', 'Roadster']
  },
  variant: {
    type: String,
    required: [true, 'Please add a variant name'],
    enum: ['Standard Range', 'Long Range', 'Performance', 'Plaid']
  },
  basePrice: {
    type: Number,
    required: [true, 'Please add a base price']
  },
  range: {
    type: Number,
    required: [true, 'Please add range in miles']
  },
  topSpeed: {
    type: Number,
    required: [true, 'Please add top speed in mph']
  },
  acceleration: {
    type: Number,
    required: [true, 'Please add 0-60 mph time']
  },
  images: {
    type: [String],
    required: [true, 'Please add at least one image URL']
  },
  availableColors: {
    type: [String],
    required: [true, 'Please add available colors']
  },
  wheelOptions: {
    type: [{
      name: String,
      size: Number,
      price: Number
    }],
    required: [true, 'Please add wheel options']
  },
  features: {
    type: [String],
    required: [true, 'Please add features']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Static method to get all vehicles grouped by model
VehicleSchema.statics.getModels = async function() {
  return this.aggregate([
    {
      $group: {
        _id: '$model',
        variants: { $push: '$$ROOT' }
      }
    },
    { $sort: { '_id': 1 } }
  ]);
};

module.exports = mongoose.model('Vehicle', VehicleSchema);