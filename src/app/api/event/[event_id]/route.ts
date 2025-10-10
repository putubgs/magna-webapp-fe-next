import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { withAuth, AuthenticatedRequest } from "@/utils/authMiddleware";

// GET EVENT BY ID
export const GET = withAuth(async (req: AuthenticatedRequest, context) => {
	try {
		const supabase = createClient(cookies());
		const { event_id } = context.params;

		const { data, error } = await supabase
			.from("event")
			.select(
				"event_id, title, description, event_poster_url, gform_link, event_start_date, event_end_date"
			)
			.eq("event_id", event_id)
			.single();

		if (error || !data)
			return NextResponse.json(
				{ error: "Event not found" },
				{ status: 404 }
			);

		return NextResponse.json(
			{ message: "Event fetched", data },
			{ status: 200 }
		);
	} catch (err) {
		console.error("Error fetching event:", err);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 }
		);
	}
});

// UPDATE EVENT
export const PATCH = withAuth(async (req: AuthenticatedRequest, context) => {
	try {
		const supabase = createClient(cookies());
		const { event_id } = context.params;

		// Check existing
		const { data: existing, error: findErr } = await supabase
			.from("event")
			.select(
				"event_id, title, description, event_poster_url, gform_link, registration_deadline, event_start_date, event_end_date"
			)
			.eq("event_id", event_id)
			.single();

		if (findErr || !existing)
			return NextResponse.json(
				{ error: "Event not found" },
				{ status: 404 }
			);

		const body = await req.json();

		const { data, error } = await supabase
			.from("event")
			.update({
				title: body.title ?? existing.title,
				description: body.description ?? existing.description,
				event_poster_url:
					body.event_poster_url ?? existing.event_poster_url,
				gform_link: body.gform_link ?? existing.gform_link,
				registration_deadline:
					body.registration_deadline ??
					existing.registration_deadline,
				event_start_date:
					body.event_start_date ?? existing.event_start_date,
				event_end_date: body.event_end_date ?? existing.event_end_date,
				updated_at: new Date().toISOString(),
			})
			.eq("event_id", event_id)
			.select("event_id, title")
			.single();
		if (error)
			return NextResponse.json({ error: error.message }, { status: 400 });

		return NextResponse.json(
			{ message: "Event updated successfully", data },
			{ status: 200 }
		);
	} catch (err) {
		console.error("Error updating event:", err);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 }
		);
	}
});

// DELETE EVENT
export const DELETE = withAuth(async (req: AuthenticatedRequest, context) => {
	try {
		const supabase = createClient(cookies());
		const { event_id } = context.params;

		const { data: existing, error: findErr } = await supabase
			.from("event")
			.select("event_id")
			.eq("event_id", event_id)
			.single();

		if (findErr || !existing)
			return NextResponse.json(
				{ error: "Event not found" },
				{ status: 404 }
			);

		const { error } = await supabase
			.from("event")
			.delete()
			.eq("event_id", event_id)
			.select("event_id, title")
			.single();

		if (error)
			return NextResponse.json({ error: error.message }, { status: 400 });

		return NextResponse.json(
			{ message: "Event deleted successfully" },
			{ status: 200 }
		);
	} catch (err) {
		console.error("Error deleting event:", err);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 }
		);
	}
});
