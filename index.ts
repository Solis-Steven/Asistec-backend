import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import databaseConnection from "./config/db.js";

const app = new express();
app.use(express.json());

dotenv.config();

databaseConnection();

// CORS settings
const whiteList = [
    process.env.FRONTEND_URL
];

const corsOptions = {
    origin: function(origin, callback) {
        if(whiteList.includes(origin)) {
            // Request can access
            callback(null, true);
        } else {
            // Request don't have access
            console.log(origin);
            callback(new Error("Error de cors"))
        }
    }
}

// app.use(cors(corsOptions));

const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, () => {
    console.log(`Server runs, port: ${PORT}`);
}); 