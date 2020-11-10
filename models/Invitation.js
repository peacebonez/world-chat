const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const InvitationSchema = new Schema({
  status: {
    type: String,
    default: "pending",
    //If we want to implement an expiration feature?
    expires: 7776000, //3 months
    isExpired: {
      default: false,
    },
  },
  fromUser: {
    type: Schema.Types.ObjectId,
    ref: "users", //references the users model
  },
  toEmail: {
    type: String,
    isAlreadyUser: {
      type: Boolean,
      required: true,
    },
  },
  inviteUrl: {
    type: String,
  },
});

module.exports = User = mongoose.model("invitation", InvitationSchema);
