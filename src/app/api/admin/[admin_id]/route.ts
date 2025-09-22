import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

// GET Admin by ID
export async function GET(
	req: NextRequest,
	{
		params,
	}: {
		params: {
			admin_id: string;
		};
	}
) {
	try {
		const supabase = createClient(cookies());

		const { admin_id } = params;

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
}

// DELETE Admin by ID
export async function DELETE(
	req: NextRequest,
	{
		params,
	}: {
		params: {
			admin_id: string;
		};
	}
) {
	try {
		const { admin_id } = params;

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
}

// UPDATE Admin by ID
export async function PUT(
	req: NextRequest,
	{
		params,
	}: {
		params: {
			admin_id: string;
		};
	}
) {
	try {
		const supabase = createClient(cookies());

		const { admin_id } = params;
		const body = await req.json();

		const { password } = body;

		if (!password) {
			return NextResponse.json(
				{ error: "Password is required" },
				{ status: 400 }
			);
		}

		// console.log("[DEBUG] Plain Password:", password);
		const hashedPassword = await bcrypt.hash(password, 10);

		const { data, error } = await supabase
			.from("admin")
			.update({ password: hashedPassword })
			.eq("admin_id", admin_id)
			.select("admin_id, email")
			.single();

		if (error) throw error;

		return NextResponse.json(
			{
				message: `Admin ${admin_id} password updated successfully`,
				data,
			},
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error updating admin password:", error);
		return NextResponse.json(
			{ message: "Error updating admin by ID" },
			{ status: 500 }
		);
	}
}
