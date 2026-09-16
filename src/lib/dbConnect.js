// src/lib/dbConnect.js
import mongoose from 'mongoose';
import dns from 'dns';

// ✅ Force Node to use Google + Cloudflare DNS (bypasses ISP SRV issues)
try {
  dns.setServers(['8.8.8.8', '1.1.1.1', '8.8.4.4']);
  dns.setDefaultResultOrder('ipv4first');
} catch (e) {
  console.warn('[dbConnect] DNS override failed:', e);
}

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) throw new Error('MONGODB_URI missing in .env.local');

let cached = global.mongoose || { conn: null, promise: null };
global.mongoose = cached;

export async function connectDB() {
  // 1. Already connected?
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  // 2. Cached connection?
  if (cached.conn) return cached.conn;

  // 3. Fresh connection
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 15000,
      socketTimeoutMS: 45000,
      family: 4,
      maxPoolSize: 10,
    });
  }

  try {
    cached.conn = await cached.promise;
    console.log('✅ MongoDB connected (via dbConnect)');
    return cached.conn;
  } catch (err) {
    cached.promise = null;
    console.error('❌ MongoDB connectDB failed:', err.message);
    throw err;
  }
}