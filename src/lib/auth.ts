import crypto from 'crypto';

const SECRET = process.env.AUTH_SECRET || 'bawdicsoft-dev-secret-change-me';

/**
 * Hash a plaintext password using Node's built-in crypto.scrypt.
 * Returns a string in the format: salt:hash
 */
export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex');
  const derived = crypto.scryptSync(password, salt, 64);
  return `${salt}:${derived.toString('hex')}`;
}

/**
 * Verify a plaintext password against a stored salt:hash string.
 */
export function verifyPassword(password: string, stored: string): boolean {
const [salt, hash] = stored.split(':');
  if (!salt || !hash) return false;
  const derived = crypto.scryptSync(password, salt, 64);
  const derivedHex = derived.toString('hex');
  // Constant-time comparison
  const a = new Uint8Array(Buffer.from(hash));
  const b = new Uint8Array(Buffer.from(derivedHex));
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

/**
 * Create a signed session token containing the user id and role.
 */
export function createSessionToken(payload: { id: string; role: string }): string {
  const data = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto
    .createHmac('sha256', SECRET)
    .update(data)
    .digest('base64url');
  return `${data}.${signature}`;
}

/**
 * Verify and decode a session token. Returns the payload or null if invalid.
 */
export function verifySessionToken(token: string): { id: string; role: string } | null {
  try {
    const [data, signature] = token.split('.');
    if (!data || !signature) return null;
    const expected = crypto
      .createHmac('sha256', SECRET)
      .update(data)
      .digest('base64url');
const a = new Uint8Array(Buffer.from(signature));
    const b = new Uint8Array(Buffer.from(expected));
    if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
    return JSON.parse(Buffer.from(data, 'base64url').toString('utf8'));
  } catch {
    return null;
  }
}
