import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

const MONGO_URL = process.env.MONGO_URL;;
const DBconnect = async () => {
    try {
        await mongoose.connect(MONGO_URL,);
        console.log("Connected to database!");
    } catch (error) {
        console.error("Error while connecting with database:", error.message);
    }
}

export default DBconnect;