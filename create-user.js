// create-user.js
// Create a user of any role directly in the database, using the SAME
// hashing scheme as src/lib/auth.ts (crypto.scrypt, "salt:hash" format).
//
// Usage (from project root):
//   node create-user.js <name> <email> <password> <role>
//
// Valid roles: super_admin, admin, manager, rep, user
//
// Examples:
//   node create-user.js "Main Admin" super@bawdicsoft.com MyPass123 super_admin
//   node create-user.js "John Manager" john@bawdicsoft.com Pass456 manager
//   node create-user.js "Employee One" emp@bawdicsoft.com Pass789 user

const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const crypto = require('crypto');

const VALID_ROLES = ['super_admin', 'admin', 'manager', 'rep', 'user'];

// Load .env or .env.local manually (Node doesn't auto-load it)
function loadEnv() {
  const candidate = path.join(__dirname, '.env');
  const fallback = path.join(__dirname, '.env.local');
  const envPath = fs.existsSync(candidate) ? candidate : fallback;
  if (!fs.existsSync(envPath)) return {};
  const env = {};
  const lines = fs.readFileSync(envPath, 'utf8').split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    // Strip surrounding quotes
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    env[key] = value;
  }
  return env;
}

const env = loadEnv();
const MONGODB_URI = env.MONGODB_URI || 'mongodb://localhost:27017/bawdicsoft';

// Same function as src/lib/auth.ts hashPassword()
function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const derived = crypto.scryptSync(password, salt, 64);
  return `${salt}:${derived.toString('hex')}`;
}

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true },
    role: { type: String, enum: VALID_ROLES, default: 'user' },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

async function main() {
  const name = process.argv[2];
  const email = process.argv[3];
  const password = process.argv[4];
  const role = process.argv[5] || 'user';

  if (!name || !email || !password) {
    console.log('Usage: node create-user.js <name> <email> <password> <role>');
    console.log('Valid roles:', VALID_ROLES.join(', '));
    process.exit(1);
  }

  if (!VALID_ROLES.includes(role)) {
    console.log('Invalid role. Valid roles:', VALID_ROLES.join(', '));
    process.exit(1);
  }

  console.log('Connecting to:', MONGODB_URI);
  await mongoose.connect(MONGODB_URI);

  const existing = await User.findOne({ email: email.toLowerCase() });
  if (existing) {
    console.log('A user with this email already exists:', existing.email);
    await mongoose.connection.close();
    process.exit(1);
  }

  const hashed = hashPassword(password);
  const user = new User({
    name,
    email: email.toLowerCase(),
    password: hashed,
    role,
  });

  await user.save();
  console.log('User created successfully!');
  console.log('Name  :', name);
  console.log('Email :', email.toLowerCase());
  console.log('Role  :', role);
  console.log('You can now log in at /auth/login with this email/password.');

  await mongoose.connection.close();
}

main().catch((err) => {
  console.error('Error creating user:', err);
  process.exit(1);
});

