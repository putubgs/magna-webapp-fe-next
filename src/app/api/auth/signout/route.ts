import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient(cookies());

    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Signout error:", error);
      return NextResponse.json(
        { error: "Failed to sign out" },
        { status: 500 }
      );
    }

    const response = NextResponse.json({
      success: true,
      message: "Successfully signed out",
    });

    response.cookies.set("auth-token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 0,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Signout error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
