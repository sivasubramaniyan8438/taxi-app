const express = require('express');
const Ride = require('../models/Ride');
const { protect } = require('../middleware/auth');

const router = express.Router();

// POST /api/rides - Book a ride
router.post('/', protect, async (req, res) => {
  try {
    const { pickup, destination } = req.body;

    const ride = await Ride.create({
      user: req.user._id,
      pickup,
      destination
    });

    res.status(201).json({ message: 'Ride booked!', ride });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/rides - Get my rides
router.get('/', protect, async (req, res) => {
  try {
    const rides = await Ride.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json({ rides });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PATCH /api/rides/:id/cancel - Cancel a ride
router.patch('/:id/cancel', protect, async (req, res) => {
  try {
    const ride = await Ride.findOne({ _id: req.params.id, user: req.user._id });
    if (!ride) return res.status(404).json({ message: 'Ride not found' });

    if (ride.status !== 'requested') {
      return res.status(400).json({ message: 'Cannot cancel this ride' });
    }

    ride.status = 'cancelled';
    await ride.save();

    res.json({ message: 'Ride cancelled', ride });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
