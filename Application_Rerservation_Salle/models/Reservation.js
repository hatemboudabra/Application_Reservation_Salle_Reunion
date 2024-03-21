const mongoose = require('mongoose');
const reservationSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    meetingRoom: { type: mongoose.Schema.Types.ObjectId, ref: 'MeetingRoom', required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    confirmed: { type: Boolean, default: false } 

    
  });
  
  module.exports = mongoose.model('Reservation', reservationSchema);