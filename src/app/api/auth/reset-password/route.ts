import { createClient } from "@/utils/supabase/server";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { id, token, userType, newPassword } = await req.json();

    if (!id || !token || !userType || !newPassword) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }
    const supabase = createClient(cookies());
    const { data: user, error } = await supabase
      .from(userType)
      .select("*")
      .eq(`${userType}_id`, id)
      .eq("forgot_password_token", token)
      .maybeSingle();

    if (error) throw error;

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const now = new Date();
    const expirationTime = new Date(user.forgot_password_token_expires_at);

    if (now > expirationTime) {
      return NextResponse.json(
        { message: "Token has expired" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const { error: updateError } = await supabase
      .from(userType)
      .update({ password: hashedPassword })
      .eq(`${userType}_id`, id);

    if (updateError) throw updateError;

    return NextResponse.json(
      { message: "Password reset successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get("id");
    const token = searchParams.get("token");
    const type = searchParams.get("userType");

    if (!id || !token || !type) {
      return NextResponse.json(
        { message: "Missing required parameters" },
        { status: 400 }
      );
    }

    const supabase = createClient(cookies());
    const { data: user, error } = await supabase
      .from(type)
      .select("*")
      .eq(`${type}_id`, id)
      .eq("forgot_password_token", token)
      .maybeSingle();

    if (error) throw error;

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const now = new Date();
    const expiredAt = new Date(user.forgot_password_expired);
    expiredAt.setHours(expiredAt.getHours() + 7);
    console.log("Now:", new Date().toISOString());
    console.log("ExpiredAt:", expiredAt.toISOString());

    if (now > expiredAt) {
      return NextResponse.json({ message: "Token expired" }, { status: 400 });
    }

    return NextResponse.json({ message: "User found", user }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
