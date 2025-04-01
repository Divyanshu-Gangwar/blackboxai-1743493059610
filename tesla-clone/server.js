require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const ejs = require('ejs');

const app = express();

// Database connection
mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Route files
const auth = require('./routes/auth');
const api = require('./routes/api');

// Mount routers
app.use('/api/auth', auth);
app.use('/api', api);

// View routes
app.get('/', (req, res) => res.render('home'));
app.get('/models', (req, res) => res.render('models'));
app.get('/shop', (req, res) => res.render('shop'));
app.get('/support', (req, res) => res.render('support'));
app.get('/login', (req, res) => res.render('login'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('error', { 
    message: 'Something went wrong!',
    status: 500
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});