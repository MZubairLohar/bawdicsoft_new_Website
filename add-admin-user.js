const mongoose = require('mongoose');

// Connect to your database
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/bawdicsoft');

// Define a simple User schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'user'], default: 'user' },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

async function addAdminUser() {
  try {
    const hashedPassword = process.argv[2]; // Pass the hashed password as argument
    const email = process.argv[3]; // Pass the email as second argument
    const name = process.argv[4]; // Pass the name as third argument
    
    if (!hashedPassword || !email || !name) {
      console.log('Usage: node add-admin-user.js <hashed-password> <email> <name>');
      process.exit(1);
    }

    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      console.log('User with this email already exists');
      process.exit(1);
    }

    const adminUser = new User({
      name: name,
      email: email,
      password: hashedPassword,
      role: 'admin'
    });

    await adminUser.save();
    console.log('Admin user created successfully!');
    console.log('Email:', email);
    console.log('Role:', adminUser.role);
    
    mongoose.connection.close();
  } catch (error) {
    console.error('Error creating admin user:', error);
    mongoose.connection.close();
    process.exit(1);
  }
}

addAdminUser();