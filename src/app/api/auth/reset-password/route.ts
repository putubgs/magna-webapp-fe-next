import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    let body;
    try {
      body = await request.json();
    } catch (parseError) {
      console.error("Invalid JSON in request body:", parseError);
      return NextResponse.json(
        { error: "Invalid request format" },
        { status: 400 }
      );
    }

    const { token, password, userType, userId } = body;

    if (!token || !password || !userType || !userId) {
      return NextResponse.json(
        { error: "Token, password, user type, and user ID are required" },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters long" },
        { status: 400 }
      );
    }

    let supabase;
    try {
      supabase = createClient(cookies());
    } catch (supabaseError) {
      console.error("Failed to create Supabase client:", supabaseError);
      return NextResponse.json(
        { error: "Database connection failed" },
        { status: 500 }
      );
    }

    let userData;
    let tableName;
    let idColumn;

    if (userType === "super-admin") {
      tableName = "super_admin";
      idColumn = "super_admin_id";
    } else if (userType === "admin") {
      tableName = "admin";
      idColumn = "admin_id";
    } else {
      return NextResponse.json({ error: "Invalid user type" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from(tableName)
      .select("*")
      .eq(idColumn, userId)
      .single();

    if (error) {
      console.error(`Error querying ${tableName} table:`, error);
      if (error.code === "PGRST116") {
        return NextResponse.json(
          { error: "Invalid reset request" },
          { status: 404 }
        );
      }
      return NextResponse.json(
        { error: "Database query failed" },
        { status: 500 }
      );
    }

    if (!data) {
      return NextResponse.json(
        { error: "Invalid reset request" },
        { status: 404 }
      );
    }

    userData = data;

    if (
      !userData.forgot_password_token ||
      userData.forgot_password_token !== token
    ) {
      return NextResponse.json(
        { error: "Invalid or expired reset token" },
        { status: 401 }
      );
    }

    if (!userData.forgot_password_expired) {
      return NextResponse.json(
        { error: "Invalid reset token data" },
        { status: 401 }
      );
    }

    const now = new Date();
    let expirationTime;
    try {
      expirationTime = new Date(userData.forgot_password_expired);
    } catch (dateError) {
      console.error("Invalid expiration date format:", dateError);
      return NextResponse.json(
        { error: "Invalid reset token data" },
        { status: 401 }
      );
    }

    const adjustedExpirationTime = new Date(
      expirationTime.getTime() + 7 * 60 * 60 * 1000
    );

    if (now > adjustedExpirationTime) {
      return NextResponse.json(
        {
          error:
            "Reset token has expired. Please request a new password reset.",
        },
        { status: 401 }
      );
    }

    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (hashError) {
      console.error("Error hashing password:", hashError);
      return NextResponse.json(
        { error: "Failed to process password" },
        { status: 500 }
      );
    }

    const { data: updateData, error: updateError } = await supabase
      .from(tableName)
      .update({
        password: hashedPassword,
        forgot_password_token: null,
        forgot_password_expired: null,
      })
      .eq(idColumn, userId)
      .select();

    if (updateError) {
      console.error("Error updating password:", updateError);
      return NextResponse.json(
        { error: "Failed to update password" },
        { status: 500 }
      );
    }

    if (!updateData || updateData.length === 0) {
      console.error("No rows updated during password reset");
      return NextResponse.json(
        { error: "Failed to update password" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: "Password has been reset successfully",
        email: userData.email,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Unexpected error in reset password endpoint:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
