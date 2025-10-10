import { AuthenticatedRequest, withAuth } from "@/utils/authMiddleware";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// CREATE OrgImpact
export const POST = withAuth(async (req: AuthenticatedRequest) => {
  try {
    const supabase = createClient(cookies());

    const { data: orgData } = await supabase
      .from("organization")
      .select("organization_id")
      .eq("admin_id", req.user?.id)
      .limit(1)
      .single();

    const { data, error } = await supabase
      .from("org_impacts")
      .insert([orgData])
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
}, "admin");

// GET All OrgImpacts
export const GET = withAuth(async (req: AuthenticatedRequest) => {
  try {
    const supabase = createClient(cookies());
    const { data: orgData } = await supabase
      .from("organization")
      .select("organization_id")
      .eq("admin_id", req.user?.id)
      .limit(1)
      .single();
      
    const { data, error } = await supabase
      .from("org_impacts")
      .select("*")
      .eq("organization_id", orgData?.organization_id)
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
}, "admin");
