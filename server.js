//server.js
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import session from "express-session";
import cors from "cors";

import contactRouter from "./routes/contact.js";

const app = express();
const PORT = process.env.PORT || 3021;

//Database connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

mongoose.connection.on("connected", () => {
    console.log("Mongoose is connected");
});

mongoose.connection.on("error", (err) => {
    console.log("Error Connecting");
});

//Middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(cors({
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
}));

//Session Configuration
app.use(session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
}));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
