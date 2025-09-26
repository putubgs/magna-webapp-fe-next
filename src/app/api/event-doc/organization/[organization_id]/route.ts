import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { withAuth } from "@/utils/authMiddleware";

// GET Event Docs by Organization ID
export const GET = withAuth(
	async (
		req: NextRequest,
		{ params }: { params: { organization_id: string } }
	) => {
		try {
			const supabase = createClient(cookies());
			const { organization_id } = params;

			const { data, error } = await supabase
				.from("event_documentation")
				.select("*")
				.eq("organization_id", organization_id);

			if (error) {
				return NextResponse.json(
					{ error: error.message },
					{ status: 500 }
				);
			}

			return NextResponse.json(
				{
					message: `Event Docs for organization fetched successfully`,
					data,
				},
				{ status: 200 }
			);
		} catch (error) {
			return NextResponse.json(
				{ error: "Failed to fetch event docs by organization ID" },
				{ status: 500 }
			);
		}
	},
	"super-admin"
);
