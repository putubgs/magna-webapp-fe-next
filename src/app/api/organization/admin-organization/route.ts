import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { withAuth, AuthenticatedRequest } from "@/utils/authMiddleware";

// GET Organization for the current admin
export const GET = withAuth(async (req: AuthenticatedRequest) => {
  try {
    const supabase = createClient(cookies());
    const adminId = req.user?.id;

    if (!adminId) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 }
      );
    }

    console.log(`🔍 Fetching organization for admin: ${adminId}`);

    // Find organization where admin_id matches the current user
    const { data: organization, error: orgError } = await supabase
      .from("organization")
      .select("*")
      .eq("admin_id", adminId)
      .single();

    if (orgError) {
      // If no organization found, it's not an error, just return null
      if (orgError.code === "PGRST116") {
        console.log(`⚠️ No organization found for admin: ${adminId}`);
        return NextResponse.json(
          {
            message: "No organization found for this admin",
            data: null,
          },
          { status: 200 }
        );
      }
      throw orgError;
    }

    console.log(`✅ Found organization: ${organization.organization_name}`);

    return NextResponse.json(
      {
        message: "Organization fetched successfully",
        data: organization,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching organization for admin:", error);
    return NextResponse.json(
      { error: "Error fetching organization" },
      { status: 500 }
    );
  }
}, "admin"); // Allow both admin and super-admin
