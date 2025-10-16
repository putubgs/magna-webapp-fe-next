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

    const { data, error } = await supabase
      .from("metric_details")
      .select(
        `
        *,
        metric_type:metric_type_id (
          metric_name
        )
      `
      )
      .eq("organization_id", orgData.organization_id)
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json(
        { message: "Error getting metricdetails", details: error.message },
        { status: 500 }
      );
    }

    const formattedData = data.map((item) => ({
      ...item,
      metric_name: item.metric_type?.metric_name || null,
      metric_type: undefined,
    }));

    return NextResponse.json(
      { message: "MetricDetails retrieved successfully", data: formattedData },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error getting metricdetails",
        details: (error as Error).message,
      },
      { status: 500 }
    );
  }
}, "admin");

// CREATE MetricDetail
export const POST = withAuth(async (req: AuthenticatedRequest) => {
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

    const body = await req.json();
    const { data, error } = await supabase
      .from("metric_details")
      .insert([{ ...body, organization_id: orgData.organization_id }])
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
