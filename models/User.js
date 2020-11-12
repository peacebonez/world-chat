const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//TODO's
//create key for user avatar

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  primaryLanguage: {
    type: String,
    required: true,
  },
  contacts: [{ type: Schema.Types.ObjectId, ref: "users" }],
  dateJoined: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.plugin(require('passport-local-mongoose'));
module.exports = User = mongoose.model("user", UserSchema);
