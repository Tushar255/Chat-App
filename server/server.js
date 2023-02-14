import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
mongoose.set('strictQuery', true);
import userRoutes from "./routes/user.js"
import chatRoutes from "./routes/chat.js"
import messageRoutes from "./routes/message.js"
import { Server } from "socket.io";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("HELLO")
})

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

const PORT = process.env.PORT || 3002;

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).catch((error) => {
    console.log(`${error} didn't connect`);
})
const server = app.listen(PORT, () => console.log(`Server started on Port: ${PORT}`));

let io = new Server(server, {
    pingTimeout: 60000,
    cors: {
        origin: "http://localhost:3000"
    }
});

io.on("connection", (socket) => {
    console.log("Connected to socket.io");

    socket.on("setup", (userData) => {
        socket.join(userData._id);
        socket.emit("connected");
    });

    socket.on("join chat", (room) => {
        socket.join(room);
        console.log("User Joined Room: " + room);
    });

    socket.on("new message", (newMessageRecieved) => {
        var chat = newMessageRecieved.chat;

        if (!chat.users) return console.log("chat.users not defined");

        chat.users.forEach((user) => {
            if (user._id == newMessageRecieved.sender._id) return;

            socket.in(chat._id).emit("message recieved", newMessageRecieved);
            });
    });
    
    socket.off("setup", () => {
        console.log("USER DISCONNECTED");
        socket.leave(userData._id);
    });
});