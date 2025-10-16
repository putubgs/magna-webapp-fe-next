import { AuthenticatedRequest, withAuth } from "@/utils/authMiddleware";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// CREATE MetricType
export const POST = withAuth(async (req: AuthenticatedRequest) => {
  try {
    const body = await req.json();

    const supabase = createClient(cookies());

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
        data: data,
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

// GET All OrgImpacts
export const GET = withAuth(async (req: AuthenticatedRequest) => {
  try {
    const supabase = createClient(cookies());
    const { data, error } = await supabase
      .from("metric_type")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json(
        { message: "Error getting orgimpacts", details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "OrgImpacts retrieved successfully", data: data },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error getting orgimpacts" },
      { status: 500 }
    );
  }
}, "super-admin");
