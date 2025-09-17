import { NextRequest, NextResponse } from "next/server";

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
		const { admin_id } = params;

		// TODO : Select Admin by ID from DB

		// Ini Dummy
		const dummyAdmin = {
			admin_id,
			email: "admin@gmail.com",
		};

		return NextResponse.json(
			{
				message: `Admin ${admin_id} fetched successfully`,
				data: dummyAdmin,
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

		// TODO : Delete Admin by ID from DB

		return NextResponse.json(
			{
				message: `Admin ${admin_id} deleted successfully`,
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
		const { admin_id } = params;
		const body = await req.json();

		// TODO : Update Admin by ID from DB

		// Ini Dummy
		const dummyUpdatedAdmin = {
			admin_id,
			...body,
		};

		return NextResponse.json(
			{
				message: `Admin ${admin_id} updated successfully`,
				data: dummyUpdatedAdmin,
			},
			{ status: 200 }
		);
	} catch (error) {
		return NextResponse.json(
			{ message: "Error updating admin by ID" },
			{ status: 500 }
		);
	}
}
