const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const InvitationSchema = new Schema({
  status: {
    type: String,
    default: "pending",
  },
  referrer: {
    type: Schema.Types.ObjectId,
    ref: "users", //references the users model
  },
  toEmail: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = User = mongoose.model("invitation", InvitationSchema);
