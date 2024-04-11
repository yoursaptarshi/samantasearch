const app = require('./app');
const {connectDatabase} = require("./config/database");
const {chatserver} = require("../backend/controllers/chatserver")
const http = require('http');
const socketIO = require("socket.io");

// Create HTTP server
const server = http.createServer(app);
const io = socketIO(server);

// Initialize socket handling using the socket controller
chatserver(io);

connectDatabase();
server.listen(process.env.PORT, ()=>{
    console.log(`Server is running on ${process.env.PORT}`);
})