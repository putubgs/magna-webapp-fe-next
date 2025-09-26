import * as jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

let JWT_SECRET_FINAL: string;

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET || JWT_SECRET.length < 32) {
  throw new Error(
    "JWT_SECRET must be set in environment variables and be at least 32 characters long"
  );
} else {
  JWT_SECRET_FINAL = JWT_SECRET;
}

// JWT token expiration time
const JWT_EXPIRES_IN = "4h";

export interface TokenPayload {
  id: string;
  email: string;
  role: "admin" | "super-admin";
  iat?: number;
  exp?: number;
}

export function generateToken(
  payload: Omit<TokenPayload, "iat" | "exp">
): string {
  const options: jwt.SignOptions = {
    expiresIn: JWT_EXPIRES_IN,
  };
  return jwt.sign(payload, JWT_SECRET_FINAL, options);
}

export function verifyToken(token: string): TokenPayload | null {
  try {
    const decoded = jwt.verify(
      token,
      JWT_SECRET_FINAL
    ) as unknown as TokenPayload;
    return decoded;
  } catch (error) {
    console.error("Token verification failed:", error);
    return null;
  }
}

// Extract token from HttpOnly cookie
export function extractTokenFromCookie(request: NextRequest): string | null {
  const token = request.cookies.get("auth-token")?.value;
  return token || null;
}
