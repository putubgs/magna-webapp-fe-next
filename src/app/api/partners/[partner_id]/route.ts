import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { withAuth, AuthenticatedRequest } from "@/utils/authMiddleware";

// GET PARTNER BY ID
export const GET = withAuth(async (_req: AuthenticatedRequest, context) => {
	try {
		const supabase = createClient(cookies());
		const { partner_id } = context.params;

		const { data, error } = await supabase
			.from("partners")
			.select("partner_id, partner_name, partner_logo_url")
			.eq("partner_id", partner_id)
			.single();

		if (error || !data)
			return NextResponse.json(
				{ error: "Partner not found" },
				{ status: 404 }
			);

		return NextResponse.json(
			{ message: "Fetched partner successfully", data },
			{ status: 200 }
		);
	} catch (err) {
		console.error("Error fetching partner:", err);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 }
		);
	}
});

// UPDATE PARTNER
export const PUT = withAuth(async (req: AuthenticatedRequest, context) => {
	try {
		const supabase = createClient(cookies());
		const { partner_id } = context.params;
		const body = await req.json();
		const userRole = req.user?.role;

		const { data, error } = await supabase
			.from("partners")
			.update({
				partner_name: body.partner_name,
				partner_logo_url: body.partner_logo_url,
			})
			.eq("partner_id", partner_id)
			.select("partner_id, partner_name, partner_logo_url");
		// .single();

		console.log("Data:", data);

		if (error)
			return NextResponse.json({ error: error.message }, { status: 500 });
		if (!data)
			return NextResponse.json(
				{ error: "Partner not found" },
				{ status: 404 }
			);

		// Assign ke org (hanya super-admin)
		if (userRole === "super-admin" && body.organization_id) {
			const { error: linkError } = await supabase
				.from("organization_partner")
				.insert({
					organization_id: body.organization_id,
					partner_id,
				});

			// dupe error
			if (linkError && linkError.code !== "23505") {
				console.error(
					"Failed linking partner to organization:",
					linkError
				);
			}
		}

		return NextResponse.json(
			{ message: "Partner updated successfully", data },
			{ status: 200 }
		);
	} catch (err) {
		console.error("Error updating partner:", err);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 }
		);
	}
});

// DELETE PARTNER
export const DELETE = withAuth(async (_req: AuthenticatedRequest, context) => {
	try {
		const supabase = createClient(cookies());
		const { partner_id } = context.params;

		const { error } = await supabase
			.from("partners")
			.delete()
			.eq("partner_id", partner_id);

		if (error)
			return NextResponse.json({ error: error.message }, { status: 500 });

		return NextResponse.json(
			{ message: "Partner deleted successfully" },
			{ status: 200 }
		);
	} catch (err) {
		console.error("Error deleting partner:", err);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 }
		);
	}
});
