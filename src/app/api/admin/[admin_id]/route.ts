import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { withAuth } from "@/utils/authMiddleware";

// GET Admin by ID
export const GET = withAuth(
	async (
		req,
		context: {
			params: {
				admin_id: string;
			};
		}
	) => {
		try {
			const supabase = createClient(cookies());

			const { admin_id } = context.params;
			const user = (req as any).user;

			if (user.role !== "super-admin" && user.id !== admin_id) {
				return NextResponse.json(
					{ error: "You can only access your own data" },
					{ status: 403 }
				);
			}

			const { data, error } = await supabase
				.from("admin")
				.select("admin_id, email")
				.eq("admin_id", admin_id)
				.single();

			if (error) throw error;

			return NextResponse.json(
				{
					message: `Admin ${admin_id} fetched successfully`,
					data,
				},
				{ status: 200 }
			);
		} catch (error) {
			return NextResponse.json(
				{ message: "Error fetching admin by ID" },
				{ status: 500 }
			);
		}
	},
	"super-admin"
);

// DELETE Admin by ID
export const DELETE = withAuth(
	async (
		req,
		context: {
			params: {
				admin_id: string;
			};
		}
	) => {
		try {
			const { admin_id } = context.params;

			const supabase = createClient(cookies());

			const { data, error } = await supabase
				.from("admin")
				.delete()
				.eq("admin_id", admin_id)
				.select("admin_id, email")
				.single();

			if (error) throw error;

			return NextResponse.json(
				{
					message: `Admin ${admin_id} deleted successfully`,
					data,
				},
				{ status: 200 }
			);
		} catch (error) {
			return NextResponse.json(
				{ message: "Error deleting admin by ID" },
				{ status: 500 }
			);
		}
	},
	"super-admin"
);

// UPDATE Admin by ID
export const PUT = withAuth(
	async (
		req,
		context: {
			params: {
				admin_id: string;
			};
		}
	) => {
		try {
			const supabase = createClient(cookies());

			const { admin_id } = context.params;
			const body = await req.json();

			const { password, email } = body;

			if (!password && !email) {
				return NextResponse.json(
					{ error: "Either password or email is required" },
					{ status: 400 }
				);
			}

			const updateData: any = {};

			if (password) {
				// console.log("[DEBUG] Plain Password:", password);
				const hashedPassword = await bcrypt.hash(password, 10);
				updateData.password = hashedPassword;
			}

			if (email) {
				updateData.email = email;
			}

			const { data, error } = await supabase
				.from("admin")
				.update(updateData)
				.eq("admin_id", admin_id)
				.select("admin_id, email")
				.single();

			if (error) {
				// Check for duplicate email error
				if ((error as any).code === "23505") {
					return NextResponse.json(
						{ error: "Admin with this email already exists" },
						{ status: 409 }
					);
				}
				throw error;
			}

			return NextResponse.json(
				{
					message: `Admin ${admin_id} updated successfully`,
					data,
				},
				{ status: 200 }
			);
		} catch (error) {
			console.error("Error updating admin:", error);
			return NextResponse.json(
				{ message: "Error updating admin by ID" },
				{ status: 500 }
			);
		}
	},
	"super-admin"
);
