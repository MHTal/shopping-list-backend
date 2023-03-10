require('dotenv').config()
const mongoose = require("mongoose")
const express = require("express")
const List = require('./models/List.js')
const e = express();
const cors = require("cors")
e.use(cors())
const http = require("http")
const app = http.createServer(e);
const { Server } = require("socket.io");

const io = new Server(app, {
    cors: {
        origin: '*'
    }
});

io.on('connection', socket => socket.emit('hello', { message: 'hello from server!' }));

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
io.on('connection', socket => {
  console.log('user connected')
    socket.on("text-change", async data => {
        await List.findOneAndUpdate({}, {list: data.userText, height: data.userHeight, date: Date.now()}) || List.create({list: data.userText, height: data.userHeight, date: Date.now()})
        socket.broadcast.emit("receive-changes", data)
    })
    socket.on("get-list", async () => {
        let list = await List.findOne() || await List.create({})
        socket.emit("load-list", list)
    })
})
app.listen(process.env.PORT || 3001, () => console.log("listnin"))
