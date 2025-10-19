import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { withAuth, AuthenticatedRequest } from "@/utils/authMiddleware";

export const POST = withAuth(async (req: AuthenticatedRequest) => {
  try {
    const { currentPassword, newPassword, isNewAccount } = await req.json();

    // Validation
    if (!newPassword) {
      return NextResponse.json(
        { error: "New password is required" },
        { status: 400 }
      );
    }

    if (newPassword.length < 8) {
      return NextResponse.json(
        { error: "New password must be at least 8 characters long" },
        { status: 400 }
      );
    }

    const supabase = createClient(cookies());
    const adminId = req.user?.id;

    if (!adminId) {
      return NextResponse.json(
        { error: "Admin ID not found" },
        { status: 401 }
      );
    }

    // Get admin from database
    const { data: admin, error: fetchError } = await supabase
      .from("admin")
      .select("admin_id, email, password, is_new_account")
      .eq("admin_id", adminId)
      .single();

    if (fetchError || !admin) {
      console.error("Error fetching admin:", fetchError);
      return NextResponse.json({ error: "Admin not found" }, { status: 404 });
    }

    // Verify current password only if NOT a new account
    if (!isNewAccount && currentPassword) {
      const isPasswordValid = await bcrypt.compare(
        currentPassword,
        admin.password
      );

      if (!isPasswordValid) {
        return NextResponse.json(
          { error: "Current password is incorrect" },
          { status: 401 }
        );
      }
    } else if (!isNewAccount && !currentPassword) {
      return NextResponse.json(
        { error: "Current password is required" },
        { status: 400 }
      );
    }

    // Check if new password is the same as current password
    const isSamePassword = await bcrypt.compare(newPassword, admin.password);

    if (isSamePassword) {
      return NextResponse.json(
        { error: "New password must be different from your current password" },
        { status: 400 }
      );
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password and set is_new_account to false
    const { error: updateError } = await supabase
      .from("admin")
      .update({
        password: hashedPassword,
        is_new_account: false,
      })
      .eq("admin_id", adminId);

    if (updateError) {
      console.error("Error updating password:", updateError);
      return NextResponse.json(
        { error: "Failed to update password" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: "Password changed successfully",
        is_new_account: false,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in change password:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}, "admin");
