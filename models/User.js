const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//create key for user avatar?

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
  password: {
    type: String,
    required: true,
  },
  primaryLanguage: {
    type: String,
    required: true,
  },
  contacts: [this], // Self-referencing UserSchema.  not sure if this will work.
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = User = mongoose.model("user", UserSchema);
