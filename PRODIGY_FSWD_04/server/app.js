import express from "express"
import {Server} from "socket.io";
import {createServer} from "http";
import cors from "cors"



const app =  express()
const server = createServer(app);

const io = new Server(server,{
    cors:{
        origin:"http://localhost:5173",
        methods:['GET',"POST"],
        credentials:true,
    },
});



app.get("/",(req,res)=>{
    res.send("HEllo World!")
});

io.on('connection',(socket)=>{
    console.log("User Connected", socket.id);
    // socket.emit("Welcome","Welcome to the server.");
    // socket.broadcast.emit("Welcome", `${socket.id} joined the server`);

    socket.on("message",(data)=>{
        console.log(data);
    })

    socket.on("disconnected",()=>{
        console.log("User Disconnected", socket.id);
    });

});


const port = 5050;
server.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})