import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI as string);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        console.log(`connected to database: ${conn.connection.name}`);
    }catch(error){
        console.log(error);
    }
}

export default connectDB;