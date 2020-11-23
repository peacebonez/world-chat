const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const InvitationSchema = new Schema(
  {
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
  },
  {
    toJSON: {
      transform: function (doc, ret) {},
    },
    toObject: {
      transform: function (doc, ret) {},
    },
  },
);

module.exports = User = mongoose.model('invitation', InvitationSchema);
