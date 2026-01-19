import bcrypt from "bcryptjs";
import speakeasy from "speakeasy";
import QRCode from "qrcode";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";
const ADMIN_2FA_SECRET = process.env.ADMIN_2FA_SECRET;

export async function verifyPassword(password: string): Promise<boolean> {
  if (process.env.SKIP_AUTH === "true") return true;
  
  // Simple string comparison for development
  return password === ADMIN_PASSWORD;
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export function verifyTOTP(token: string): boolean {
  if (!ADMIN_2FA_SECRET) return true; // 2FA not set up
  if (process.env.SKIP_AUTH === "true") return true;

  return speakeasy.totp.verify({
    secret: ADMIN_2FA_SECRET,
    encoding: "base32",
    token: token,
    window: 2, // Allow 2 time windows (±30 seconds)
  });
}

export async function generateTOTPSecret(
  name: string = "My Stuff Admin"
): Promise<{ secret: string; qrCode: string }> {
  const secret = speakeasy.generateSecret({
    name: name,
    issuer: "My Stuff",
  });

  const qrCode = await QRCode.toDataURL(secret.otpauth_url!);

  return {
    secret: secret.base32,
    qrCode,
  };
}

export function generateSessionToken(): string {
  return Math.random().toString(36).substring(2, 15);
}
