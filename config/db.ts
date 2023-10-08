import mongoose from "mongoose";

const MONGO_URI: string = process.env.MONGO_URI || "";

// This function makes connection with database
const dataBaseConnection = async () => {
    try {
        const connection = await mongoose.connect(
            MONGO_URI,
            // {
            //     useNewUrlParser: true,
            //     useUnifiedTopology: true
            // }
        );

        const url = `${connection.connection.host}:${connection.connection.port}`;
        console.log(`Connected: ${url}`);
    } catch (error: any) {
        console.log(`Database connection error: ${error.message}`);
        process.exit(1);
    }
}

export default dataBaseConnection;
