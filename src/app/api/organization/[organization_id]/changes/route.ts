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
      const userRole = req.user?.role;
      const userId = req.user?.id;

      console.log(
        `🔍 Fetching changes for org ${organization_id}, user role: ${userRole}`
      );

      // Check if user has valid role
      if (userRole !== "admin" && userRole !== "super-admin") {
        console.error("Invalid user role:", userRole);
        return NextResponse.json(
          { error: "Unauthorized access" },
          { status: 403 }
        );
      }

      // If user is admin, verify they can access this organization
      if (userRole === "admin") {
        const { data: orgData, error: orgError } = await supabase
          .from("organization")
          .select("admin_id")
          .eq("organization_id", organization_id)
          .single();

        if (orgError || !orgData) {
          console.error("Organization not found:", orgError);
          return NextResponse.json(
            { error: "Organization not found" },
            { status: 404 }
          );
        }

        if (orgData.admin_id !== userId) {
          console.error("Admin trying to access different organization");
          return NextResponse.json(
            { error: "Unauthorized access" },
            { status: 403 }
          );
        }
      }

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

      console.log(
        `📋 Found ${changes?.length || 0} changes for org ${organization_id}`
      );

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
  undefined // No specific role required, we'll handle authorization manually
);
