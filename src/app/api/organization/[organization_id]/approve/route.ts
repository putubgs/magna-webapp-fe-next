import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { withAuth, AuthenticatedRequest } from "@/utils/authMiddleware";

export const POST = withAuth(
  async (
    req: AuthenticatedRequest,
    context: { params: { organization_id: string } }
  ) => {
    try {
      const { organization_id } = context.params;
      const supabase = createClient(cookies());

      const { data: changes, error: fetchError } = await supabase
        .from("org_detail_changes")
        .select("*")
        .eq("organization_id", organization_id)
        .eq("request_status", "PENDING");

      if (fetchError) {
        console.error("Error fetching changes:", fetchError);
        return NextResponse.json(
          { error: "Failed to fetch pending changes" },
          { status: 500 }
        );
      }

      if (!changes || changes.length === 0) {
        return NextResponse.json(
          { error: "No pending changes found" },
          { status: 404 }
        );
      }

      const latestChange = changes[0];
      const updateData: any = {};

      // Map all non-null fields from org_detail_changes to organization table
      const fieldMappings: { [key: string]: string } = {
        organization_name: "organization_name",
        color: "color",
        logo_url: "logo_url",
        short_desc: "short_desc",
        full_desc: "full_desc",
        linkedin_link: "linkedin_link",
        tiktok_link: "tiktok_link",
        instagram_link: "instagram_link",
        email: "email",
        whatsapp: "whatsapp",
        founded_date: "founded_date",
      };

      // Only include fields that have non-null values in the change request
      Object.keys(fieldMappings).forEach((changeField) => {
        if (
          latestChange[changeField] !== null &&
          latestChange[changeField] !== undefined
        ) {
          const orgField = fieldMappings[changeField];
          updateData[orgField] = latestChange[changeField];
        }
      });

      const { data: updatedOrg, error: updateError } = await supabase
        .from("organization")
        .update(updateData)
        .eq("organization_id", organization_id)
        .select()
        .single();

      if (updateError) {
        console.error("Error updating organization:", updateError);
        return NextResponse.json(
          { error: "Failed to update organization" },
          { status: 500 }
        );
      }

      const { error: deleteError } = await supabase
        .from("org_detail_changes")
        .delete()
        .eq("organization_id", organization_id)
        .eq("request_status", "PENDING");

      if (deleteError) {
        console.error(
          "Error deleting changes (organization already updated):",
          deleteError
        );
        // Don't return error as organization is already updated
      }

      return NextResponse.json(
        {
          message: "Changes approved and applied successfully",
          data: updatedOrg,
          appliedChanges: changes.length,
        },
        { status: 200 }
      );
    } catch (error) {
      console.error("Error in approve changes:", error);
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 }
      );
    }
  },
  "super-admin"
);
