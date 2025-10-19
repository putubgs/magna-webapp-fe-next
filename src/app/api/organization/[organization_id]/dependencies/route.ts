import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { withAuth, AuthenticatedRequest } from "@/utils/authMiddleware";

// GET Organization Dependencies
export const GET = withAuth(
  async (
    req: AuthenticatedRequest,
    context: { params: { organization_id: string } }
  ) => {
    try {
      const { organization_id } = context.params;
      const supabase = createClient(cookies());

      // Check all tables that reference organization_id
      const dependencies: any = {
        testimony: 0,
        event: 0,
        event_documentation: 0,
        org_impact: 0,
        org_detail_changes: 0,
        organization_partner: 0,
      };

      // Check testimony table
      const { data: testimonies, error: testimonyError } = await supabase
        .from("testimony")
        .select("testimony_id", { count: "exact", head: true })
        .eq("organization_id", organization_id);

      if (!testimonyError) {
        dependencies.testimony = testimonies?.length || 0;
      }

      // Check event table
      const { data: events, error: eventError } = await supabase
        .from("event")
        .select("event_id", { count: "exact", head: true })
        .eq("organization_id", organization_id);

      if (!eventError) {
        dependencies.event = events?.length || 0;
      }

      // Check event_documentation table
      const { data: eventDocs, error: eventDocError } = await supabase
        .from("event_documentation")
        .select("event_doc_id", { count: "exact", head: true })
        .eq("organization_id", organization_id);

      if (!eventDocError) {
        dependencies.event_documentation = eventDocs?.length || 0;
      }

      // Check org_impact table
      const { data: orgImpacts, error: orgImpactError } = await supabase
        .from("org_impact")
        .select("impact_id", { count: "exact", head: true })
        .eq("organization", organization_id);

      if (!orgImpactError) {
        dependencies.org_impact = orgImpacts?.length || 0;
      }

      // Check org_detail_changes table
      const { data: orgChanges, error: orgChangesError } = await supabase
        .from("org_detail_changes")
        .select("org_detail_changes_id", { count: "exact", head: true })
        .eq("organization_id", organization_id);

      if (!orgChangesError) {
        dependencies.org_detail_changes = orgChanges?.length || 0;
      }

      // Check organization_partner table
      const { data: orgPartners, error: orgPartnerError } = await supabase
        .from("organization_partner")
        .select("organization_id", { count: "exact", head: true })
        .eq("organization_id", organization_id);

      if (!orgPartnerError) {
        dependencies.organization_partner = orgPartners?.length || 0;
      }

      // Calculate total dependencies
      const totalDependencies = Object.values(dependencies).reduce(
        (sum: number, count: any) => sum + count,
        0
      );

      return NextResponse.json(
        {
          dependencies,
          totalDependencies,
          hasDependencies: totalDependencies > 0,
        },
        { status: 200 }
      );
    } catch (error) {
      console.error("Error checking dependencies:", error);
      return NextResponse.json(
        { error: "Failed to check dependencies" },
        { status: 500 }
      );
    }
  },
  "super-admin"
);
