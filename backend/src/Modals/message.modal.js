const mongoose = require("mongoose");
const User = require("./user.modal");

const messageSchema =new mongoose.Schema(
  {
    from: {
      type: String,
      ref: User,
      required: true,
    },
    to: {
      type: String,
      ref: User,
      required: true,
    },
    text: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);
const Message=mongoose.model('message',messageSchema);
module.exports = Message;  //export the model
