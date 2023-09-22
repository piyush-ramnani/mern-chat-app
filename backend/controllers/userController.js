const { response } = require("express");
const expressAsyncHandler = require("express-async-handler");
const User = require("../Models/userModel"); //Database module
const generateToken = require("../config/generateToken");
const bcrypt = require("bcryptjs");

const registerUser = expressAsyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;

  if (!name | !email | !password) {
    res.status(400);
    throw new Error("Uh-oh, you missed something!");
  }

  //to check if the user exists or a new user is to be created.
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("Oops, there's already someone here with that email!");
  } else {
    //data will be processed as per userModel Schema design (userModel.js)

    /*
    const salt = await bcrypt.genSalt(10);
    const _password = await bcrypt.hash(password, salt);
    */

    const user = await User.create({
      name,
      email,
      password,
      pic,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.email,
        email: user.email,
        pic: user.pic,
        token: generateToken(user._id),
        message:
          "Okay, we're almost done. Now you can use this account to log in and do cool stuff in this project.",
      });
    } else {
      res.status(400);
      throw new Error("Failed to create a user :(");
    }
  }
});

//To check if the user email exists and passwords match when someone logs in
const authUser = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  //to match password on the login page -> takes the input in password field of authUser -> Checks from userModel
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.email,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password!");
  }
});

module.exports = { registerUser, authUser };

/* --UNDERSTANDING THE CODE---

    module.exports = {registerUser} -> curly braces is useful when you want to export multiple things (variables, functions, objects) from a module and you want to give each export a specific name.

    When you don't use curly braces, you are exporting a single default object or function. In this case, you are exporting the registerUser function directly.

    Allows better re-usability and Testing

    User is the wrapper from userModel.js file. It let's us send the data to db as per the schema design.
    Which is we can access create or findOne methods of Database
*/
