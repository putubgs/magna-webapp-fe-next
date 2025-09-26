import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { AuthenticatedRequest, withAuth } from "@/utils/authMiddleware";

// GET Organization by ID
export const GET = withAuth(
	async (
		req: AuthenticatedRequest,
		{ params }: { params: { organization_id: string } }
	) => {
		try {
			const supabase = createClient(cookies());
			const { organization_id } = params;

			const { data, error } = await supabase
				.from("organization")
				.select("*")
				.eq("organization_id", organization_id)
				.single();

			if (error) {
				return NextResponse.json(
					{ error: error.message },
					{ status: 404 }
				);
			}

			return NextResponse.json(
				{
					message: `Success fetch org by id ${organization_id}`,
					data,
				},
				{ status: 200 }
			);
		} catch (error) {
			console.error("Error fetching org:", error);
			return NextResponse.json(
				{ error: "Failed to fetch organization by id" },
				{ status: 500 }
			);
		}
	},
	"super-admin"
);

// DELETE Organization by ID
export const DELETE = withAuth(
	async (
		req: AuthenticatedRequest,
		{ params }: { params: { organization_id: string } }
	) => {
		try {
			const supabase = createClient(cookies());
			const { organization_id } = params;

			const { error } = await supabase
				.from("organization")
				.delete()
				.eq("organization_id", organization_id);

			if (error) {
				return NextResponse.json(
					{ error: error.message },
					{ status: 500 }
				);
			}

			return NextResponse.json(
				{
					message: `Organization ${organization_id} deleted successfully`,
				},
				{ status: 200 }
			);
		} catch (error) {
			console.error("Error deleting org:", error);
			return NextResponse.json(
				{ error: "Failed to delete organization" },
				{ status: 500 }
			);
		}
	}
);

// UPDATE Organization by ID
export const PUT = withAuth(
	async (
		req: AuthenticatedRequest,
		{ params }: { params: { organization_id: string } }
	) => {
		try {
			const supabase = createClient(cookies());
			const { organization_id } = params;
			const body = await req.json();

			const { data, error } = await supabase
				.from("organization")
				.update(body)
				.eq("organization_id", organization_id)
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
					message: `Organization ${organization_id} updated successfully`,
					data,
				},
				{ status: 200 }
			);
		} catch (error) {
			console.error("Error updating org:", error);
			return NextResponse.json(
				{ error: "Failed to update organization" },
				{ status: 500 }
			);
		}
	}
);
