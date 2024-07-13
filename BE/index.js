
import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import connectDB from "./config/db.js"
import loadEnv from "./config/env.js"
import movieRouter from "./router/movieRouter.js"
import authRouter from "./router/authRouter.js"

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter)
app.use("/api/movie", movieRouter)

const startServer = async () => {
    try {
        await connectDB()
        loadEnv()
        const PORT = process.env.PORT;
        app.listen(PORT, () => {
            console.log(`Server running on port http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Error connecting to the database', error);
        process.exit(1);
    }
};

startServer();