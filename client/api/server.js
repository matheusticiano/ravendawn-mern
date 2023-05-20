import express from "express";
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoute from "./routes/user.route.js";
import huntRoute from "./routes/hunt.route.js"
import authRoute from "./routes/auth.route.js"
import likeRoute from "./routes/like.route.js"
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express()
dotenv.config();
mongoose.set('strictQuery', true);

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log('Connected to MongoDB')
    } catch (error) {
        handleError(error);
    }
};

app.use(cors({
    origin: ["https://ravendawn.vercel.app"],
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/hunts", huntRoute);
app.use("/api/hunts", likeRoute);

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";

    return res.status(errorStatus).send(errorMessage);
});


app.listen(8800, () => {
    connect()
    console.log('Server Started!')
});