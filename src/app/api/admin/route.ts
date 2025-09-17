import { NextRequest, NextResponse } from "next/server";

// CREATE Admin
export async function POST(req: NextRequest) {
	try {
		const body = await req.json();
		const { email } = body;

		// TODO: Create Admin in DB

		// Ini Dummy
		const dummyAdmin = {
			id: "dummy-id-123",
			email,
		};

		return NextResponse.json(
			{
				message: "Admin created successfully",
				data: dummyAdmin,
			},
			{ status: 201 }
		);
	} catch (error) {
		return NextResponse.json(
			{ message: "Error creating admin" },
			{ status: 500 }
		);
	}
}

// GET All Admins
export async function GET(req: NextRequest) {
	try {
		// TODO: Select All Admins from DB

		// Ini Dummy
		const dummyAdmins = [
			{
				id: "dummy-id-123",
				email: "admin@gmail.com",
			},
			{
				id: "dummy-id-456",
				email: "admin2@gmail.com",
			},
		];

		return NextResponse.json(
			{
				message: "Admins fetched successfully",
				data: dummyAdmins,
			},
			{ status: 200 }
		);
	} catch (error) {
		return NextResponse.json(
			{ message: "Error fetching admins" },
			{ status: 500 }
		);
	}
}
