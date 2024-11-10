import mongoose from "mongoose";
import { DB_NAME } from "../constents.js";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`) ;
       console.log(`\n MONGODB Connected DB Host : ${connectionInstance.connection.host}`);
       
    } catch (error) {
        console.log("ERROR AT CONNECTION MONGODB :" , error);
        process.exit(1) ;
        
    }
}

export default connectDB ;