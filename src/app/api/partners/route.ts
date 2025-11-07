import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { withAuth, AuthenticatedRequest } from "@/utils/authMiddleware";

// CREATE PARTNER (auto-link to organization)
export const POST = withAuth(async (req: AuthenticatedRequest) => {
	try {
		const supabase = createClient(cookies());
		const body = await req.json();

		const { partner_name, partner_logo_url } = body;

		if (!partner_name || !partner_logo_url) {
			return NextResponse.json(
				{ error: "Missing required fields" },
				{ status: 400 }
			);
		}

		const { data, error } = await supabase
			.from("partners")
			.insert([{ partner_name, partner_logo_url }])
			.select("partner_id, partner_name, partner_logo_url")
			.single();

		if (error) {
			console.error("Insert partner failed:", error);
			return NextResponse.json({ error: error.message }, { status: 500 });
		}
		const partner = data;

		return NextResponse.json(
			{
				message: "Partner created and linked successfully",
				data: partner,
			},
			{ status: 201 }
		);
	} catch (err) {
		console.error("Error creating partner:", err);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 }
		);
	}
});

// GET ALL PARTNERS
export const GET = withAuth(async (_req: AuthenticatedRequest) => {
	try {
		const supabase = createClient(cookies());

		const { data, error } = await supabase
			.from("partners")
			.select("partner_id, partner_name, partner_logo_url")
			.order("partner_name", { ascending: true });

		if (error)
			return NextResponse.json({ error: error.message }, { status: 500 });

		return NextResponse.json(
			{ message: "Fetched all partners successfully", data },
			{ status: 200 }
		);
	} catch (err) {
		console.error("Error fetching partners:", err);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 }
		);
	}
});
