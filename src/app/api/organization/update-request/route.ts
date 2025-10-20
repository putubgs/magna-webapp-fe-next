import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { withAuth, AuthenticatedRequest } from "@/utils/authMiddleware";

export const POST = withAuth(async (req: AuthenticatedRequest) => {
  try {
    const supabase = createClient(cookies());
    const adminId = req.user?.id;

    if (!adminId) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 }
      );
    }

    console.log(`📝 Admin ${adminId} submitting organization update request`);

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

    // Get the request body
    const body = await req.json();
    const {
      organization_name,
      color,
      logo_url,
      short_desc,
      full_desc,
      instagram_link,
      tiktok_link,
      linkedin_link,
      email,
      whatsapp,
      founded_date,
    } = body;

    const processedFoundedDate =
      founded_date && founded_date.trim() !== "" ? founded_date : null;

    console.log("📋 Update request data:", body);

    // Check if there's already a PENDING request for this organization
    const { data: existingPending, error: checkError } = await supabase
      .from("org_detail_changes")
      .select("org_detail_changes_id")
      .eq("organization_id", organizationId)
      .eq("request_status", "PENDING")
      .single();

    if (checkError && checkError.code !== "PGRST116") {
      // Error other than "no rows found"
      console.error("❌ Error checking existing pending requests:", checkError);
      return NextResponse.json(
        { error: "Failed to check existing requests" },
        { status: 500 }
      );
    }

    if (existingPending) {
      console.log("🔄 Updating existing pending request");
      const { data: updatedChange, error: updateError } = await supabase
        .from("org_detail_changes")
        .update({
          organization_name,
          color,
          logo_url,
          short_desc,
          full_desc,
          instagram_link,
          tiktok_link,
          linkedin_link,
          email,
          whatsapp,
          founded_date: processedFoundedDate,
          updated_at: new Date().toISOString(),
        })
        .eq("org_detail_changes_id", existingPending.org_detail_changes_id)
        .select()
        .single();

      if (updateError) {
        console.error("❌ Error updating pending request:", updateError);
        return NextResponse.json(
          { error: "Failed to update pending request" },
          { status: 500 }
        );
      }

      console.log("✅ Pending request updated successfully");
      return NextResponse.json(
        {
          message: "Organization update request updated successfully",
          data: updatedChange,
        },
        { status: 200 }
      );
    } else {
      console.log("➕ Creating new org_detail_changes record");
      const { data: newChange, error: insertError } = await supabase
        .from("org_detail_changes")
        .insert({
          organization_id: organizationId,
          organization_name,
          color,
          logo_url,
          short_desc,
          full_desc,
          instagram_link,
          tiktok_link,
          linkedin_link,
          email,
          whatsapp,
          founded_date: processedFoundedDate,
          request_status: "PENDING",
          request_feedback: null,
        })
        .select()
        .single();

      if (insertError) {
        console.error("❌ Error creating org_detail_changes:", insertError);
        return NextResponse.json(
          { error: "Failed to create update request" },
          { status: 500 }
        );
      }

      console.log("✅ Organization update request created successfully");
      return NextResponse.json(
        {
          message: "Organization update request submitted successfully",
          data: newChange,
        },
        { status: 201 }
      );
    }
  } catch (error) {
    console.error("Error in POST /api/organization/update-request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}, "admin");
