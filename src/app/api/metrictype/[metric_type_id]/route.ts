import { AuthenticatedRequest, withAuth } from "@/utils/authMiddleware";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// GET OrgImpact by ID
export const GET = withAuth(
  async (
    req: AuthenticatedRequest,
    context: { params: { metric_type_id: string } }
  ) => {
    try {
      const { metric_type_id } = context.params;
      const supabase = createClient(cookies());
      const { data, error } = await supabase
        .from("metric_type")
        .select("*")
        .eq("metric_type_id", metric_type_id)
        .single();
      if (error) {
        return NextResponse.json(
          { message: "Error getting metric_type", details: error.message },
          { status: 500 }
        );
      }
      return NextResponse.json(
        {
          message: `OrgImpact ${metric_type_id} fetched successfully`,
          data: data,
        },
        { status: 200 }
      );
    } catch (error) {
      return NextResponse.json(
        { message: "Error getting metric_type" },
        { status: 500 }
      );
    }
  },
  "super-admin"
);

// Update OrgImpact by ID#
export const PUT = withAuth(
  async (
    req: AuthenticatedRequest,
    context: { params: { metric_type_id: string } }
  ) => {
    try {
      const { metric_type_id } = context.params;
      const body = await req.json();
      const supabase = createClient(cookies());
      const { data, error } = await supabase
        .from("metric_type")
        .update(body)
        .eq("metric_type_id", metric_type_id)
        .select()
        .single();
      if (error) {
        return NextResponse.json(
          { message: "Error updating metric_type", details: error.message },
          { status: 500 }
        );
      }
      return NextResponse.json(
        {
          message: `OrgImpact ${metric_type_id} updated successfully`,
          data: data,
        },
        { status: 200 }
      );
    } catch (error) {
      return NextResponse.json(
        { message: "Error updating metric_type" },
        { status: 500 }
      );
    }
  },
  "super-admin"
);

// DELETE OrgImpact by ID
export const DELETE = withAuth(
  async (
    req: AuthenticatedRequest,
    context: { params: { metric_type_id: string } }
  ) => {
    try {
      const { metric_type_id } = context.params;
      const supabase = createClient(cookies());
      const { error } = await supabase
        .from("metric_type")
        .delete()
        .eq("metric_type_id", metric_type_id);
      if (error) {
        return NextResponse.json(
          { message: "Error deleting metric_type", details: error.message },
          { status: 500 }
        );
      }
      return NextResponse.json(
        {
          message: `OrgImpact ${metric_type_id} deleted successfully`,
        },
        { status: 200 }
      );
    } catch (error) {
      return NextResponse.json(
        { message: "Error deleting metric_type" },
        { status: 500 }
      );
    }
  },
  "super-admin"
);
