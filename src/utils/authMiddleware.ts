import { NextRequest, NextResponse } from "next/server";
import {
  verifyToken,
  extractTokenFromCookie,
  TokenPayload,
} from "./jwt";

export interface AuthenticatedRequest extends NextRequest {
  user?: TokenPayload;
}

export function withAuth(
  handler: (req: AuthenticatedRequest, context?: any) => Promise<NextResponse>,
  requiredRole?: "admin" | "super-admin"
) {
  return async (req: NextRequest, context?: any): Promise<NextResponse> => {
    try {
      let token = extractTokenFromCookie(req);

      if (!token) {
        token = extractTokenFromCookie(req);
      }

      if (!token) {
        return NextResponse.json(
          { error: "Authentication required" },
          { status: 401 }
        );
      }

      const payload = verifyToken(token);
      if (!payload) {
        return NextResponse.json(
          { error: "Invalid or expired token" },
          { status: 401 }
        );
      }

      // Check role if required
      if (requiredRole && payload.role !== requiredRole) {
        return NextResponse.json(
          { error: "Insufficient permissions" },
          { status: 403 }
        );
      }

      // Add user to request object
      (req as AuthenticatedRequest).user = payload;

      return handler(req as AuthenticatedRequest, context);
    } catch (error) {
      console.error("Auth middleware error:", error);
      return NextResponse.json(
        { error: "Authentication failed" },
        { status: 500 }
      );
    }
  };
}

export function requireAuth(requiredRole?: "admin" | "super-admin") {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (req: NextRequest, ...args: any[]) {
      try {
        const token = extractTokenFromCookie(req);

        if (!token) {
          return NextResponse.json(
            { error: "Authorization token is required" },
            { status: 401 }
          );
        }

        const payload = verifyToken(token);
        if (!payload) {
          return NextResponse.json(
            { error: "Invalid or expired token" },
            { status: 401 }
          );
        }

        // Check role if required
        if (requiredRole && payload.role !== requiredRole) {
          return NextResponse.json(
            { error: "Insufficient permissions" },
            { status: 403 }
          );
        }

        // Add user to request object
        (req as any).user = payload;

        return originalMethod.apply(this, [req, ...args]);
      } catch (error) {
        console.error("Auth middleware error:", error);
        return NextResponse.json(
          { error: "Authentication failed" },
          { status: 500 }
        );
      }
    };

    return descriptor;
  };
}