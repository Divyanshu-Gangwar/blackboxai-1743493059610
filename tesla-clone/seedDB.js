const mongoose = require('mongoose');
const Vehicle = require('./models/Vehicle');
const dotenv = require('dotenv');

dotenv.config({ path: './.env' });

// Connect to DB
mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const vehicles = [
  {
    model: 'Model S',
    variant: 'Plaid',
    basePrice: 114990,
    range: 396,
    topSpeed: 200,
    acceleration: 1.99,
    images: [
      'https://images.pexels.com/photos/3729464/pexels-photo-3729464.jpeg',
      'https://images.pexels.com/photos/1007410/pexels-photo-1007410.jpeg'
    ],
    availableColors: ['Pearl White', 'Solid Black', 'Midnight Silver', 'Deep Blue'],
    wheelOptions: [
      { name: '19" Tempest', size: 19, price: 0 },
      { name: '21" Arachnid', size: 21, price: 4500 }
    ],
    features: [
      'Acceleration 0-60 mph in 1.99s',
      'Top Speed 200 mph',
      'Range 396 miles',
      '1,020 horsepower'
    ]
  },
  {
    model: 'Model 3',
    variant: 'Performance',
    basePrice: 52990,
    range: 315,
    topSpeed: 162,
    acceleration: 3.1,
    images: [
      'https://images.pexels.com/photos/337909/pexels-photo-337909.jpeg',
      'https://images.pexels.com/photos/1035108/pexels-photo-1035108.jpeg'
    ],
    availableColors: ['Pearl White', 'Solid Black', 'Midnight Silver', 'Red Multi-Coat'],
    wheelOptions: [
      { name: '18" Aero', size: 18, price: 0 },
      { name: '19" Sport', size: 19, price: 1500 }
    ],
    features: [
      'Acceleration 0-60 mph in 3.1s',
      'Top Speed 162 mph',
      'Range 315 miles',
      'Dual Motor All-Wheel Drive'
    ]
  }
];

const seedDB = async () => {
  await Vehicle.deleteMany({});
  await Vehicle.insertMany(vehicles);
  console.log('Database seeded!');
  mongoose.connection.close();
};

seedDB().catch(err => {
  console.error('Error seeding database:', err);
  mongoose.connection.close();
});