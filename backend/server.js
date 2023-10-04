const express = require("express");
const dotenv = require("dotenv");
//const { chats } = require("./data/data");
const connectDB = require("./config/db");
const app = express();
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

dotenv.config();
//To load environment variables from the .env file.

connectDB();
//connecting to the MongoDB cluster via db.js file in config folder

app.use(express.json());
//to accept a json object | test: POSTMAN

app.get("/", (req, res) => {
  res.send("API is running successfully");
});

/* --BASIC SETUP INITIALLY--
app.get("/api/chat", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(chats);
  //TEST: console.log("Router reached!");
});

app.get("/api/chat/:id", (req, res) => {
  //TEST: console.log(req)
  //this will give you a REQUEST OBJECT in the console for us to pick up data values and send the response on the browser screen accordingly

  console.log(req.params.id);
  const singleChat = chats.find((c) => c._id === req.params.id);
  res.send(singleChat);

  // To load a single chat when an ID is provided in the URL
  // get function fetches the url and processes accordingly.
});
*/

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);

//Middlewares (errorMiddleware.js)
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT | 4000;

app.listen(PORT, console.log(`Server started on PORT ${PORT}`));
