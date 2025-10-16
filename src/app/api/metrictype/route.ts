import { AuthenticatedRequest, withAuth } from "@/utils/authMiddleware";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// CREATE MetricType
export const POST = withAuth(async (req: AuthenticatedRequest) => {
  try {
    const body = await req.json();
    const supabase = createClient(cookies());

    const { data: metric_type } = await supabase
      .from("metric_type")
      .select("metric_type_id")
      .eq("metric_name", body.metric_name)
      .limit(1)
      .single();

    if (metric_type) {
      return NextResponse.json(
        { data: { metric_type_id: metric_type.metric_type_id }, message: "MetricType already exists" },
        { status: 200 }
      );
    }
    const { data, error } = await supabase
      .from("metric_type")
      .insert([body])
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { message: "Error creating orgimpact", details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: "OrgImpact created successfully",
        data: { metric_type_id: data.metric_type_id},
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating orgimpact" },
      { status: 500 }
    );
  }
}, "super-admin");

// GET All MetricType
export const GET = withAuth(async (req: AuthenticatedRequest) => {
  try {
    const supabase = createClient(cookies());
    const { data, error } = await supabase
      .from("metric_type")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json(
        { message: "Error getting metrictype", details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "MetricType retrieved successfully", data: data },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error getting metrictype" },
      { status: 500 }
    );
  }
}, "super-admin");
