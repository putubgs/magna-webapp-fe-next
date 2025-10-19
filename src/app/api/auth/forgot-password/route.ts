import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import crypto from "crypto";
import { sendPasswordResetEmail } from "@/utils/email";

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

    const { email } = body;

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
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

    // Check super admin table
    const { data: superAdmin, error: superAdminError } = await supabase
      .from("super_admin")
      .select("super_admin_id, email")
      .eq("email", email)
      .single();

    if (superAdminError && superAdminError.code !== "PGRST116") {
      console.error("Error querying super_admin table:", superAdminError);
      return NextResponse.json(
        { error: "Database query failed" },
        { status: 500 }
      );
    }

    // Check admin table
    const { data: admin, error: adminError } = await supabase
      .from("admin")
      .select("admin_id, email")
      .eq("email", email)
      .single();

    if (adminError && adminError.code !== "PGRST116") {
      console.error("Error querying admin table:", adminError);
      return NextResponse.json(
        { error: "Database query failed" },
        { status: 500 }
      );
    }

    if (!superAdmin && !admin) {
      return NextResponse.json({ error: "Email not found" }, { status: 404 });
    }

    let resetToken;
    try {
      resetToken = crypto.randomBytes(3).toString("hex");
    } catch (cryptoError) {
      console.error("Error generating reset token:", cryptoError);
      return NextResponse.json(
        { error: "Failed to generate reset token" },
        { status: 500 }
      );
    }

    const now = new Date();
    const expirationTime = new Date(now.getTime() + 30 * 60 * 1000);

    let updateResult;
    let userType;
    let userId;

    if (superAdmin) {
      updateResult = await supabase
        .from("super_admin")
        .update({
          forgot_password_token: resetToken,
          forgot_password_expired: expirationTime.toISOString(),
        })
        .eq("super_admin_id", superAdmin.super_admin_id);

      userType = "super-admin";
      userId = superAdmin.super_admin_id;
    } else if (admin) {
      updateResult = await supabase
        .from("admin")
        .update({
          forgot_password_token: resetToken,
          forgot_password_expired: expirationTime.toISOString(),
        })
        .eq("admin_id", admin.admin_id);

      userType = "admin";
      userId = admin.admin_id;
    }

    if (updateResult?.error) {
      console.error(
        "Error updating forgot password token:",
        updateResult.error
      );
      return NextResponse.json(
        { error: "Failed to update reset token" },
        { status: 500 }
      );
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    if (!baseUrl) {
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    const resetUrl = `${baseUrl}/reset-password?token=${resetToken}&type=${userType}&id=${userId}`;

    let emailSent = false;
    try {
      emailSent = await sendPasswordResetEmail(
        email,
        resetUrl,
        userType || "admin"
      );
    } catch (emailError) {
      console.error("Error sending password reset email:", emailError);
    }

    return NextResponse.json(
      {
        message: emailSent
          ? "Password reset link has been sent to your email address. Please check your inbox and follow the instructions to reset your password."
          : "Password reset link has been generated but could not be sent via email. Please contact Bagus at https://wa.me/6282236883438 for assistance.",
        email: email,
        expiresAt: expirationTime.toISOString(),
        emailSent: emailSent,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Unexpected error in forgot password endpoint:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
