const mongoose = require('mongoose');
const reservationSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    meetingRoom: { type: mongoose.Schema.Types.ObjectId, ref: 'MeetingRoom', required: true },
    startTime: { type: Date, required: false },
    endTime: { type: Date, required: false },
    confirmed: { type: Boolean, default: false } 

    
  });
  
  module.exports = mongoose.model('Reservation', reservationSchema);