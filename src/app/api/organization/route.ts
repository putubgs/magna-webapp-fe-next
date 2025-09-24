import { NextResponse, NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { AuthenticatedRequest, withAuth } from "@/utils/authMiddleware";

// CREATE Organization
export const POST = withAuth(async (req: AuthenticatedRequest) => {
	try {
		const supabase = createClient(cookies());
		const body = await req.json();

		const { data, error } = await supabase
			.from("organization")
			.insert(body)
			.select("*")
			.single();

		if (error) {
			return NextResponse.json({ error: error.message }, { status: 500 });
		}

		return NextResponse.json(
			{
				message: "Organization created successfully",
				data,
			},
			{ status: 201 }
		);
	} catch (error) {
		console.error("Error creating organization:", error);
		return NextResponse.json(
			{ error: "Something went wrong" },
			{ status: 500 }
		);
	}
}, "admin");

// GET All Organizations
export const GET = withAuth(async (req: AuthenticatedRequest) => {
	try {
		const supabase = createClient(cookies());
		const { data, error } = await supabase.from("organization").select("*");

		if (error) {
			return NextResponse.json({ error: error.message }, { status: 500 });
		}

		return NextResponse.json(
			{ message: "Success fetched all organizations", data },
			{ status: 200 }
		);
	} catch (error) {
		return NextResponse.json(
			{ error: "Failed to fetch all organizations" },
			{ status: 500 }
		);
	}
}, "admin");
