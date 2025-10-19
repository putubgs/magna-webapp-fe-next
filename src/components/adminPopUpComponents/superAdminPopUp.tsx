"use client";
import { FormEvent, useState, useEffect } from "react";
import ExitIcon from "../icons/exitIcon";
import { InformationIcon } from "../icons/informationIcon";
import DangerPopUp from "../dialog/dangerPopUp";
import InputField from "../adminComponents/inputField";
import { ChevronDown } from "lucide-react";

type SuperAdminProps = {
  organizationName: string;
  emailAdmin: string;
};

type SuperAdminPopUpProps = {
  open: boolean;
  close: () => void;
  save: (superAdminData: SuperAdminProps) => void;
  editData?: {
    organization_id: string;
    organization_name: string;
    email?: string;
    admin?: {
      admin_id: string;
      email: string;
    } | null;
    has_pending_changes?: boolean;
  } | null;
};

export default function SuperAdminPopUp({
  open,
  close,
  save,
  editData = null,
}: SuperAdminPopUpProps) {
  const [organizationName, setOrganization] = useState<string>("");
  const [emailAdmin, setEmailAdmin] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const formComplete = organizationName && emailAdmin;
  const [submited, setSubmited] = useState<string | null>(null);
  const [editOrganization, setEditOrganization] = useState<boolean>(false);
  const [editEmailAdmin, setEditEmailAdmin] = useState<boolean>(false);

  const [dangerPopUp, setDangerPopUp] = useState<boolean>(false);
  const [hasPendingChanges, setHasPendingChanges] = useState<boolean>(false);

  // Fetch and set initial values if editing
  useEffect(() => {
    async function fetchData() {
      if (editData) {
        setOrganization(editData.organization_name);
        setSubmited("submit");
        setEditOrganization(true);
        setEditEmailAdmin(false);

        // Check for pending changes if editing
        if (editData.has_pending_changes) {
          try {
            const response = await fetch(
              `/api/organization/${editData.organization_id}/changes`
            );
            const data = await response.json();

            if (response.ok && data.data && data.data.length > 0) {
              setHasPendingChanges(true);

              const latestChange = data.data[0];

              if (latestChange.organization_name) {
                setOrganization(latestChange.organization_name);
              }

              if (latestChange.email) {
                setEmailAdmin(latestChange.email);
              } else {
                setEmailAdmin(editData.admin?.email || "-");
              }
            } else {
              setHasPendingChanges(false);
              setEmailAdmin(editData.admin?.email || "-");
            }
          } catch (error) {
            console.error("Error fetching pending changes:", error);
            setHasPendingChanges(false);
            setEmailAdmin(editData.admin?.email || "-");
          }
        } else {
          setHasPendingChanges(false);
          setEmailAdmin(editData.admin?.email || "-");
        }
      } else {
        resetForm();
      }
    }

    fetchData();
  }, [editData]);

  function resetForm() {
    setOrganization("");
    setEmailAdmin("");
    setSubmited(null);
    setEditOrganization(false);
    setEditEmailAdmin(false);
    setHasPendingChanges(false);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    if (submited == null) {
      setSubmited("submit");
      setEditOrganization(true);
      setEditEmailAdmin(true);
    } else if (submited == "submit") {
      setLoading(true);

      try {
        if (editData) {
          const response = await fetch(
            `/api/organization/${editData.organization_id}/admin`,
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: emailAdmin,
              }),
            }
          );

          const data = await response.json();

          if (!response.ok) {
            setError(data.error || "Failed to update admin email");
            setLoading(false);
            return;
          }
        } else {
          // Creating new organization
          const response = await fetch("/api/organization", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              organization_name: organizationName,
              email: emailAdmin,
            }),
          });

          const data = await response.json();

          if (!response.ok) {
            setError(data.error || "Failed to create organization");
            setLoading(false);
            return;
          }
        }

        // Call parent save callback
        const superAdminData: SuperAdminProps = {
          organizationName,
          emailAdmin,
        };
        save(superAdminData);

        resetForm();
        close();
      } catch (error) {
        console.error("Error saving organization:", error);
        setError("An error occurred. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  }

  async function handleResetEmailAdmin() {
    if (!editData) return;

    setLoading(true);
    setError("");

    try {
      // Call API to reset email admin (set to "-")
      const response = await fetch(
        `/api/organization/${editData.organization_id}/admin`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: "-",
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to reset admin email");
        setLoading(false);
        return;
      }

      // Call parent save callback
      const superAdminData: SuperAdminProps = {
        organizationName,
        emailAdmin: "-",
      };
      save(superAdminData);

      resetForm();
      setDangerPopUp(false);
      close();
    } catch (error) {
      console.error("Error resetting admin email:", error);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (!open) return null;

  return (
    <section className="overflow-y-auto absolute top-0 left-0 w-full h-full grid grid-cols-12 items-center bg-white/20 backdrop-blur-[4px] py-10">
      <div className="col-span-12 xl:col-start-2 xl:col-end-12 2xl:col-start-4 2xl:col-end-10 rounded-t-[6px] px-2 sm:px-5 xl:px-28">
        <div className="flex justify-between items-center border-b border-neutral-300 bg-black px-[24px] py-[10px] rounded-t-[6px]">
          <h1 className="text-xs sm:text-xl md:text-2xl font-semibold">
            Manage Admin
          </h1>
          <div
            onClick={() => {
              resetForm();
              close();
            }}
            className="cursor-pointer border border-white rounded-[4px] p-2"
          >
            <ExitIcon size={13} />
          </div>
        </div>
        <div className="bg-neutral-900 flex flex-col items-end px-5 sm:px-[36px] py-[24px] space-y-[20px] sm:space-y-[32px]">
          <InformationIcon width={20} height={20} color="white" />

          {hasPendingChanges && (
            <div className="w-full text-orange-400 text-sm p-3 bg-orange-500/10 border border-orange-500/20 rounded-md">
              ⏱ <strong>Pending Changes Detected:</strong> Displaying requested
              changes instead of current data.
            </div>
          )}

          {error && (
            <div className="w-full text-red-500 text-sm p-3 bg-red-500/10 border border-red-500/20 rounded-md">
              {error}
            </div>
          )}
          <form
            onSubmit={handleSubmit}
            className="w-full flex flex-col items-end gap-y-[32px]"
          >
            <ul className="w-full border border-neutral-700 px-[20px] py-[24px] rounded-[8px] space-y-[20px] sm:space-y-[20px]">
              {!editData && (
                <li className="w-full flex flex-col sm:flex-row gap-[20px] sm:gap-[40px]">
                  <div className="relative w-full flex flex-col gap-y-[6px]">
                    <InputField
                      inputLabel="Organization Name"
                      inputPlaceholder="Organization Name"
                      setData={setOrganization}
                      setEditData={setEditOrganization}
                      editData={editOrganization}
                      submited={`${submited}`}
                      data={organizationName}
                    />
                  </div>
                </li>
              )}
              <li className="gap-x-[40px]">
                <div className="relative w-full flex flex-col gap-y-[6px]">
                  <InputField
                    inputLabel="Email Admin"
                    inputPlaceholder="Email Admin"
                    setData={setEmailAdmin}
                    setEditData={setEditEmailAdmin}
                    editData={editEmailAdmin}
                    submited={`${submited}`}
                    data={emailAdmin}
                  />
                </div>
              </li>
            </ul>
            <div className="flex gap-x-[20px]">
              {editData && (
                <div
                  onClick={() =>
                    submited == "submit" &&
                    !loading &&
                    setDangerPopUp(!dangerPopUp)
                  }
                  className={`w-auto sm:w-[180px] h-[40px] sm:h-[50px] flex justify-center items-center text-xs sm:text-base text-rose-800 ${
                    submited == "submit" && !loading
                      ? "cursor-pointer border border-rose-800"
                      : "cursor-not-allowed border border-gray-700 text-gray-700"
                  } px-[24px] py-[14px] rounded-full whitespace-nowrap`}
                >
                  {submited == "submit" && "Reset Email Admin"}
                </div>
              )}
              <button
                type={`${formComplete ? "submit" : "button"}`}
                disabled={loading || !formComplete}
                className={`w-[100px] sm:w-[150px] h-[40px] sm:h-[50px] flex justify-center items-center text-xs sm:text-base ${
                  formComplete && !loading
                    ? "cursor-pointer border border-white text-white"
                    : "cursor-not-allowed border border-gray-700 text-gray-700"
                } px-[24px] py-[14px] rounded-full`}
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        </div>
      </div>

      <DangerPopUp
        open={dangerPopUp}
        close={() => setDangerPopUp(false)}
        onConfirm={handleResetEmailAdmin}
        title="Reset Email Admin"
        message="Are you sure you want to reset the email admin? This will remove the admin from the organization and delete the corresponding admin account."
      />
    </section>
  );
}
