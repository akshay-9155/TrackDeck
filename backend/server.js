import dotenv from 'dotenv';
import { app } from './app.js';
import connectDB from './config/db.js';
dotenv.config({ path: "./.env" });
connectDB()
    .then(() => {
        app.on("error", (error) => {
            console.log("Error : ", error);
            throw error;
        })
        app.listen(process.env.PORT || 8000, () => {
            console.log(` Server is running at http://localhost:${process.env.PORT}`);
        })
    })
    .catch((error) => {
        console.log(`MongoDB connection error !!! ${error}`);
        // throw error;
    })