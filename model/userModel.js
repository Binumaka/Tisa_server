const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
  },

  email: {
    type: String,
    unique: true,
  },

  password: {
    type: String,
    require: true,
  },

  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },

  resetCode: {
    type: String,
  },
  
  resetCodeExpires: {
    type: Date,
  },
});

const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;
