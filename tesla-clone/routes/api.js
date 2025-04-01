const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Vehicle = require('../models/Vehicle');
const auth = require('../middleware/auth');

// @route    GET /api/vehicles
// @desc     Get all vehicles grouped by model
// @access   Public
router.get('/', async (req, res) => {
  try {
    const vehicles = await Vehicle.getModels();
    res.json(vehicles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET /api/vehicles/:id
// @desc     Get single vehicle
// @access   Public
router.get('/:id', async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);

    if (!vehicle) {
      return res.status(404).json({ msg: 'Vehicle not found' });
    }

    res.json(vehicle);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Vehicle not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route    POST /api/vehicles
// @desc     Create a vehicle (Admin only)
// @access   Private
router.post(
  '/',
  [
    auth,
    [
      check('model', 'Model is required').not().isEmpty(),
      check('variant', 'Variant is required').not().isEmpty(),
      check('basePrice', 'Base price is required').isNumeric(),
      check('range', 'Range is required').isNumeric(),
      check('topSpeed', 'Top speed is required').isNumeric(),
      check('acceleration', 'Acceleration is required').isNumeric()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      model,
      variant,
      basePrice,
      range,
      topSpeed,
      acceleration,
      images,
      availableColors,
      wheelOptions,
      features
    } = req.body;

    try {
      const newVehicle = new Vehicle({
        model,
        variant,
        basePrice,
        range,
        topSpeed,
        acceleration,
        images,
        availableColors,
        wheelOptions,
        features
      });

      const vehicle = await newVehicle.save();
      res.json(vehicle);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    POST /api/vehicles/contact
// @desc     Submit contact form
// @access   Public
router.post(
  '/contact',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('message', 'Message is required').not().isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, message } = req.body;

    try {
      // In a real app, you would save this to a database or send an email
      console.log('New contact form submission:', { name, email, message });
      res.json({ msg: 'Message received successfully!' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;