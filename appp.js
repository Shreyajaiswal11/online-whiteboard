const express = require("express"); 
const app =express();
const socket = require("socket.io");


app.use(express.static("public"));

let port=process.env.Port||3300;
let server =app.listen(port,() =>
{
    console.log(`listing to port"+ ${port}`);
})
const io= socket(server ,{
    cors:{
        origin:'http://localhost:3300',
        methods:['GET','POST']
    }
});

io.on("connection",(socket) =>{
    console.log("made socket connection");
    // Received data
socket.on("beginPath",(data) =>{
// now transfer data to connected computers
io.sockets.emit("beginPath",data);
});
socket.on("drawStroke",(data) =>{
    io.sockets.emit("drawStroke",data);
});
socket.on("redoUndo",(data) =>{
    io.sockets.emit("redoUndo",data)
});
});
