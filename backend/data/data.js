const chats = [
  {
    isGroupChat: false,
    users: [
      {
        name: "Samrat",
        email: "Samrat@example.com",
      },
      {
        name: "Piyush",
        email: "piyush@example.com",
      },
    ],
    _id: "617a077e18c25468bc7c4dd4",
    chatName: "Samrat Gupta",
  },
  {
    isGroupChat: false,
    users: [
      {
        name: "Sahil",
        email: "Sahil@example.com",
      },
      {
        name: "Piyush",
        email: "piyush@example.com",
      },
    ],
    _id: "617a077e18c25468b27c4dd4",
    chatName: "Sahil Singla",
  },
  {
    isGroupChat: false,
    users: [
      {
        name: "Subham",
        email: "Subham@example.com",
      },
      {
        name: "Piyush",
        email: "piyush@example.com",
      },
    ],
    _id: "617a077e18c2d468bc7c4dd4",
    chatName: "Subham Dey",
  },
  {
    isGroupChat: true,
    users: [
      {
        name: "Samrat",
        email: "Samrat@example.com",
      },
      {
        name: "Piyush",
        email: "piyush@example.com",
      },
      {
        name: "Sahil",
        email: "Sahil@example.com",
      },
    ],
    _id: "617a518c4081150716472c78",
    chatName: "Friends",
    groupAdmin: {
      name: "Piyush",
      email: "piyush@example.com",
    },
  },
  {
    isGroupChat: false,
    users: [
      {
        name: "Dushyant",
        email: "jane@example.com",
      },
      {
        name: "Piyush",
        email: "piyush@example.com",
      },
    ],
    _id: "617a077e18c25468bc7cfdd4",
    chatName: "Dushyant Narvekar",
  },
  {
    isGroupChat: true,
    users: [
      {
        name: "Samrat",
        email: "jon@example.com",
      },
      {
        name: "Piyush",
        email: "piyush@example.com",
      },
      {
        name: "Subham",
        email: "subham@example.com",
      },
    ],
    _id: "617a518c4081150016472c78",
    chatName: "Chill Zone",
    groupAdmin: {
      name: "Samrat",
      email: "samrat@example.com",
    },
  },
];

//This is an object literal with a property. In JavaScript ES6 syntax, when an object property name and variable name match, you can use shorthand notation to define the property. So, { chats } is equivalent to { chats: chats } which you will see in the API console log in server.js file

// This is exported as an object, else it will not be rendered in the browser
module.exports = { chats };
