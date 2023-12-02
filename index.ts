import express, { Application } from "express";
import dotenv from "dotenv";
// import cors, { CorsOptions } from "cors";
import databaseConnection from "./config/db.js";
import userRoutes from "./routes/User.routes.ts";
import eventRoutes from "./routes/Event.routes.ts";


const app: Application = express();
app.use(express.json());

dotenv.config();

databaseConnection();

// CORS settings
const whiteList = [
    process.env.FRONTEND_URL
];

const corsOptions = {
    origin: function(origin: string | undefined, callback: (arg0: Error | null, arg1: boolean | undefined) => void) {
        if(whiteList.includes(origin)) {
            // Request can access
            callback(null, true);
        } else {
            // Request don't have access
            console.log(origin);
            callback(new Error("Error de cors"), true)
        }
    }
}

// app.use(cors(corsOptions as CorsOptions));

app.use("/api/users", userRoutes);
app.use("/api/events", eventRoutes);

const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, () => {
    console.log(`Server runs, port: ${PORT}`);
}); 