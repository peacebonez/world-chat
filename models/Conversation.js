const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ConversationSchema = new Schema({
  members: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users", //references the users model
      },
    },
  ],
  messages: [
    {
      messageBody: {
        fromUser: {
          type: Schema.Types.ObjectId,
          ref: "users", //references the users model
        },
        originalLanguage: {
          type: String,
        },
        text: {
          type: String,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    },
  ],
});

module.exports = User = mongoose.model("conversation", ConversationSchema);
