const password = process.argv[2];
if (!password) {
  console.log('Usage: node hash-password.js syed1234bh');
  process.exit(1);
}

const hashedPassword = hashPassword(password);
console.log('Hashed password:', hashedPassword);