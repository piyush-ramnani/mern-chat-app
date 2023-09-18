const express = require("express");
const { registerUser, authUser } = require("../controllers/userController");

const router = express.Router();

//To create routes
router.route("/").post(registerUser); //flow: RegisterPage -> userRoutes -> userController
router.post("/login", authUser); //flow: LoginPage > userRoutes > UserController > userModel

module.exports = router;

/* --UNDERSTANDING THE CODE--

the line `module.exports = router;`, think of it as us giving our helper the blueprint to construct our website using the routes we've planned.

*/
