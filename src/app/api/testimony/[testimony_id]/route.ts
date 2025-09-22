import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// UPDATE Testimony by ID
export async function PUT(
  req: NextRequest,
  { params }: { params: { testimony_id: string } }
) {
  try {
    const { testimony_id } = params;
    const body = await req.json();

    const supabase = createClient(cookies());

    const { data, error } = await supabase
      .from("testimony")
      .update(body)
      .eq("testimony_id", testimony_id)
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { message: "Error updating testimony", details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: `Testimony ${testimony_id} updated successfully`,
        data: data,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating testimony" },
      { status: 500 }
    );
  }
}

// DELETE Testimony by ID
export async function DELETE(
  req: NextRequest,
  { params }: { params: { testimony_id: string } }
) {
  try {
    const { testimony_id } = params;

    const supabase = createClient(cookies());
    const { error } = await supabase
      .from("testimony")
      .delete()
      .eq("testimony_id", testimony_id);

    if (error) {
      return NextResponse.json(
        { message: "Error deleting testimony by ID", details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: `Testimony ${testimony_id} deleted successfully`,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting testimony by ID" },
      { status: 500 }
    );
  }
}

// GET Testimony by ID
export async function GET(
  req: NextRequest,
  { params }: { params: { testimony_id: string } }
) {
  const { testimony_id } = params;
  try {
    const supabase = createClient(cookies());

    const { data, error } = await supabase
      .from("testimony")
      .select()
      .eq("testimony_id", testimony_id)
      .single();

    if (error) {
      return NextResponse.json(
        { message: "Error getting testimony by ID", details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: `Testimony ${testimony_id} fetched successfully`,
      data: data,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Error getting testimony by ID" },
      { status: 500 }
    );
  }
}
