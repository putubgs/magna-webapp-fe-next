import { AuthenticatedRequest, withAuth } from "@/utils/authMiddleware";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// GET All MetricDetails
export const GET = withAuth(async (req: AuthenticatedRequest) => {
  try {
    const supabase = createClient(cookies());
    
    const { data: orgData } = await supabase
      .from("organization")
      .select("organization_id")
      .eq("admin_id", req.user?.id)
      .limit(1)
      .single();

    if (!orgData) {
      return NextResponse.json(
        { message: "Organization not found for this admin" },
        { status: 404 }
      );
    }

    const { data: impactsData } = await supabase
      .from("org_impacts")
      .select("impact_id")
      .eq("organization_id", orgData.organization_id);

    if (!impactsData || impactsData.length === 0) {
      return NextResponse.json(
        { message: "MetricDetails retrieved successfully", data: [] },
        { status: 200 }
      );
    }

    const impactIds = impactsData.map((impact) => impact.impact_id);

    const { data, error } = await supabase
      .from("metric_details")
      .select("*")
      .in("impact_id", impactIds)
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
}, "admin");

// CREATE MetricDetail
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
}, "admin");
