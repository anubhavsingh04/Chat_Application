const { log, Console } = require("console");
const express = require("express");
require("dotenv").config();
const dbConfig=require('./config/dbConfig')
const app = express();
const chatsRoute = require("./routes/chatsRoute");
const messagesRoute = require("./routes/messagesRoute");
const port = process.env.PORT || 5000;

const usersRoute=require('./routes/usersRoute')
app.use(express.json());

const server = require("http").createServer(app);

const io = require("socket.io")(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });

// check the connection of socket from client 

io.on("connection",(socket)=>{
    socket.on("join-room",(userId)=>{
		console.log("user joined",userId);
		socket.join(userId);
	});

	// send message to receipent (sai )
	socket.on("send-message",({text,sender,receipent})=>{
		// send to receipent 
		io.to(receipent).emit("receive-message",{
			text,
			sender,
		});
	});

})




app.use("/api/users",usersRoute);
app.use("/api/chats", chatsRoute);
app.use("/api/messages", messagesRoute);


server.listen(port,()=>{console.log(`server ok running on port ${port}`)})
