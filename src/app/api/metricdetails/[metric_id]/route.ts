import { AuthenticatedRequest, withAuth } from "@/utils/authMiddleware";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

//GET MetricDetail by ID
export const GET = withAuth(
  async (
    req: AuthenticatedRequest,
    context: { params: { metric_id: string } }
  ) => {
    try {
      const { metric_id } = context.params;
      const supabase = createClient(cookies());
      const { data, error } = await supabase
        .from("metric_details")
        .select("*")
        .eq("metric_id", metric_id)
        .single();
      if (error) {
        return NextResponse.json(
          { message: "Error getting metricdetail", details: error.message },
          { status: 500 }
        );
      }
      return NextResponse.json(
        {
          message: `MetricDetail ${metric_id} fetched successfully`,
          data: data,
        },
        { status: 200 }
      );
    } catch (error) {
      return NextResponse.json(
        { message: "Error getting metricdetail" },
        { status: 500 }
      );
    }
  },
  "super-admin"
);

// Update MetricDetail by ID
export const PUT = withAuth(
  async (
    req: AuthenticatedRequest,
    context: { params: { metric_id: string } }
  ) => {
    try {
      const { metric_id } = context.params;
      const body = await req.json();
      const supabase = createClient(cookies());
      const { data, error } = await supabase
        .from("metric_details")
        .update(body)
        .eq("metric_id", metric_id)
        .select()
        .single();
      if (error) {
        return NextResponse.json(
          { message: "Error updating metricdetail", details: error.message },
          { status: 500 }
        );
      }
      return NextResponse.json(
        {
          message: `MetricDetail ${metric_id} updated successfully`,
          data: data,
        },
        { status: 200 }
      );
    } catch (error) {
      return NextResponse.json(
        { message: "Error updating metricdetail" },
        { status: 500 }
      );
    }
  },
  "super-admin"
);

// DELETE MetricDetail by ID
export const DELETE = withAuth(
  async (
    req: AuthenticatedRequest,
    context: { params: { metric_id: string } }
  ) => {
    try {
      const { metric_id } = context.params;
      const supabase = createClient(cookies());      
      const { data, error } = await supabase
        .from("metric_details")
        .delete()
        .eq("metric_id", metric_id);
      if (error) {
        return NextResponse.json(
          { message: "Error deleting metricdetail", details: error.message },
          { status: 500 }
        );
      }
      return NextResponse.json(
        {
          message: `MetricDetail ${metric_id} deleted successfully`,
        },
        { status: 200 }
      );
    } catch (error) {
      return NextResponse.json(
        { message: "Error deleting metricdetail" },
        { status: 500 }
      );
    }
  },
  "super-admin"
);
