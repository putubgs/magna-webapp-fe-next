import { AuthenticatedRequest, withAuth } from "@/utils/authMiddleware";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// UPDATE Testimony by ID
export const PUT = withAuth(
  async (
    req: AuthenticatedRequest,
    context: {
      params: {
        testimony_id: string;
      };
    }
  ) => {
  try {
    const { testimony_id } = context.params;
    console.log(testimony_id)
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
}, "admin");

// GET Testimony by ID
export const GET = withAuth(
  async (
    req: AuthenticatedRequest,
    context: { params: { testimony_id: string } }
  ) => {
    const { testimony_id } = context.params;
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
  },
  "admin"
);
