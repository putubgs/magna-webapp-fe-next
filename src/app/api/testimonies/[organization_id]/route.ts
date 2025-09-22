import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

//GET All Testimonies by Organization ID
export async function GET(
  req: NextRequest,
  { params }: { params: { organization_id: string } }
) {
  try {
    const { organization_id } = params;
    const supabase = createClient(cookies());

    const { data: testimonies, error } = await supabase
      .from("testimony")
      .select("*")
      .eq("organization_id", organization_id);

    if (error) {
      return NextResponse.json(
        { message: "Error getting testimonies by organization ID", details: error.message },
        { status: 500 }
      );
    }
    

    return NextResponse.json(
      {
        message: `Testimonies for organization ${organization_id} fetched successfully`,
        data: testimonies,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error getting testimonies by organization ID" },
      { status: 500 }
    );
  }
}
