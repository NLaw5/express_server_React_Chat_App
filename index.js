//Our entry point to our server
//Note we are using express, cors, socketio, and nodemon in our npm installation for this server
const express = require('express')
const cors = require('cors')
const http = require("http")
//Note we need to depreciate a value from socket.io; therefore, whenever we use socket.io this is what is required
const { Server } = require("socket.io")

const app = express()

app.use(cors())

//pass our express app into this server variable
const server = http.createServer(app);
const HTTP_PORT = process.env.PORT || 8080;

// We want to connect our socket.io server with our express server; therefore, we add server into the params
// Every other parameter is an option 
const io = new Server(server, {
    cors: {
        //we specify which url we allow for socket communication, in this case localhost for now though this will change  
        origin: "http://localhost:3000",
        //specify which routes we need
        methods: ["GET", "POST"] 
    }
})

//how socketio works:
//we emit an event and we detect and listen for an event to happen
//certain events that are built into socket io, for example a connection event, we are listening for this type of event
io.on("connection", (socket) => {
    //socket is w/e we are using to specify for listening event for w/e user is connected to here
    //the socket.id is always random per person
    console.log(`User Connected: ${socket.id}`)


    //Whenever wants to join a room:
    //note: join_room is any random variable
    socket.on("join_room", (data) =>{

        // Data is the socket.id of a particular user
        //Socket function 
        socket.join(data)

        console.log(`User with ID of: ${socket.id} joined room: ${data}`)
    })

    socket.on("send_message", (data) => {
        console.log(data)
        //Send data back to client side but make sure you're sending it to the right room
        socket.to(data.room).emit("receive_message", data)
    })

    //write code to disconnect to our server
    socket.on("disconnect", () => {
        console.log("User disconnect: ", socket.id);
    })
})


server.listen(HTTP_PORT, () => {
    console.log("Express server running on port: " + HTTP_PORT)
})