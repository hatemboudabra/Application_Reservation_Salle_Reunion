const mongoose = require('mongoose');
const meetingRoomSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  capacity: { type: Number, required: true },
  image: { type: String }
});

module.exports = mongoose.model('MeetingRoom', meetingRoomSchema);