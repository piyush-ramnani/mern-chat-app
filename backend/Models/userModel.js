const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

//basic schema
const userModel = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    dp: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1569516449771-41c89ee14ca3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80",
    },
  },
  {
    timestamps: true,
  }
);

userModel.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

//To encrypt the passwords before saving to the Database when registering the user.

userModel.pre("save", async function (next) {
  if (!this.isModified) {
    next();
  } else {
    const salt = await bcrypt.genSalt(10);
    this.password = bcrypt.hash(this.password, salt);
  }
});

const User = mongoose.model("User", userModel);
//Wrapping a database model into a string to export and use outside of this page/block.
//Being used by userController.js in the folder 'controllers'

module.exports = User;
