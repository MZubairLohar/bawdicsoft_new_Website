const crypto = require('crypto');

const SECRET = process.env.AUTH_SECRET || 'bawdicsoft-dev-secret-change-me';

/**
 * Hash a plaintext password using Node's built-in crypto.scrypt.
 * Returns a string in the format: salt:hash
 */
function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const derived = crypto.scryptSync(password, salt, 64);
  return `${salt}:${derived.toString('hex')}`;
}

// Usage: node hash-password.js your-password-here
const password = process.argv[2];
if (!password) {
  console.log('Usage: node hash-password.js syed1234bh');
  process.exit(1);
}

const hashedPassword = hashPassword(password);
console.log('Hashed password:', hashedPassword);