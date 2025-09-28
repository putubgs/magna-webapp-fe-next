import { AuthenticatedRequest, withAuth } from "@/utils/authMiddleware";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// CREATE Testimony
export const POST = withAuth(async (req: AuthenticatedRequest) => {
  try {
    const body = await req.json();
    console.log("Insert testimony body:", body);
    let organization_name = body.organization_name;

    const supabase = createClient(cookies());

    const { data: orgData } = await supabase
      .from("organization")
      .select("organization_id")
      .eq("organization_name", organization_name)
      .limit(1)
      .single();

    const organizationId = orgData?.organization_id;

    const completeBody = {
      participant_name: body.participant_name,
      position: body.position,
      message: body.message,
      organization_id: organizationId,
      testimony_date: body.testimony_date,
    };
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
}, "super-admin");

// GET All Testimony
export const GET = withAuth(async (req: AuthenticatedRequest) => {
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

    //temporary commented

    // const {data: orgData, error: orgError} = await supabase
    //   .from("organization")
    //   .select("organization_name")
    //   .in("organization_id", data.map((item: any) => item.organization_id));

    // if (orgError) {
    //   return NextResponse.json(
    //     { message: "Error getting organizations", details: orgError.message },
    //     { status: 500 }
    //   );
    // }

    // const testimoniesWithOrgNames = data.map((item: any) => {
    //   const org = orgData.find((o: any) => o.organization_id === item.organization_id);
    //   return {
    //     ...item,
    //     organization_name: org ? org.organization_name : null,
    //   };
    // });

    //return testimoniesWithOrgNames if the org implemented

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
}, "super-admin");
