import { createClient } from "@/utils/supabase/server";
import { randomInt } from "crypto";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    const supabase = createClient(cookies());

    let { data: user, error } = await supabase
      .from("super_admin")
      .select("*")
      .eq("email", email)
      .maybeSingle();

    let userTable = "super_admin";
    let userIdField = "super_admin_id";

    if (error) throw error;

    if (!user) {
      const { data: a, error: errorAdmin } = await supabase
        .from("admin")
        .select("*")
        .eq("email", email)
        .maybeSingle();

      if (errorAdmin) throw errorAdmin;

      if (a) {
        userTable = "admin";
        userIdField = "admin_id";
        user = a;
      }
    }

    if (!user) {
      return NextResponse.json(
        { message: "Email tidak ditemukan" },
        { status: 404 }
      );
    }

    const token = randomInt(100000, 999999).toString();
    const expiredAt = new Date(Date.now() + 2 * 60 * 1000).toISOString();

    const { error: updateError } = await supabase
      .from(userTable)
      .update({
        forgot_password_token: token,
        forgot_password_expired: expiredAt,
      })
      .eq(userIdField, user[userIdField]);

    if (updateError) throw updateError;

    // TODO: Kirim email ke user dengan token
    const url = `http://localhost:3000/reset-password?token=${token}&id=${user[userIdField]}&userType=${userTable}`;
    console.log(`Kirim email ke ${email} dengan link: ${url}`);

    return NextResponse.json(
      { message: "Reset password token berhasil dibuat", data: url },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
