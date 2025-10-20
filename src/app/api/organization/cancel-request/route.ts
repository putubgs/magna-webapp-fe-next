import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { withAuth, AuthenticatedRequest } from "@/utils/authMiddleware";

// DELETE - Cancel pending organization update request
export const DELETE = withAuth(async (req: AuthenticatedRequest) => {
  try {
    const supabase = createClient(cookies());
    const adminId = req.user?.id;

    if (!adminId) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 }
      );
    }

    console.log(`🗑️ Admin ${adminId} canceling organization update request`);

    // First, get the organization for this admin
    const { data: organization, error: orgError } = await supabase
      .from("organization")
      .select("organization_id")
      .eq("admin_id", adminId)
      .single();

    if (orgError || !organization) {
      console.error("❌ No organization found for admin:", adminId);
      return NextResponse.json(
        { error: "No organization found for this admin" },
        { status: 404 }
      );
    }

    const organizationId = organization.organization_id;

    // Delete all PENDING org_detail_changes for this organization
    const { error: deleteError } = await supabase
      .from("org_detail_changes")
      .delete()
      .eq("organization_id", organizationId)
      .eq("request_status", "PENDING");

    if (deleteError) {
      console.error("❌ Error deleting pending request:", deleteError);
      return NextResponse.json(
        { error: "Failed to cancel pending request" },
        { status: 500 }
      );
    }

    console.log("✅ Pending request canceled successfully");
    return NextResponse.json(
      {
        message: "Pending organization update request canceled successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in DELETE /api/organization/cancel-request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}, "admin");
