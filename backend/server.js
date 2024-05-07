import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes.js'
import messageRoutes from './routes/message.routes.js'
import userRoutes from './routes/user.routes.js'
import connectToMongoDB from './db/connectToMongoDB.js';
import { app, server } from './socket/socket.js';


const PORT = process.env.PORT || 5000;

dotenv.config();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.get( "/", (req, res) => {
    res.send("Server is running");
});

app.get('/', (req, res) => {
    app.use(express.static(path.resolve(__dirname, 'frontend', 'build')))
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
});


server.listen(PORT, () => {
    connectToMongoDB();
    console.log(`server running on port ${PORT}`);
});