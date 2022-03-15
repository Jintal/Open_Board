const express = require('express');
const socket = require('socket.io');

const app = express();

// To find the index.html file
app.use(express.static('public'));

const port = process.ent.PORT || 5500;
const server = app.listen(port, function(){
    console.log('Listening to port ', port);
});


const io = socket(server);

// Whenever the front end connect to the server it will detect it and run the callback
io.on("connection", function(socket){
    console.log('Made socket connection from frontend');

    // The data sent by the frontend should be broadcasted
    socket.on('beginPath', function(data){
        // Broadcast to all connected computers
        io.sockets.emit('beginPath', data);
    });

    socket.on('drawStroke', function(data){
        io.sockets.emit('drawStroke', data);
    });

    socket.on('redoUndo', function(data){
        io.sockets.emit('redoUndo', data);
    })
});