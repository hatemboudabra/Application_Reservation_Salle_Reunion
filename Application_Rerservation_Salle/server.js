const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const meetingRoutes = require('./routes/meetingRoom');
const reservationRoutes = require('./routes/Reservation');

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());

// Allow all origins for development or specify your frontend URL
app.use(cors({
  origin: 'http://localhost/', 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use('/auth', authRoutes);
app.use('/meetingRoom', meetingRoutes);
app.use('/Reservation', reservationRoutes);
app.use('/getimage', express.static('./upload/admin'));

// Connection to MongoDB and start server
mongoose.connect(MONGODB_URI).then(() => {
  console.log('connected to MongoDb');
  app.listen(PORT, () => {
    console.log(`server listening on ${PORT}`);
  });
}).catch((err) => {
  console.error('Error connecting to mongodb:', err.message);
});
