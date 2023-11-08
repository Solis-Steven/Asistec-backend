import express, { Application } from "express";
// import dotenv from "dotenv"
import cors, { CorsOptions } from "cors";
import databaseConnection from "./config/db.js";
import userRoutes from "./routes/User.routes.ts";


const app: Application = express();
app.use(cors());
app.use(express.json());

// dotenv.config();

databaseConnection();

// CORS settings
const whiteList = [
    // process.env.FRONTEND_URL
    ""
];

// const corsOptions = {
//     origin: function(origin: string | undefined, callback: (arg0: Error | null, arg1: boolean | undefined) => void) {
//         if(whiteList.includes(origin)) {
//             // Request can access
//             callback(null, true);
//         } else {
//             // Request don't have access
//             console.log(origin);
//             callback(new Error("Error de cors"), true)
//         }
//     }
// }


app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, () => {
    console.log(`Server runs, port: ${PORT}`);
}); 