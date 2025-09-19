import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const supabase = createClient(cookies());

    const { data: superAdmin, error: superAdminError } = await supabase
      .from("super_admin")
      .select("*")
      .eq("email", email)
      .single();

    if (superAdmin && !superAdminError) {
      const isValidPassword =
        (await bcrypt.compare(password, superAdmin.password)) ||
        password === superAdmin.password;

      if (isValidPassword) {
        return NextResponse.json({
          success: true,
          user: {
            id: superAdmin.super_admin_id,
            email: superAdmin.email,
            role: "super-admin",
          },
        });
      }
    }

    const { data: admin, error: adminError } = await supabase
      .from("admin")
      .select("*")
      .eq("email", email)
      .single();

    if (admin && !adminError) {
      const isValidPassword =
        (await bcrypt.compare(password, admin.password)) ||
        password === admin.password;

      if (isValidPassword) {
        return NextResponse.json({
          success: true,
          user: {
            id: admin.admin_id,
            email: admin.email,
            role: "admin",
          },
        });
      }
    }

    return NextResponse.json(
      { error: "Invalid email or password" },
      { status: 401 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
