const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ConversationSchema = new Schema({
  members: [
    {
      // user: {
      //   type: Schema.Types.ObjectId,
      //   ref: 'users', //references the users model
      // },

      _id: {
        type: Schema.Types.ObjectId,
        ref: 'users',
      },
      name: {
        type: String,
      },
      avatar: {
        type: String,
      },
    },
  ],
  messages: [
    {
      fromUser: {
        type: Schema.Types.ObjectId,
        ref: 'users',
      },
      originalLanguage: {
        type: String,
      },
      text: {
        type: String,
      },
      isRead: {
        type: Boolean,
        default: false,
      },
      createdOn: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

module.exports = Conversation = mongoose.model(
  'conversation',
  ConversationSchema,
);
