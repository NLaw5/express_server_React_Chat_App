# Express Server for React Chat App

## Description:
This repo was created to act as a back-end server to handle all socket.io communication for a React Chat App!
When running this server, we will be using localhost with port 8080 ("http://localhost:8080").
Please note that when using this server, cors is set to only work on client-side applications with the domain: "http://localhost:3000"

## Important Notes:
The main takeaway from this repo is the usage of socket.io. In our index.js, we set up our socket through:
- Declaring **const { Server } = require ("socket.io")**
- Connecting our express server with socket io: **const io = new Server( server, ...)**

From here, we can use our new variable **io** to form a connection and create socket functions that our client can use. These functiosn will enable our client-server interaction, in this case sending messages between two different clients!
Our server will act as the bridge between two different users, sending messages in the form of sockets to each user.

## Plugins Used:
- Express 
- Cors
- SocketIO
- Nodemon

Please note that in order to use nodemon in future projects, you must go to package.json and under "scripts" add a new property called "start": "nodemon index.js"(index.js is jsut a placeholder, can use any filename that you need nodemon for)


