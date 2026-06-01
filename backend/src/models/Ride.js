const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  pickup: {
    type: String,
    required: [true, 'Pickup location is required']
  },
  destination: {
    type: String,
    required: [true, 'Destination is required']
  },
  status: {
    type: String,
    enum: ['requested', 'accepted', 'in-progress', 'completed', 'cancelled'],
    default: 'requested'
  },
  fare: {
    type: Number,
    default: () => Math.floor(Math.random() * 200) + 50 // random fare ₹50-₹250
  },
  driver: {
    name: { type: String, default: 'Rajan Kumar' },
    phone: { type: String, default: '+91 98765 43210' },
    vehicle: { type: String, default: 'TN 01 AB 1234' }
  }
}, { timestamps: true });

module.exports = mongoose.model('Ride', rideSchema);
