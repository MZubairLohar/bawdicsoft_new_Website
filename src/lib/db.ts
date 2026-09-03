import mongoose from "mongoose";

let connectionPromise: Promise<typeof mongoose> | null = null;

const connectDB = async (): Promise<void> => {
  if (mongoose.connection.readyState === 1) {
    console.log("MongoDB is already connected.");
    return;
  }

  const mongoURI = process.env.MONGODB_URI;

  if (!mongoURI) {
    throw new Error("MONGODB_URI is not defined in environment variables.");
  }

  if (!connectionPromise) {
    connectionPromise = mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 5000,
      bufferCommands: false,
    });
  }

  try {
    const connectionInstance = await connectionPromise;
    console.log(
      `✅ MongoDB connected !! DB Host: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    connectionPromise = null;
    console.error("❌ MongoDB connection error:", error);
    throw error;
  }
};

export default connectDB;
export const connectToDatabase = connectDB;

// import mongoose from 'mongoose';

// const MONGODB_URI = process.env.MONGODB_URI!;

// if (!MONGODB_URI) {
//   throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
// }

// interface MongooseCache {
//   conn: typeof mongoose | null;
//   promise: Promise<typeof mongoose> | null;
// }

// declare global {
//   var mongoose: MongooseCache | undefined;
// }

// const cached: MongooseCache = global.mongoose || { conn: null, promise: null };

// if (!global.mongoose) {
//   global.mongoose = cached;
// }

// export async function connectToDatabase() {
//   if (cached.conn) {
//     return cached.conn;
//   }

//   if (!cached.promise) {
//     const opts = { bufferCommands: false };
//     cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => mongoose);
//   }

//   try {
//     cached.conn = await cached.promise;
//   } catch (e) {
//     cached.promise = null;
//     throw e;
//   }

//   return cached.conn;
// }

