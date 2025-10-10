import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { withAuth, AuthenticatedRequest } from "@/utils/authMiddleware";

// CREATE EVENT
export const POST = withAuth(async (req: AuthenticatedRequest) => {
	try {
		const supabase = createClient(cookies());
		const body = await req.json();

		const {
			organization_id,
			event_poster_url,
			title,
			description,
			gform_link,
			registration_deadline,
			event_start_date,
			event_end_date,
		} = body;

		const { data, error } = await supabase
			.from("event")
			.insert([
				{
					organization_id,
					event_poster_url,
					title,
					description,
					gform_link,
					registration_deadline,
					event_start_date,
					event_end_date,
				},
			])
			.select(
				`
					event_id,
					title,
					organization:organization_id ( organization_name ),
					event_start_date,
					event_end_date
				`
			)
			.single();

		if (error)
			return NextResponse.json({ error: error.message }, { status: 500 });

		return NextResponse.json(
			{ message: "Event created successfully", data },
			{ status: 201 }
		);
	} catch (err) {
		console.error("Error creating event:", err);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 }
		);
	}
});

// GET ALL EVENTS
export const GET = withAuth(async (req: AuthenticatedRequest) => {
	try {
		const supabase = createClient(cookies());

		const { data, error } = await supabase.from("event").select(
			`
					event_id,
					title,
					organization:organization_id ( organization_name ),
					event_start_date,
					event_end_date
				`
		);

		if (error)
			return NextResponse.json({ error: error.message }, { status: 500 });

		return NextResponse.json(
			{ message: "Fetched events", data },
			{ status: 200 }
		);
	} catch (err) {
		console.error("Error fetching events:", err);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 }
		);
	}
});
