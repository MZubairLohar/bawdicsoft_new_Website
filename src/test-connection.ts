import mongoose from 'mongoose';

async function testConnection() {
  try {
    console.log('Attempting to connect...');
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log('✅ Connected successfully!');
    process.exit(0);
  } catch (error) {
    console.error(' Connection failed:', error);
    process.exit(1);
  }
}

testConnection();