import mongoose from "mongoose";

const uri = process.env.MONGO_URI || "mongodb://localhost:27017/SDA";

const connectDB = async() => {
    if (!uri) {
        console.error(" MongoDB URI is not defined in environment variables.");
        process.exit(1);
    }

    try {
        const conn = await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log(` MongoDB connected: ${conn.connection.host}`);
    } catch (err) {
        console.error(` MongoDB connection error: ${err.message}`);
        process.exit(1);
    }
};

export default connectDB;