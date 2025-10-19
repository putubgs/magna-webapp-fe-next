import { NextRequest, NextResponse } from "next/server";
import { extractTokenFromCookie, verifyToken } from "@/utils/jwt";

export async function GET(req: NextRequest) {
  try {
    const token = extractTokenFromCookie(req);

    if (!token) {
      return NextResponse.json(
        { error: "No authentication token found", isValid: false },
        { status: 401 }
      );
    }

    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json(
        { error: "Invalid or expired token", isValid: false },
        { status: 401 }
      );
    }

    return NextResponse.json(
      {
        isValid: true,
        user: {
          id: payload.id,
          email: payload.email,
          role: payload.role,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Token verification error:", error);
    return NextResponse.json(
      { error: "Authentication failed", isValid: false },
      { status: 500 }
    );
  }
}
