// import express module
const express = require("express")
// use express function in app
const app = express();
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

// to access all client current backend
app.use(cors());
// to access request body data
app.use(express.json());

// create server with http and which integrate for websocket
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
})

io.on("connection", (socket) => {
    console.log("connected", socket.id);

    socket.on("join_room", (data)=>{
        console.log(`${socket.id} has been join in ${data} room`)
    })

    socket.on("disconnect", () => {
        console.log("disconnected", socket.id)
    })
})


// listen the server on the port
server.listen(3030, () => {
    console.log("application is running successfully")
})