"use client";
import { ChevronDown, PencilIcon, Search, Trash2, UserX } from "lucide-react";
import { AdminCalendarIcon } from "../icons/adminCalendarIcon";
import { LeftChevronIcon } from "../icons/leftChevronIcon";
import { useState, useEffect } from "react";
import SuperAdminPopUp from "../adminPopUpComponents/superAdminPopUp";
import DangerPopUp from "../dialog/dangerPopUp";
import RequestedDataPopUp from "../adminDetailPopUpComponents/requestedDataPopUp";

type SuperAdminProps = {
  organizationName: string;
  emailAdmin: string;
};

type OrganizationData = {
  organization_id: string;
  organization_name: string;
  super_admin_id: string;
  created_at: string;
  admin_id: string | null;
  admin: {
    admin_id: string;
    email: string;
  } | null;
  has_pending_changes?: boolean;
  has_rejected_changes?: boolean;
  request_date?: string | null;
};

export default function SuperAdmin() {
  const [superAdminPopUp, setSuperAdminPopUp] = useState<boolean>(false);
  const [organizations, setOrganizations] = useState<OrganizationData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [editData, setEditData] = useState<any>(null);
  const [deletePopUp, setDeletePopUp] = useState<boolean>(false);
  const [selectedOrgToDelete, setSelectedOrgToDelete] =
    useState<OrganizationData | null>(null);
  const [dependencies, setDependencies] = useState<any>(null);
  const [checkingDependencies, setCheckingDependencies] =
    useState<boolean>(false);
  const [requestedDataPopUp, setRequestedDataPopUp] = useState<boolean>(false);
  const [selectedOrgForRequest, setSelectedOrgForRequest] =
    useState<OrganizationData | null>(null);

  // Fetch organizations on mount
  useEffect(() => {
    fetchOrganizations();
  }, []);

  async function fetchOrganizations() {
    try {
      const response = await fetch("/api/organization");
      const data = await response.json();

      if (response.ok) {
        setOrganizations(data.data || []);
      }
    } catch (error) {
      console.error("Error fetching organizations:", error);
    } finally {
      setLoading(false);
    }
  }

  function handleSuperAdmin(superAdminData: SuperAdminProps) {
    // Refresh the organizations list
    fetchOrganizations();
    setEditData(null);
  }

  function handleEdit(org: OrganizationData) {
    setEditData(org);
    setSuperAdminPopUp(true);
  }

  function handleClosePopup() {
    setSuperAdminPopUp(false);
    setEditData(null);
  }

  async function handleDeleteClick(org: OrganizationData) {
    setSelectedOrgToDelete(org);
    setCheckingDependencies(true);

    try {
      // Check dependencies before showing popup
      const response = await fetch(
        `/api/organization/${org.organization_id}/dependencies`
      );
      const data = await response.json();

      if (response.ok) {
        setDependencies(data);
        setDeletePopUp(true);
      } else {
        console.error("Failed to check dependencies");
        alert("Failed to check dependencies. Please try again.");
      }
    } catch (error) {
      console.error("Error checking dependencies:", error);
      alert("An error occurred while checking dependencies.");
    } finally {
      setCheckingDependencies(false);
    }
  }

  async function handleConfirmDelete() {
    if (!selectedOrgToDelete) return;

    try {
      const response = await fetch(
        `/api/organization/${selectedOrgToDelete.organization_id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        // Refresh the organizations list
        fetchOrganizations();
        setDeletePopUp(false);
        setSelectedOrgToDelete(null);
      } else {
        const data = await response.json();
        console.error("Failed to delete organization:", data.error);
        alert(`Failed to delete: ${data.error}`);
      }
    } catch (error) {
      console.error("Error deleting organization:", error);
      alert("An error occurred while deleting");
    }
  }

  function handleCancelDelete() {
    setDeletePopUp(false);
    setSelectedOrgToDelete(null);
    setDependencies(null);
  }

  function handleStatusClick(org: OrganizationData) {
    setSelectedOrgForRequest(org);
    setRequestedDataPopUp(true);
  }

  function handleCloseRequestedDataPopup() {
    setRequestedDataPopUp(false);
    setSelectedOrgForRequest(null);
  }

  async function handleApprove(organizationId: string) {
    try {
      const response = await fetch(
        `/api/organization/${organizationId}/approve`,
        {
          method: "POST",
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert(
          `Changes approved successfully! ${data.appliedChanges} changes applied.`
        );
        // Refresh the list and close popup
        fetchOrganizations();
        handleCloseRequestedDataPopup();
      } else {
        console.error("Failed to approve:", data.error);
        alert(`Failed to approve changes: ${data.error}`);
      }
    } catch (error) {
      console.error("Error approving organization:", error);
      alert("An error occurred while approving");
    }
  }

  async function handleReject(organizationId: string, feedback: string) {
    try {
      const response = await fetch(
        `/api/organization/${organizationId}/reject`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ feedback }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert(
          `Changes rejected successfully. ${data.rejectedChanges} changes marked as rejected.`
        );
        // Refresh the list and close popup
        fetchOrganizations();
        handleCloseRequestedDataPopup();
      } else {
        console.error("Failed to reject:", data.error);
        alert(`Failed to reject changes: ${data.error}`);
      }
    } catch (error) {
      console.error("Error rejecting organization:", error);
      alert("An error occurred while rejecting");
    }
  }

  function buildDeleteMessage() {
    if (!selectedOrgToDelete || !dependencies) return "";

    const orgName = selectedOrgToDelete.organization_name;
    const deps = dependencies.dependencies;

    let message = `Are you sure you want to delete "${orgName}"?\n\n`;

    if (dependencies.hasDependencies) {
      message +=
        "⚠️ WARNING: The following data will also be PERMANENTLY deleted:\n\n";

      if (deps.testimony > 0)
        message += `• ${deps.testimony} Testimony record${
          deps.testimony > 1 ? "s" : ""
        }\n`;
      if (deps.event > 0)
        message += `• ${deps.event} Event${deps.event > 1 ? "s" : ""}\n`;
      if (deps.event_documentation > 0)
        message += `• ${deps.event_documentation} Event Documentation${
          deps.event_documentation > 1 ? "s" : ""
        }\n`;
      if (deps.org_impact > 0)
        message += `• ${deps.org_impact} Organization Impact${
          deps.org_impact > 1 ? "s" : ""
        }\n`;
      if (deps.org_detail_changes > 0)
        message += `• ${deps.org_detail_changes} Detail Change${
          deps.org_detail_changes > 1 ? "s" : ""
        }\n`;
      if (deps.organization_partner > 0)
        message += `• ${deps.organization_partner} Partner Relationship${
          deps.organization_partner > 1 ? "s" : ""
        }\n`;

      if (selectedOrgToDelete.admin) {
        message += `• 1 Admin Account (${selectedOrgToDelete.admin.email})\n`;
      }

      message += `\nTotal: ${dependencies.totalDependencies} related record${
        dependencies.totalDependencies > 1 ? "s" : ""
      } will be deleted.\n\n`;
      message += "This action CANNOT be undone!";
    } else {
      if (selectedOrgToDelete.admin) {
        message += `This will also delete the associated admin account (${selectedOrgToDelete.admin.email}).\n\n`;
      }
      message += "This action cannot be undone.";
    }

    return message;
  }

  return (
    <>
      <section className="bg-black border border-[#404040] p-[20px] rounded-[12px] space-y-[24px]">
        <section className="flex justify-between items-center">
          <h1 className="text-lg lg:text-2xl font-semibold">
            Admin Management Panel
          </h1>
          <button
            onClick={() => setSuperAdminPopUp(true)}
            className="cursor-pointer bg-primary text-sm lg:text-base p-[16px] rounded-[8px]"
          >
            Add Admin +
          </button>
        </section>
        <section className="grid grid-cols-12 gap-x-[20px]">
          <div className="col-span-9 flex items-center bg-neutral-800 gap-[10px] p-[12px] rounded-[8px]">
            <Search />
            <input
              className="w-full h-full text-white placeholder-white outline-none"
              type="text"
              placeholder="Search"
            />
          </div>
          <div className="col-span-1 bg-neutral-800 flex justify-center items-center gap-x-[10px] rounded-[8px]">
            <p>Date</p>
            <AdminCalendarIcon className="w-5 h-5" color="#fff" />
          </div>
          <div className="col-span-2 bg-neutral-800 flex justify-center items-center gap-x-[10px] rounded-[8px]">
            <p>Organization</p>
            <ChevronDown />
          </div>
        </section>
      </section>
      <section className="h-full bg-black flex flex-col border border-[#404040] p-[28px] rounded-[20px] gap-[28px]">
        <h1 className="text-2xl font-semibold">Admin Database</h1>
        <div
          className="overflow-x-auto magna-scrollbar"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "var(--color-primary-default) #262626",
          }}
        >
          <style
            dangerouslySetInnerHTML={{
              __html: `
            .magna-scrollbar::-webkit-scrollbar {
              height: 8px;
            }
            .magna-scrollbar::-webkit-scrollbar-track {
              background: #262626;
              border-radius: 4px;
            }
            .magna-scrollbar::-webkit-scrollbar-thumb {
              background: var(--color-primary-default);
              border-radius: 4px;
            }
            .magna-scrollbar::-webkit-scrollbar-thumb:hover {
              background: var(--color-primary-light);
            }
          `,
            }}
          />
          <table className="table-auto w-full min-w-[1400px] text-white">
            <thead>
              <tr className="border-b border-[#D4D4D4] text-left">
                <th className="text-base lg:text-lg font-bold py-3 px-6">No</th>
                <th className="text-base lg:text-lg font-bold py-3 px-6">
                  Organization Name
                </th>
                <th className="text-base lg:text-lg font-bold py-3 px-6">
                  Email
                </th>
                <th className="text-base lg:text-lg font-bold py-3 px-6">
                  Founded Date
                </th>
                <th className="text-base lg:text-lg font-bold py-3 px-6">
                  Status
                </th>
                <th className="text-base lg:text-lg font-bold py-3 px-6">
                  Date of Request
                </th>
                <th className="text-base lg:text-lg font-bold py-3 px-6">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="relative">
              {loading ? (
                <tr className="h-[250px]">
                  <td colSpan={7}>
                    <div className="flex flex-col justify-center items-center text-white">
                      <h1 className="text-xl lg:text-3xl font-black">
                        Loading...
                      </h1>
                    </div>
                  </td>
                </tr>
              ) : organizations && organizations.length > 0 ? (
                organizations.map((org, index) => (
                  <tr
                    key={org.organization_id}
                    className="border-b border-[#D4D4D4]"
                  >
                    <td className="py-4 px-6 align-middle text-base font-medium">
                      {index + 1}
                    </td>
                    <td className="py-4 px-6 align-middle text-base font-medium">
                      {org.organization_name}
                    </td>
                    <td className="py-4 px-6 align-middle">
                      <p className="text-base font-medium leading-tight">
                        {org.admin?.email || "-"}
                      </p>
                    </td>
                    <td className="py-4 px-6 align-middle text-base font-normal whitespace-nowrap">
                      {new Date(org.created_at).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </td>
                    <td className="py-4 px-6 align-middle">
                      {org.has_pending_changes ? (
                        <div
                          onClick={() => handleStatusClick(org)}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-orange-500 cursor-pointer hover:bg-orange-500/10 transition-colors"
                        >
                          <span className="text-orange-500 text-lg">⏱</span>
                          <span className="text-orange-500 font-medium">
                            Waiting
                          </span>
                        </div>
                      ) : org.has_rejected_changes ? (
                        <div
                          onClick={() => handleStatusClick(org)}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-red-500 cursor-pointer hover:bg-red-500/10 transition-colors"
                        >
                          <span className="text-red-500 text-lg">✗</span>
                          <span className="text-red-500 font-medium">
                            Rejected
                          </span>
                        </div>
                      ) : org.admin ? (
                        <div
                          onClick={() => handleStatusClick(org)}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-green-500 cursor-pointer hover:bg-green-500/10 transition-colors"
                        >
                          <span className="text-green-500 text-lg">✓</span>
                          <span className="text-green-500 font-medium">
                            Approved
                          </span>
                        </div>
                      ) : (
                        <div
                          onClick={() => handleStatusClick(org)}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-500 cursor-pointer hover:bg-gray-500/10 transition-colors"
                        >
                          <UserX className="text-gray-500" size={18} />
                          <span className="text-gray-500 font-medium">
                            No Account
                          </span>
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-6 align-middle text-base font-normal whitespace-nowrap">
                      {org.request_date
                        ? new Date(org.request_date).toLocaleDateString(
                            "en-US",
                            {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            }
                          )
                        : "-"}
                    </td>
                    <td className="py-4 px-6 align-middle">
                      <div className="flex items-center gap-x-[16px]">
                        <div
                          onClick={() => handleEdit(org)}
                          className="cursor-pointer w-[34px] h-[34px] flex justify-center items-center border border-[#FF8800] p-[8px] rounded-[8px]"
                        >
                          <PencilIcon width={18} height={18} color="#FF8800" />
                        </div>
                        <div
                          onClick={() => handleDeleteClick(org)}
                          className="cursor-pointer w-[34px] h-[34px] flex justify-center items-center border border-red-500 p-[8px] rounded-[8px]"
                        >
                          <Trash2 width={18} height={18} color="#EF4444" />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="h-[250px]">
                  <td colSpan={7}>
                    <div className="flex flex-col justify-center items-center text-white">
                      <h1 className="text-xl lg:text-3xl font-black">
                        NO DATA
                      </h1>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <section
          className={`absolute right-3 -bottom-20 ${
            organizations && organizations.length > 0 ? "flex" : "hidden"
          } justify-end items-center gap-2`}
        >
          <button className="h-full bg-[#1c1c1c] text-white px-3 py-1 rounded-md border border-white/20">
            <LeftChevronIcon width={23} height={23} color="white" />
          </button>
          <div className="bg-[#1c1c1c] text-white px-3 py-1 rounded-md border border-white/20 appearance-none">
            <select className="bg-none p-0">
              <option className="bg-none p-0">1</option>
            </select>
          </div>
          <p className="text-white">of 1</p>
          <button className="h-full bg-[#1c1c1c] text-white px-3 py-1 rounded-md border border-white/20 rotate-180">
            <LeftChevronIcon width={23} height={23} color="white" />
          </button>
        </section>
      </section>

      <SuperAdminPopUp
        open={superAdminPopUp}
        close={handleClosePopup}
        save={handleSuperAdmin}
        editData={editData}
      />

      <DangerPopUp
        open={deletePopUp}
        close={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title={
          dependencies?.hasDependencies
            ? "⚠️ Delete Organization & Related Data"
            : "Delete Organization"
        }
        message={buildDeleteMessage()}
      />

      <RequestedDataPopUp
        open={requestedDataPopUp}
        close={handleCloseRequestedDataPopup}
        approve={handleApprove}
        reject={handleReject}
        data={
          selectedOrgForRequest
            ? {
                organization_id: selectedOrgForRequest.organization_id,
                organization_name: selectedOrgForRequest.organization_name,
                admin_email: selectedOrgForRequest.admin?.email,
                created_at: selectedOrgForRequest.created_at,
                admin_id: selectedOrgForRequest.admin_id,
                has_pending_changes: selectedOrgForRequest.has_pending_changes,
                has_rejected_changes:
                  selectedOrgForRequest.has_rejected_changes,
              }
            : null
        }
      />
    </>
  );
}
