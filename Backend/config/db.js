
import mongoose from 'mongoose';
const MONGODB_URI = process.env.MONGODB_URI;




let cached = (global).mongoose || { conn: null, promise: null };

export const connectDatabase = async () => {

    if (cached.conn) {
        return cached.conn;
    }

    if (!MONGODB_URI) {
        throw new Error('MONGODB_URI is missing');
    }


    cached.promise =
        cached.promise ||
        mongoose.connect(MONGODB_URI, {
            dbName: 'te_assignment_2024',
            bufferCommands: false,
        });


    cached.conn = await cached.promise;

    return cached.conn;
};


export const connectToDB = () => {
    connectDatabase().then(() => {
        console.log("Connected to MongoDB");
    }).catch((err) => {
        console.log(err);
        process.exit(1)
    });
}