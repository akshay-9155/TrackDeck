import mongoose from "mongoose";
const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}/${process.env.DB_NAME}`);
        console.log("Connected to database: ", connectionInstance.connection.host);
    } catch (error) {
        throw error;
    }
}

export default connectDB;