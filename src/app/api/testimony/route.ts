import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// CREATE Testimony
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("Insert testimony body:", body);

    // TODO:Create Testimony in DB: 
    const supabase = createClient(cookies());
    const { data, error } = await supabase
      .from("testimony")
      .insert([body])
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
      { message: "Error creating testimony", details: (error as Error).message },
      { status: 500 }
    );
  }
}
