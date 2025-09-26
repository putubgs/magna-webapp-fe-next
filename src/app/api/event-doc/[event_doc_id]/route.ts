import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { withAuth } from "@/utils/authMiddleware";

// GET Event Doc by ID
export const GET = withAuth(
	async (
		req: NextRequest,
		{ params }: { params: { event_doc_id: string } }
	) => {
		try {
			const supabase = createClient(cookies());
			const { event_doc_id } = params;

			const { data, error } = await supabase
				.from("event_documentation")
				.select("*")
				.eq("event_doc_id", event_doc_id)
				.single();

			if (error) {
				return NextResponse.json(
					{ error: error.message },
					{ status: 404 }
				);
			}

			return NextResponse.json(
				{
					message: `Event Doc fetched successfully`,
					data,
				},
				{ status: 200 }
			);
		} catch (error) {
			return NextResponse.json(
				{ error: "Failed to fetch event doc by ID" },
				{ status: 500 }
			);
		}
	}
);

// UPDATE Event Doc
export const PUT = withAuth(
	async (
		req: NextRequest,
		{ params }: { params: { event_doc_id: string } }
	) => {
		try {
			const supabase = createClient(cookies());
			const { event_doc_id } = params;
			const body = await req.json();

			const { data, error } = await supabase
				.from("event_documentation")
				.update(body)
				.eq("event_doc_id", event_doc_id)
				.select("*")
				.single();

			if (error) {
				return NextResponse.json(
					{ error: error.message },
					{ status: 500 }
				);
			}

			return NextResponse.json(
				{
					message: `Event Doc updated successfully`,
					data,
				},
				{ status: 200 }
			);
		} catch (error) {
			return NextResponse.json(
				{ error: "Failed to update event doc" },
				{ status: 500 }
			);
		}
	}
);

// DELETE Event Doc
export const DELETE = withAuth(
	async (
		req: NextRequest,
		{ params }: { params: { event_doc_id: string } }
	) => {
		try {
			const supabase = createClient(cookies());
			const { event_doc_id } = params;

			const { data, error } = await supabase
				.from("event_documentation")
				.delete()
				.eq("event_doc_id", event_doc_id)
				.select("*")
				.single();

			if (error) {
				return NextResponse.json(
					{ error: error.message },
					{ status: 500 }
				);
			}

			return NextResponse.json(
				{
					message: `Event Doc deleted successfully`,
					data,
				},
				{ status: 200 }
			);
		} catch (error) {
			return NextResponse.json(
				{ error: "Failed to delete event doc" },
				{ status: 500 }
			);
		}
	}
);
