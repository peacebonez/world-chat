const mongoose = require('mongoose');

const Schema = mongoose.Schema;
// const User = require('./User');

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
  //Was trying to add referralEmail here but did not succeed.
  // {
  //   toJSON: {
  //     transform: async function (doc, ret) {
  //       const user = await User.findById(doc.referrer);
  //       ret.referrerEmail = user.email;
  //       return ret;
  //     },
  //   },
  //   toObject: {
  //     transform: async function (doc, ret) {
  //       const user = await User.findById(doc.referrer);
  //       ret.referrerEmail = user.email;
  //       return ret;
  //     },
  //   },
  // },
);

module.exports = Invitation = mongoose.model('invitation', InvitationSchema);
