import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { withAuth, AuthenticatedRequest } from "@/utils/authMiddleware";

export const GET = withAuth(async (req: AuthenticatedRequest) => {
  try {
    const supabase = createClient(cookies());
    const adminId = req.user?.id;

    if (!adminId) {
      return NextResponse.json(
        { error: "Admin ID not found" },
        { status: 401 }
      );
    }

    // Get admin's current is_new_account status from database
    const { data: admin, error: fetchError } = await supabase
      .from("admin")
      .select("admin_id, email, is_new_account")
      .eq("admin_id", adminId)
      .single();

    if (fetchError || !admin) {
      console.error("Error fetching admin:", fetchError);
      return NextResponse.json({ error: "Admin not found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        is_new_account: admin.is_new_account || false,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error checking new account status:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}, "admin");
