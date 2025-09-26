import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { randomBytes } from "crypto";
import { withAuth } from "@/utils/authMiddleware";

// Random password generator
function generateRandomPassword(length = 12) {
	return randomBytes(Math.ceil(length * 0.75))
		.toString("base64")
		.replace(/[^a-zA-Z0-9]/g, "")
		.slice(0, length);
}

// CREATE Admin
export const POST = withAuth(async (req) => {
	try {
		const supabase = createClient(cookies());

		const body = await req.json();
		const { email } = body;

		if (!email) {
			return NextResponse.json(
				{ error: "Email is required" },
				{ status: 400 }
			);
		}

		const plainPassword = generateRandomPassword(12);
		const hashedPassword = await bcrypt.hash(plainPassword, 10);

		console.log("[DEBUG] Plain Password:", plainPassword);
		// console.log("[DEBUG] Hashed Password:", hashedPassword);

		const { data, error } = await supabase
			.from("admin")
			.insert([{ email, password: hashedPassword }])
			.select("admin_id, email")
			.single();

		if (error) {
			// cek duplicate (error 409)
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
				message: "Admin created successfully",
				data,
			},
			{ status: 201 }
		);
	} catch (error) {
		console.error("Error creating admin:", error);
		return NextResponse.json(
			{ message: "Error creating admin" },
			{ status: 500 }
		);
	}
}, "super-admin");

// GET All Admins
export const GET = withAuth(async (req) => {
	try {
		const supabase = createClient(cookies());

		const { data, error } = await supabase
			.from("admin")
			.select("admin_id, email");

		if (error) throw error;

		return NextResponse.json(
			{
				message: "Admins fetched successfully",
				data,
			},
			{ status: 200 }
		);
	} catch (error) {
		return NextResponse.json(
			{ message: "Error fetching admins" },
			{ status: 500 }
		);
	}
});
