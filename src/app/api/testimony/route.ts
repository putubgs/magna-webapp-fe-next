import { AuthenticatedRequest, withAuth } from "@/utils/authMiddleware";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// CREATE Testimony
export const POST = withAuth(async (req: AuthenticatedRequest) => {
  try {
    const body = await req.json();
    console.log("Insert testimony body:", body);
    let organizationId = body.organization_id;

    if (!organizationId) {
      const supabase = createClient(cookies());

      const { data: orgData } = await supabase
        .from("organization")
        .select("organization_id")
        .eq("admin_id", req.user?.id)
        .limit(1)
        .single();

      organizationId = orgData?.organization_id;
    }
    
    const completeBody = {
      participant_name: body.participant_name,
      position: body.position,
      message: body.message,
      organization_id: organizationId,
    };

    const supabase = createClient(cookies());
    const { data, error } = await supabase
      .from("testimony")
      .insert([completeBody])
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { message: "Error creating testimony", details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: "Testimony created successfully",
        data: data,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log("Insert error:", error);
    return NextResponse.json(
      {
        message: "Error creating testimony",
        details: (error as Error).message,
      },
      { status: 500 }
    );
  }
}, "admin");

// GET All Testimony
export async function GET() {
  try {
    const supabase = createClient(cookies());
    const { data, error } = await supabase
      .from("testimony")
      .select("*")
      .order("testimony_date", { ascending: false });

    if (error) {
      return NextResponse.json(
        { message: "Error getting testimonies", details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Testimonies retrieved successfully", data: data },
      { status: 200 }
    );
  } catch (error) {
    console.log("Get error:", error);
    return NextResponse.json(
      {
        message: "Error getting testimonies",
        details: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
