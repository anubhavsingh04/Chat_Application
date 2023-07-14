const { log } = require("console");
const express = require("express");
require("dotenv").config();
const dbConfig=require('./config/dbConfig')
const app = express();
const chatsRoute = require("./routes/chatsRoute");

const port = process.env.PORT || 5000;

const usersRoute=require('./routes/usersRoute')
app.use(express.json());
app.use("/api/users",usersRoute);
app.use("/api/chats", chatsRoute);

app.listen(port,()=>{console.log(`server ok running on port ${port}`)})
