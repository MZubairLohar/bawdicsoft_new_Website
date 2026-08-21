import mongoose from "mongoose";

let isConnected: boolean = false; // global variable to track connection

const connectDB = async (): Promise<void> => {
  if (isConnected) {
    console.log("MongoDB is already connected.");
    return;
  }

  // Get the URI from environment variables
  const mongoURI: string = process.env.MONGODB_URI as string;

  if (!mongoURI) {
    console.error("❌ MONGODB_URI is not defined in environment variables.");
    process.exit(1);
  }

  try {
    const connectionInstance = await mongoose.connect(mongoURI);

    isConnected = true;

    console.log(
      `✅ MongoDB connected !! DB Host: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
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

