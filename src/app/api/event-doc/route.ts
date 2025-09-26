import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { withAuth } from "@/utils/authMiddleware";

// CREATE Event Doc (prev event gallery)
export const POST = withAuth(async (req: NextRequest) => {
	try {
		const supabase = createClient(cookies());
		const body = await req.json();

		const { data, error } = await supabase
			.from("event_documentation")
			.insert(body)
			.select("*")
			.single();

		if (error) {
			return NextResponse.json({ error: error.message }, { status: 500 });
		}

		return NextResponse.json(
			{ message: "Event Doc created successfully", data },
			{ status: 201 }
		);
	} catch (error) {
		return NextResponse.json(
			{ error: "Failed to create event doc" },
			{ status: 500 }
		);
	}
});
