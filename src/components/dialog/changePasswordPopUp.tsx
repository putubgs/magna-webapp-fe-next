"use client";
import { FormEvent, useState, useEffect } from "react";
import ExitIcon from "../icons/exitIcon";
import { Eye, EyeOff, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";

type ChangePasswordPopUpProps = {
  open: boolean;
  close: () => void;
  isNewAccount?: boolean;
};

export default function ChangePasswordPopUp({
  open,
  close,
  isNewAccount = false,
}: ChangePasswordPopUpProps) {
  const router = useRouter();
  const { signOut, user, updateIsNewAccount } = useAuthStore();
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  const [organizationName, setOrganizationName] = useState<string>("");

  const formComplete = newPassword && confirmPassword;

  // Fetch organization name for the admin
  useEffect(() => {
    async function fetchOrganization() {
      if (!user?.id || !open) return;

      try {
        // Fetch organization for the current admin
        const orgResponse = await fetch(`/api/organization/admin-organization`);
        const orgData = await orgResponse.json();

        if (orgResponse.ok && orgData.data) {
          setOrganizationName(orgData.data.organization_name || "");
        } else {
          setOrganizationName("");
        }
      } catch (error) {
        console.error("Error fetching organization:", error);
        setOrganizationName("");
      }
    }

    fetchOrganization();
  }, [user?.id, open]);

  function resetForm() {
    setNewPassword("");
    setConfirmPassword("");
    setError("");
    setSuccess(false);
    setShowNewPassword(false);
    setShowConfirmPassword(false);
  }

  function handleLogout() {
    signOut(router);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    // Validation
    if (newPassword.length < 8) {
      setError("New password must be at least 8 characters long");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newPassword,
          isNewAccount: true,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to change password");
        setLoading(false);
        return;
      }

      setSuccess(true);

      // Update the auth store to reflect the account is no longer new
      updateIsNewAccount(false);

      console.log("✅ Password changed successfully, account activated");

      setTimeout(() => {
        resetForm();
        close();
      }, 2000);
    } catch (error) {
      console.error("Error changing password:", error);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (!open) return null;

  return (
    <section className="fixed top-0 left-0 w-full h-full grid grid-cols-12 items-center bg-black/50 backdrop-blur-[8px] z-50">
      <div className="col-span-12 xl:col-start-4 xl:col-end-10 2xl:col-start-4 2xl:col-end-10 rounded-[6px] px-2 sm:px-5 xl:px-10">
        <div className="relative">
          <div className="flex justify-between items-center border-b border-neutral-300 bg-black px-[24px] py-[10px] rounded-t-[6px]">
            <h1 className="text-xs sm:text-xl md:text-2xl font-semibold">
              Change Password Form
            </h1>
            <button
              onClick={handleLogout}
              className="cursor-pointer border border-red-500 hover:bg-red-500/10 rounded-[4px] p-2 flex items-center gap-2 transition-colors"
              title="Logout"
            >
              <LogOut size={16} className="text-red-500" />
              <span className="text-xs text-red-500 hidden sm:block">
                Logout
              </span>
            </button>
          </div>
          <div className="bg-neutral-900 flex flex-col items-end px-5 sm:px-[36px] py-[24px] space-y-[20px] sm:space-y-[32px]">
            <div className="w-full space-y-4">
              <div className="text-center space-y-2">
                <h2 className="text-2xl sm:text-3xl font-bold text-white">
                  Hello Management Team
                  {organizationName ? ` of ${organizationName}` : ""}!
                </h2>
                <p className="text-base sm:text-lg text-gray-300">
                  Welcome to Magna Partners 🎉
                </p>
              </div>
              <div className="w-full text-blue-400 text-sm sm:text-base p-4 bg-blue-500/10 border border-blue-500/20 rounded-md">
                <p className="mb-2">
                  <strong>Just One Quick Step:</strong>
                </p>
                <p className="text-gray-300">
                  To get started, please create a secure password that&apos;s
                  uniquely yours. This helps keep your account safe and gives
                  you full control over your dashboard experience!
                </p>
              </div>
            </div>

            {error && (
              <div className="w-full text-red-500 text-sm p-3 bg-red-500/10 border border-red-500/20 rounded-md">
                {error}
              </div>
            )}

            {success && (
              <div className="w-full text-green-500 text-sm p-3 bg-green-500/10 border border-green-500/20 rounded-md">
                ✅ Password changed successfully! Redirecting...
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="w-full flex flex-col items-end gap-y-[32px]"
            >
              <ul className="w-full border border-neutral-700 px-[20px] py-[24px] rounded-[8px] space-y-[20px]">
                <li className="w-full">
                  <div className="relative flex flex-col gap-y-[6px]">
                    <label className="text-xs sm:text-base font-bold text-white">
                      New Password
                    </label>
                    <div className="relative">
                      <input
                        type={showNewPassword ? "text" : "password"}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Enter new password (min. 8 characters)"
                        className="w-full bg-transparent border border-neutral-500 text-white px-4 py-2 rounded-md focus:outline-none focus:border-primary pr-12"
                        disabled={loading || success}
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white"
                      >
                        {showNewPassword ? (
                          <EyeOff size={20} />
                        ) : (
                          <Eye size={20} />
                        )}
                      </button>
                    </div>
                  </div>
                </li>
                <li className="w-full">
                  <div className="relative flex flex-col gap-y-[6px]">
                    <label className="text-xs sm:text-base font-bold text-white">
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm new password"
                        className="w-full bg-transparent border border-neutral-500 text-white px-4 py-2 rounded-md focus:outline-none focus:border-primary pr-12"
                        disabled={loading || success}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white"
                      >
                        {showConfirmPassword ? (
                          <EyeOff size={20} />
                        ) : (
                          <Eye size={20} />
                        )}
                      </button>
                    </div>
                  </div>
                </li>
              </ul>
              <div className="flex justify-center gap-x-[20px]">
                <button
                  type="submit"
                  disabled={!formComplete || loading || success}
                  className={`w-[150px] sm:w-[200px] h-[40px] sm:h-[50px] flex justify-center items-center text-xs sm:text-base ${
                    formComplete && !loading && !success
                      ? "cursor-pointer border border-white text-white"
                      : "cursor-not-allowed border border-gray-700 text-gray-700"
                  } px-[24px] py-[14px] rounded-full`}
                >
                  {loading
                    ? "Changing..."
                    : success
                    ? "Success!"
                    : "Change Password"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
