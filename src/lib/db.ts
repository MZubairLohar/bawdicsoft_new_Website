// import mongoose from "mongoose";

// let connectionPromise: Promise<typeof mongoose> | null = null;

// const connectDB = async (): Promise<void> => {
//   if (mongoose.connection.readyState === 1) {
//     console.log("MongoDB is already connected.");
//     return;
//   }

//   const mongoURI = process.env.MONGODB_URI;

//   if (!mongoURI) {
//     throw new Error("MONGODB_URI is not defined in environment variables.");
//   }

//   if (!connectionPromise) {
//     connectionPromise = mongoose.connect(mongoURI, {
//       serverSelectionTimeoutMS: 5000,
//       bufferCommands: false,
//     });
//   }

//   try {
//     const connectionInstance = await connectionPromise;
//     console.log(
//       `✅ MongoDB connected !! DB Host: ${connectionInstance.connection.host}`
//     );
//   } catch (error) {
//     connectionPromise = null;
//     console.error("❌ MongoDB connection error:", error);
//     throw error;
//   }
// };

// export default connectDB;
// export const connectToDatabase = connectDB;

import mongoose from "mongoose";
import dns from "node:dns";

// Force Node.js DNS resolver to use reliable public DNS.
// MongoDB Atlas mongodb+srv requires SRV/TXT DNS lookups.
dns.setServers(["8.8.8.8", "1.1.1.1"]);

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongooseCache: MongooseCache | undefined;
}

const cached: MongooseCache =
  global.mongooseCache || {
    conn: null,
    promise: null,
  };

if (!global.mongooseCache) {
  global.mongooseCache = cached;
}

const connectDB = async (): Promise<typeof mongoose> => {
  if (cached.conn) {
    return cached.conn;
  }

  const mongoURI = process.env.MONGODB_URI;

  if (!mongoURI) {
    throw new Error(
      "MONGODB_URI is not defined in environment variables."
    );
  }

  if (!cached.promise) {
    console.log("🔌 Connecting to MongoDB...");

    cached.promise = mongoose.connect(mongoURI, {
      bufferCommands: false,
      serverSelectionTimeoutMS: 10000,
    });
  }

  try {
    cached.conn = await cached.promise;

    console.log(
      `✅ MongoDB connected !! DB Host: ${cached.conn.connection.host}`
    );

    return cached.conn;
  } catch (error) {
    cached.promise = null;

    console.error("❌ MongoDB connection error:", error);

    throw error;
  }
};

export default connectDB;
export const connectToDatabase = connectDB;























////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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

