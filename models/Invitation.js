const mongoose = require('mongoose');

const Schema = mongoose.Schema;
// const User = require('./User');

const InvitationSchema = new Schema({
  status: {
    type: String,
    default: 'pending',
  },
  referrer: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  referrerEmail: {
    type: String,
  },
  toEmail: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Invitation = mongoose.model('invitation', InvitationSchema);
