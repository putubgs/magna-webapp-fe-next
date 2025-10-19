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

// GET Organization by ID
export const GET = withAuth(
  async (
    req: AuthenticatedRequest,
    context: { params: { organization_id: string } }
  ) => {
    try {
      const { organization_id } = context.params;
      const supabase = createClient(cookies());

      const { data: org, error } = await supabase
        .from("organization")
        .select("*")
        .eq("organization_id", organization_id)
        .single();

      if (error) {
        return NextResponse.json(
          { error: "Organization not found" },
          { status: 404 }
        );
      }

      // If organization has admin_id, fetch the admin
      let admin = null;
      if (org.admin_id) {
        const { data: adminData, error: adminError } = await supabase
          .from("admin")
          .select("admin_id, email")
          .eq("admin_id", org.admin_id)
          .single();

        if (!adminError && adminData) {
          admin = adminData;
        }
      }

      return NextResponse.json(
        {
          message: "Organization fetched successfully",
          data: {
            ...org,
            admin,
          },
        },
        { status: 200 }
      );
    } catch (error) {
      console.error("Error fetching organization:", error);
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 }
      );
    }
  },
  "super-admin"
);

// UPDATE Organization
export const PUT = withAuth(
  async (
    req: AuthenticatedRequest,
    context: { params: { organization_id: string } }
  ) => {
    try {
      const { organization_id } = context.params;
      const body = await req.json();
      const { organization_name, email } = body;

      const supabase = createClient(cookies());
      const superAdminId = req.user?.id;

      if (!superAdminId) {
        return NextResponse.json(
          { error: "User not authenticated" },
          { status: 401 }
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

      // Check if organization name is being changed and if new name already exists
      if (
        organization_name &&
        organization_name !== currentOrg.organization_name
      ) {
        const { data: existingOrg } = await supabase
          .from("organization")
          .select("organization_id")
          .eq("organization_name", organization_name)
          .neq("organization_id", organization_id)
          .single();

        if (existingOrg) {
          return NextResponse.json(
            { error: "Organization with this name already exists" },
            { status: 409 }
          );
        }
      }

      // Update organization name if provided
      const updateData: any = {};
      if (organization_name) updateData.organization_name = organization_name;

      const { data: orgData, error: orgError } = await supabase
        .from("organization")
        .update(updateData)
        .eq("organization_id", organization_id)
        .select()
        .single();

      if (orgError) {
        console.error("Error updating organization:", orgError);
        return NextResponse.json(
          { error: "Failed to update organization" },
          { status: 500 }
        );
      }

      let adminData = null;
      let plainPassword = null;

      // If email is provided and changed from "-", create admin and link it
      if (email && email !== "-") {
        // Check if admin with this email already exists
        const { data: existingAdmin } = await supabase
          .from("admin")
          .select("admin_id")
          .eq("email", email)
          .single();

        if (existingAdmin) {
          return NextResponse.json(
            {
              warning:
                "Organization updated but admin with this email already exists",
              organization: orgData,
            },
            { status: 207 }
          );
        }

        // Create new admin
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
              warning: "Organization updated but admin creation failed",
              organization: orgData,
              error: adminError.message,
            },
            { status: 207 }
          );
        }

        adminData = newAdmin;

        // Update organization with admin_id
        const { error: updateAdminError } = await supabase
          .from("organization")
          .update({ admin_id: newAdmin.admin_id })
          .eq("organization_id", organization_id);

        if (updateAdminError) {
          console.error(
            "Error updating organization with admin_id:",
            updateAdminError
          );
        }
      }

      return NextResponse.json(
        {
          message: adminData
            ? "Organization updated and admin created successfully"
            : "Organization updated successfully",
          organization: orgData,
          admin: adminData,
          ...(plainPassword && {
            credentials: {
              email,
              password: plainPassword,
            },
          }),
        },
        { status: 200 }
      );
    } catch (error) {
      console.error("Error updating organization:", error);
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 }
      );
    }
  },
  "super-admin"
);

// DELETE Organization
export const DELETE = withAuth(
  async (
    req: AuthenticatedRequest,
    context: { params: { organization_id: string } }
  ) => {
    try {
      const { organization_id } = context.params;
      const supabase = createClient(cookies());

      // First, get the organization to check if it has an admin_id
      const { data: org, error: fetchError } = await supabase
        .from("organization")
        .select("*")
        .eq("organization_id", organization_id)
        .single();

      if (fetchError || !org) {
        return NextResponse.json(
          { error: "Organization not found" },
          { status: 404 }
        );
      }

      // Delete all dependent data first (cascading delete)
      const deletionLog: any = {
        organization: org.organization_name,
        admin: false,
        testimony: 0,
        event: 0,
        event_documentation: 0,
        org_impact: 0,
        org_detail_changes: 0,
        organization_partner: 0,
        metric_detail: 0,
      };

      // 1. Delete testimonies
      const { data: deletedTestimonies, error: testimonyError } = await supabase
        .from("testimony")
        .delete()
        .eq("organization_id", organization_id)
        .select();

      if (!testimonyError && deletedTestimonies) {
        deletionLog.testimony = deletedTestimonies.length;
      }

      // 2. Delete events
      const { data: deletedEvents, error: eventError } = await supabase
        .from("event")
        .delete()
        .eq("organization_id", organization_id)
        .select();

      if (!eventError && deletedEvents) {
        deletionLog.event = deletedEvents.length;
      }

      // 3. Delete event documentations
      const { data: deletedEventDocs, error: eventDocError } = await supabase
        .from("event_documentation")
        .delete()
        .eq("organization_id", organization_id)
        .select();

      if (!eventDocError && deletedEventDocs) {
        deletionLog.event_documentation = deletedEventDocs.length;
        console.log(
          `Deleted ${deletedEventDocs.length} event documentations`
        );
      }

      // 4. Delete org impacts and their metric details
      const { data: orgImpacts } = await supabase
        .from("org_impact")
        .select("impact_id")
        .eq("organization", organization_id);

      if (orgImpacts && orgImpacts.length > 0) {
        const impactIds = orgImpacts.map((impact) => impact.impact_id);

        // Delete metric details first
        const { data: deletedMetrics, error: metricError } = await supabase
          .from("metric_detail")
          .delete()
          .in("impact_id", impactIds)
          .select();

        if (!metricError && deletedMetrics) {
          deletionLog.metric_detail = deletedMetrics.length;
        }

        // Delete org impacts
        const { data: deletedImpacts, error: impactError } = await supabase
          .from("org_impact")
          .delete()
          .eq("organization", organization_id)
          .select();

        if (!impactError && deletedImpacts) {
          deletionLog.org_impact = deletedImpacts.length;
        }
      }

      // 5. Delete org detail changes
      const { data: deletedChanges, error: changesError } = await supabase
        .from("org_detail_changes")
        .delete()
        .eq("organization_id", organization_id)
        .select();

      if (!changesError && deletedChanges) {
        deletionLog.org_detail_changes = deletedChanges.length;
      }

      // 6. Delete organization partners
      const { data: deletedPartners, error: partnerError } = await supabase
        .from("organization_partner")
        .delete()
        .eq("organization_id", organization_id)
        .select();

      if (!partnerError && deletedPartners) {
        deletionLog.organization_partner = deletedPartners.length
      }

      // 7. If organization has an admin_id, delete the admin
      if (org.admin_id) {
        const { error: adminDeleteError } = await supabase
          .from("admin")
          .delete()
          .eq("admin_id", org.admin_id);

        if (adminDeleteError) {
          console.error("Error deleting admin:", adminDeleteError);
        } else {
          deletionLog.admin = true;
        }
      } else {
        console.log("ℹNo admin associated with this organization");
      }

      // 8. Finally, delete the organization
      const { error: orgDeleteError } = await supabase
        .from("organization")
        .delete()
        .eq("organization_id", organization_id);

      if (orgDeleteError) {
        console.error("Error deleting organization:", orgDeleteError);
        return NextResponse.json(
          { error: "Failed to delete organization" },
          { status: 500 }
        );
      }

      console.log("✅ Organization deleted successfully");
      console.log("📊 Deletion summary:", deletionLog);

      return NextResponse.json(
        {
          message: "Organization and all related data deleted successfully",
          deletionLog,
        },
        { status: 200 }
      );
    } catch (error) {
      console.error("Error deleting organization:", error);
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 }
      );
    }
  },
  "super-admin"
);
