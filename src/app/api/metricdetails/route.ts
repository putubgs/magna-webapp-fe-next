import { AuthenticatedRequest, withAuth } from "@/utils/authMiddleware";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// GET All MetricDetails
export const GET = withAuth(async () => {
  try {
    const supabase = createClient(cookies());
    const { data, error } = await supabase
      .from("metric_details")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json(
        { message: "Error getting metricdetails", details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "MetricDetails retrieved successfully", data: data },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error getting metricdetails" },
      { status: 500 }
    );
  }
}, "super-admin");

//CREATE MetricDetail
export const POST = withAuth(async (req: AuthenticatedRequest) => {
  try {
    const supabase = createClient(cookies());

    const body = await req.json();
    const { data, error } = await supabase
      .from("metric_details")
      .insert([body])
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { message: "Error creating metricdetail", details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "MetricDetail created successfully", data: data },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating metricdetail" },
      { status: 500 }
    );
  }
}, "super-admin");
