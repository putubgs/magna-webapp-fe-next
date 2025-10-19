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
      const body = await req.json();
      const { feedback } = body;

      if (!feedback || !feedback.trim()) {
        return NextResponse.json(
          { error: "Feedback is required for rejection" },
          { status: 400 }
        );
      }

      const supabase = createClient(cookies());

      // Update all PENDING org_detail_changes to REJECTED with feedback
      const { data: updatedChanges, error: updateError } = await supabase
        .from("org_detail_changes")
        .update({
          request_status: "REJECTED",
          request_feedback: feedback,
        })
        .eq("organization_id", organization_id)
        .eq("request_status", "PENDING")
        .select();

      if (updateError) {
        console.error("Error rejecting changes:", updateError);
        return NextResponse.json(
          { error: "Failed to reject changes" },
          { status: 500 }
        );
      }

      if (!updatedChanges || updatedChanges.length === 0) {
        return NextResponse.json(
          { error: "No pending changes found to reject" },
          { status: 404 }
        );
      }

      return NextResponse.json(
        {
          message: "Changes rejected successfully",
          rejectedChanges: updatedChanges.length,
          feedback,
        },
        { status: 200 }
      );
    } catch (error) {
      console.error("Error in reject changes:", error);
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 }
      );
    }
  },
  "super-admin"
);
