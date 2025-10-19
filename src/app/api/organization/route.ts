import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { randomBytes } from "crypto";
import { withAuth, AuthenticatedRequest } from "@/utils/authMiddleware";
import { sendAdminCreationEmail } from "@/utils/email";

// Random password generator
function generateRandomPassword(length = 12) {
  return randomBytes(Math.ceil(length * 0.75))
    .toString("base64")
    .replace(/[^a-zA-Z0-9]/g, "")
    .slice(0, length);
}

// CREATE Organization (with optional admin creation)
export const POST = withAuth(async (req: AuthenticatedRequest) => {
  try {
    const supabase = createClient(cookies());
    const body = await req.json();
    const { organization_name, email } = body;

    if (!organization_name) {
      return NextResponse.json(
        { error: "Organization name is required" },
        { status: 400 }
      );
    }

    const superAdminId = req.user?.id;
    if (!superAdminId) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 }
      );
    }

    // Check if organization name already exists
    const { data: existingOrg, error: checkError } = await supabase
      .from("organization")
      .select("organization_id")
      .eq("organization_name", organization_name)
      .single();

    if (existingOrg) {
      return NextResponse.json(
        { error: "Organization with this name already exists" },
        { status: 409 }
      );
    }

    // If email is provided and not "-", create admin first
    let adminData = null;
    let plainPassword = null;
    let adminId = null;

    if (email && email !== "-") {
      // Check if admin email already exists
      const { data: existingAdmin } = await supabase
        .from("admin")
        .select("admin_id")
        .eq("email", email)
        .single();

      if (existingAdmin) {
        return NextResponse.json(
          {
            error: "Admin with this email already exists",
          },
          { status: 409 }
        );
      }

      // Generate password and create admin
      plainPassword = generateRandomPassword(12);
      const hashedPassword = await bcrypt.hash(plainPassword, 10);

      const { data: newAdmin, error: adminError } = await supabase
        .from("admin")
        .insert([
          {
            email,
            password: hashedPassword,
            super_admin_id: superAdminId,
          },
        ])
        .select("admin_id, email")
        .single();

      if (adminError) {
        console.error("Error creating admin:", adminError);
        return NextResponse.json(
          {
            error: "Failed to create admin",
            details: adminError.message,
          },
          { status: 500 }
        );
      }

      adminData = newAdmin;
      adminId = newAdmin.admin_id;
    }

    // Create organization with admin_id (if admin was created)
    const { data: orgData, error: orgError } = await supabase
      .from("organization")
      .insert([
        {
          organization_name,
          super_admin_id: superAdminId,
          admin_id: adminId,
        },
      ])
      .select()
      .single();

    if (orgError) {
      console.error("Error creating organization:", orgError);

      // If admin was created but org creation failed, delete the admin
      if (adminId) {
        await supabase.from("admin").delete().eq("admin_id", adminId);
      }

      return NextResponse.json(
        { error: "Failed to create organization" },
        { status: 500 }
      );
    }

    if (adminData && plainPassword) {
      const emailSent = await sendAdminCreationEmail(
        email,
        plainPassword,
        organization_name
      );
    }

    return NextResponse.json(
      {
        message: adminData
          ? "Organization and admin created successfully"
          : "Organization created successfully",
        organization: orgData,
        admin: adminData,
        ...(plainPassword && {
          credentials: {
            email,
            password: plainPassword,
          },
        }),
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in organization creation:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}, "super-admin");

// GET All Organizations
export const GET = withAuth(async (req: AuthenticatedRequest) => {
  try {
    const supabase = createClient(cookies());
    const superAdminId = req.user?.id;

    // Fetch all organizations (not filtered by super_admin_id)
    const { data: organizations, error: orgError } = await supabase
      .from("organization")
      .select("*")
      .order("created_at", { ascending: false });

    if (orgError) throw orgError;

    console.log(`📊 Found ${organizations?.length || 0} organizations`);

    // For each organization, check if it has admin_id and fetch the admin email
    // Also check if there are pending changes
    const organizationsWithAdmins = await Promise.all(
      (organizations || []).map(async (org) => {
        let admin = null;

        if (org.admin_id) {
          // Fetch the admin email for this organization
          const { data: adminData, error: adminError } = await supabase
            .from("admin")
            .select("admin_id, email")
            .eq("admin_id", org.admin_id)
            .single();

          if (!adminError && adminData) {
            console.log(
              `Org "${org.organization_name}" has admin: ${adminData.email}`
            );
            admin = adminData;
          } else {
            console.log(
              `Org "${org.organization_name}" has admin_id but admin not found`
            );
          }
        } else {
          console.log(`Org "${org.organization_name}" has NO admin_id`);
        }

        // Check for PENDING changes
        const { data: pendingChanges, error: pendingError } = await supabase
          .from("org_detail_changes")
          .select("*")
          .eq("organization_id", org.organization_id)
          .eq("request_status", "PENDING");

        // Check for REJECTED changes
        const { data: rejectedChanges, error: rejectedError } = await supabase
          .from("org_detail_changes")
          .select("*")
          .eq("organization_id", org.organization_id)
          .eq("request_status", "REJECTED");

        if (pendingError) {
          console.error(
            `Error fetching pending changes for ${org.organization_name}:`,
            pendingError
          );
        }
        if (rejectedError) {
          console.error(
            `Error fetching rejected changes for ${org.organization_name}:`,
            rejectedError
          );
        }

        const hasPendingChanges =
          !pendingError && pendingChanges && pendingChanges.length > 0;
        const hasRejectedChanges =
          !rejectedError && rejectedChanges && rejectedChanges.length > 0;

        // Get the created_at from the most recent change (pending takes priority)
        let requestDate = null;
        if (hasPendingChanges && pendingChanges[0]?.created_at) {
          requestDate = pendingChanges[0].created_at;
        } else if (hasRejectedChanges && rejectedChanges[0]?.created_at) {
          requestDate = rejectedChanges[0].created_at;
        }

        // Return org with admin, pending changes, rejected changes info, and request date
        return {
          ...org,
          admin,
          has_pending_changes: hasPendingChanges,
          has_rejected_changes: hasRejectedChanges,
          request_date: requestDate,
        };
      })
    );

    return NextResponse.json(
      {
        message: "Organizations fetched successfully",
        data: organizationsWithAdmins,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching organizations:", error);
    return NextResponse.json(
      { error: "Error fetching organizations" },
      { status: 500 }
    );
  }
}, "super-admin");
