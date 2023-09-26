const express = require("express");
const {
  registerUser,
  authUser,
  allUser,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

//To create routes
router.route("/").post(registerUser).get(protect, allUser);
router.post("/login", authUser); //flow:
//router.route("/").get(allUsers); //concatinating it to the registerUser request

module.exports = router;

/* --UNDERSTANDING THE CODE--

the line `module.exports = router;`, think of it as us giving our helper the blueprint to construct our website using the routes we've planned.

registerUser: RegisterPage -> userRoutes -> userController
authUser: LoginPage > userRoutes > UserController > userModel
protect: Middleware layer for protection against the data in DB.

*/
