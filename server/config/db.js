import mongoose from "mongoose"
import colors from "colors"

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log(`Conneced to DB successfully with host ${conn.connection.host}`);
    } catch (error) {
        console.log(`Failed to connect to DB ${error}`.bgRed.white);
    }
}
export default connectDB;