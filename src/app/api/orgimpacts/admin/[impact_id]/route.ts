import { AuthenticatedRequest, withAuth } from "@/utils/authMiddleware";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// GET OrgImpact by ID
export const GET = withAuth(
  async (
    req: AuthenticatedRequest,
    context: { params: { impact_id: string } }
  ) => {
    try {
      const { impact_id } = context.params;
      const supabase = createClient(cookies());
      const { data, error } = await supabase
        .from("org_impacts")
        .select("*")
        .eq("impact_id", impact_id)
        .single();
      if (error) {
        return NextResponse.json(
          { message: "Error getting org_impacts", details: error.message },
          { status: 500 }
        );
      }
      return NextResponse.json(
        {
          message: `OrgImpact ${impact_id} fetched successfully`,
          data: data,
        },
        { status: 200 }
      );
    } catch (error) {
      return NextResponse.json(
        { message: "Error getting org_impacts" },
        { status: 500 }
      );
    }
  },
  "admin"
);

// Update OrgImpact by ID#
export const PUT = withAuth(
  async (
    req: AuthenticatedRequest,
    context: { params: { impact_id: string } }
  ) => {
    try {
      const { impact_id } = context.params;
      const body = await req.json();
      const supabase = createClient(cookies());
      const { data, error } = await supabase
        .from("org_impacts")
        .update(body)
        .eq("impact_id", impact_id)
        .select()
        .single();
      if (error) {
        return NextResponse.json(
          { message: "Error updating org_impacts", details: error.message },
          { status: 500 }
        );
      }
      return NextResponse.json(
        {
          message: `OrgImpact ${impact_id} updated successfully`,
          data: data,
        },
        { status: 200 }
      );
    } catch (error) {
      return NextResponse.json(
        { message: "Error updating org_impacts" },
        { status: 500 }
      );
    }
  },
  "admin"
);

// DELETE OrgImpact by ID
export const DELETE = withAuth(
  async (
    req: AuthenticatedRequest,
    context: { params: { impact_id: string } }
  ) => {
    try {
      const { impact_id } = context.params;
      const supabase = createClient(cookies());
      const { error } = await supabase
        .from("org_impacts")
        .delete()
        .eq("impact_id", impact_id);
      if (error) {
        return NextResponse.json(
          { message: "Error deleting org_impacts", details: error.message },
          { status: 500 }
        );
      }
      return NextResponse.json(
        {
          message: `OrgImpact ${impact_id} deleted successfully`,
        },
        { status: 200 }
      );
    } catch (error) {
      return NextResponse.json(
        { message: "Error deleting org_impacts" },
        { status: 500 }
      );
    }
  },
  "admin"
);
