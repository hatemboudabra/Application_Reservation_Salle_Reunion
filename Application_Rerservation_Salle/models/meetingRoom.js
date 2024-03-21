const mongoose = require('mongoose');
const meetingRoomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  capacity: { type: Number, required: true },
  image: { type: String }
});

module.exports = mongoose.model('MeetingRoom', meetingRoomSchema);