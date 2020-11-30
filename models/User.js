const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//TODO's
//create key for user avatar

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    avatar: {
      name: {
        type: String,
      },
      url: {
        type: String,
        unique: true,
      },
    },
    primaryLanguage: {
      type: String,
      required: true,
    },
    contacts: [],
    dateJoined: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: {
      transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
      },
    },
    toObject: {
      transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
      },
    },
  },
);

//UserSchema.plugin(require('passport-local-mongoose'));
module.exports = User = mongoose.model('user', UserSchema);
