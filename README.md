**A SIMPLE CHAT APP**

This README provides an overview of a MERN stack application that utilizes the Express.js framework to create a basic APIs, REACT.js for the client interface and NODE.js for backend. Throughout the app and this README file, you will find my references and notes for code snippets being used in the code. It can be a good reference guide to someone who is just starting out in tech.

**PREREQUISITES**

Every 'end' has a package.json file. Since Node is a huge framework, be it frontend or Backend, it is the configuration or set of packages that you would need in the application. I mean to create a house you just need to buy the raw materials that is required, not all of the worlds supply. Yes, Development is vast!

You can install npm in your system, copy-paste the package file in your system, navigate the terminal to that location and just hit 'npm install'. This will install all the necessary packages to that destinatoion. Yeah, I think it's magical too.

Before running the application, ensure that you have the following dependencies installed

> Node.js
> Express.js | server management |
> dotenv (for environment variables) |
> React-router-Dom (To route pages in react) | Link: https://www.freecodecamp.org/news/how-to-use-axios-with-react/
> axios package (to call/manage APIs from backend to frontend)
> mongoose.js (Object Data Modeling library for MongoDB) | https://mongoosejs.com/docs/index.html
> MongoDB (for database management) | Link: https://www.mongodb.com/docs/atlas/getting-started/

--DEMO USER--
username: demouser
password: demopassword

**PROJECT-SET-UP**

These technologies below are in the order by which they were gradually included (or I'd say rather learned) in the application as needed. It's a long list. So, crack up the fingers, get some black coffee and go through this slowly and steadily. Remember 'Rome was not conquered in a day!'

_Server [server.js]_
It's a little different when the project you are creating is a little backend oriented. Starting from the index.html is easier and works but average is just not good. So this all begins with creating a backend from ground up.
EXPRESS.JS a Node.js library, is used to create server applications. See the file for the basic setup to get started.

_Frontend Set-Up [create-react-app]_
Installing react with the command 'create-react-app name' lays the groundwork for us to start directly implementing the code. All the folders under frontend are structured and downloaded.

_Models[chatModel.js] [messageModel.js] [userModel.js]_

> Everything in Mongoose starts with a Schema.
> Each schema maps to a MongoDB collection and defines the shape of the documents within that collection.

_Routes [userRoutes.js]_

> Middleware in Express.js are functions that handle tasks related to HTTP requests and responses. They act as intermediaries between the incoming request and the final response sent back to the client. For example, if you want to modify the incoming data of the users before saving it to the DB. Like encrypting the incoming plain text password for security purposes.

> Routing refers to how an application’s endpoints (URIs) respond to client requests.
> Our magic marker, Express, helps us build web applications more easily.
> We create a booklet of sticky notes called "router" to organize our website's sections (or routes). Each sticky note represents a different part of our website.

> router.route("/").post(registerUser); is more versatile and can be used when you want to define multiple HTTP methods for the same URL path.
> router.post('/login', authUser); is used when you want to define a dedicated route for a specific HTTP method and URL path, such as handling user login requests.

_Controllers [userController.js]_

> Controllers are JavaScript functions or modules that handle specific HTTP requests and define how the server should respond to those requests. They act as intermediaries between the incoming HTTP requests (e.g., from a web browser or a mobile app) and the database.

_express-async-handlers [userController.js]_

> express-async-handler (installed for controllers in this project) is a middleware for Express.js, a popular web application framework for Node.js.
> It is used to simplify error handling in asynchronous routes or route handlers.
> simplifies error handling in Express.js by eliminating the need to write try-catch blocks or .catch() clauses for every asynchronous route handler.
> keyword: expressAsyncHandler

_middlewares [errorMiddleware.js]_

> Middleware comes in the middle of the request and response cycle of the node.js execution.
> It also provides access to many functions like request and response objects with the Next function of the cycle.
> #Read more: https://www.turing.com/kb/building-middleware-for-node-js

_react [signUp.js] [login.js]_

I know! I know! react is at the end, actually while building the app, you are overwhelmed with the functionalities and depth of any language. Without having a clear idea of where you are going and how deep you have to go to get this done, it is rather difficult to know the threshold. Which is why by not know ing and making the project along the course helped me visualize the blueprint of how things are stitched together in code.

#Login Handler (login.js)
< 39:00 : to handle guest user login
[https://www.youtube.com/watch?v=nvjYCK9oDRU&list=PLKhlp2qtUcSZsGkxAdgnPcHioRr-4guZf&index=9&ab_channel=RoadsideCoder]

#Protect [authMiddleware.js] 02/10/2023
FEATURE:

> This takes in a bearer token before proceeding to any function.
> This acts as a security layer (middleware) when accessing chat or searching user information
> The bearer token is set as Global variable in POSTMAN for the user {"email": "piyush.xavierite24@gmail.com", "password": "9826405534"}

TEST:

> Go to POSTMAN -> Search User -> `?name=protect` in the URL -> Authorization: select Bearer token.
> without bearer token, it will result into an error

#ChatAPI [chatControllers.js] 06/10/2023
FEATURE:

> Created 'create chat' feature by user ID parameter.
> As soon as you search give a user ID, you will be able to access the chats of that particular user.

TEST:

> You can test this via POSTMAN by going to the create or access chat request under the Chat folder.
> You will require a bearer token for the protect function that checks which user is logged in.

#_createGroupChat [chatControllers.js]_

> API: api/chat/group [chatRoutes.js]
> Users can create group chat by adding users to the chat.
> TEST:
> Tested via postman: Takes in JSON to stringified user IDs
