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

// UPDATE Admin Email for Organization
export const PATCH = withAuth(
  async (
    req: AuthenticatedRequest,
    context: { params: { organization_id: string } }
  ) => {
    try {
      const { organization_id } = context.params;
      const body = await req.json();
      const { email } = body;

      const supabase = createClient(cookies());
      const superAdminId = req.user?.id;

      if (!superAdminId) {
        return NextResponse.json(
          { error: "User not authenticated" },
          { status: 401 }
        );
      }

      if (!email || email === "") {
        return NextResponse.json(
          { error: "Email is required" },
          { status: 400 }
        );
      }

      // Get current organization data
      const { data: currentOrg, error: fetchError } = await supabase
        .from("organization")
        .select("*")
        .eq("organization_id", organization_id)
        .single();

      if (fetchError || !currentOrg) {
        return NextResponse.json(
          { error: "Organization not found" },
          { status: 404 }
        );
      }

      // If email is "-", remove admin association and delete admin
      if (email === "-") {
        if (currentOrg.admin_id) {
          const oldAdminId = currentOrg.admin_id;

          // First, remove the association
          const { error: updateError } = await supabase
            .from("organization")
            .update({ admin_id: null })
            .eq("organization_id", organization_id);

          if (updateError) {
            console.error("Error removing admin association:", updateError);
            return NextResponse.json(
              { error: "Failed to remove admin association" },
              { status: 500 }
            );
          }

          // Then, delete the admin account
          const { error: deleteAdminError } = await supabase
            .from("admin")
            .delete()
            .eq("admin_id", oldAdminId);

          if (deleteAdminError) {
            console.error("Error deleting admin account:", deleteAdminError);
            // Even if delete fails, the association is already removed
          }
        }

        return NextResponse.json(
          {
            message:
              "Admin association removed and admin account deleted successfully",
            organization: { ...currentOrg, admin_id: null },
          },
          { status: 200 }
        );
      }

      // Check if new email already exists
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

      // If organization already has an admin, delete the old one and create a new one
      if (currentOrg.admin_id) {
        const oldAdminId = currentOrg.admin_id;

        // Delete the old admin first
        const { error: deleteAdminError } = await supabase
          .from("admin")
          .delete()
          .eq("admin_id", oldAdminId);

        if (deleteAdminError) {
          console.error("Error deleting old admin:", deleteAdminError);
          return NextResponse.json(
            { error: "Failed to delete old admin" },
            { status: 500 }
          );
        }

        // Set admin_id to null temporarily
        await supabase
          .from("organization")
          .update({ admin_id: null })
          .eq("organization_id", organization_id);

        // Continue to create new admin below
      }

      // If organization doesn't have an admin, create a new one
      const plainPassword = generateRandomPassword(12);
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

      // Update organization with new admin_id
      const { error: updateOrgError } = await supabase
        .from("organization")
        .update({ admin_id: newAdmin.admin_id })
        .eq("organization_id", organization_id);

      if (updateOrgError) {
        console.error(
          "Error updating organization with admin_id:",
          updateOrgError
        );
        // Rollback: delete the created admin
        await supabase.from("admin").delete().eq("admin_id", newAdmin.admin_id);
        return NextResponse.json(
          { error: "Failed to associate admin with organization" },
          { status: 500 }
        );
      }

      // Send email with credentials
      const emailSent = await sendAdminCreationEmail(
        email,
        plainPassword,
        currentOrg.organization_name
      );

      if (!emailSent) {
        console.error("Failed to send admin credentials email");
      }

      return NextResponse.json(
        {
          message: "Admin created and associated successfully",
          admin: newAdmin,
          credentials: {
            email,
            password: plainPassword,
          },
        },
        { status: 200 }
      );
    } catch (error) {
      console.error("Error updating admin email:", error);
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 }
      );
    }
  },
  "super-admin"
);
