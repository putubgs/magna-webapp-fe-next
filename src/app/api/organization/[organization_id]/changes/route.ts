import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { withAuth, AuthenticatedRequest } from "@/utils/authMiddleware";

export const GET = withAuth(
  async (
    req: AuthenticatedRequest,
    context: { params: { organization_id: string } }
  ) => {
    try {
      const { organization_id } = context.params;
      const supabase = createClient(cookies());

      // Fetch org_detail_changes for this organization with PENDING or REJECTED status
      const { data: changes, error } = await supabase
        .from("org_detail_changes")
        .select("*")
        .eq("organization_id", organization_id)
        .in("request_status", ["PENDING", "REJECTED"])
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching organization changes:", error);
        return NextResponse.json(
          { error: "Failed to fetch organization changes" },
          { status: 500 }
        );
      }

      return NextResponse.json(
        {
          data: changes || [],
          message: "Organization changes fetched successfully",
        },
        { status: 200 }
      );
    } catch (error) {
      console.error("Error fetching organization changes:", error);
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 }
      );
    }
  },
  "super-admin"
);
