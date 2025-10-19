"use client";
import { useState, FormEvent } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function ChangePasswordManagement() {
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showCurrentPassword, setShowCurrentPassword] =
    useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  const formComplete = currentPassword && newPassword && confirmPassword;

  function resetForm() {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setError("");
    setSuccess(false);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSuccess(false);

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
          currentPassword,
          newPassword,
          isNewAccount: false,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to change password");
        return;
      }

      setSuccess(true);
      setTimeout(() => {
        resetForm();
      }, 3000);
    } catch (error) {
      console.error("Error changing password:", error);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="bg-black border border-[#404040] p-[20px] md:p-[28px] rounded-[12px] space-y-[24px]">
      <div className="flex justify-between items-center">
        <h1 className="text-lg lg:text-2xl font-semibold">Change Password</h1>
      </div>

      {/* Status Messages */}
      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-md">
          <p className="text-red-500 text-sm">{error}</p>
        </div>
      )}

      {success && (
        <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-md">
          <p className="text-green-500 text-sm">
            ✅ Password changed successfully!
          </p>
        </div>
      )}

      {/* Form Section */}
      <form onSubmit={handleSubmit} className="space-y-[24px]">
        <div className="bg-[#1D1D1D] border border-[#404040] rounded-[12px] p-[20px] md:p-[28px] space-y-[24px]">
          {/* Current Password */}
          <div className="space-y-[8px]">
            <label className="block text-white font-semibold text-sm md:text-base">
              Current Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showCurrentPassword ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter your current password"
                className="w-full bg-black border border-[#404040] text-white px-4 py-3 rounded-md focus:outline-none focus:border-primary transition-colors"
                disabled={loading || success}
                required
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                {showCurrentPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div className="space-y-[8px]">
            <label className="block text-white font-semibold text-sm md:text-base">
              New Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password (min. 8 characters)"
                className="w-full bg-black border border-[#404040] text-white px-4 py-3 rounded-md focus:outline-none focus:border-primary transition-colors"
                disabled={loading || success}
                required
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <p className="text-[#A3A3A3] text-xs">
              Password must be at least 8 characters long
            </p>
          </div>

          {/* Confirm Password */}
          <div className="space-y-[8px]">
            <label className="block text-white font-semibold text-sm md:text-base">
              Confirm New Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your new password"
                className="w-full bg-black border border-[#404040] text-white px-4 py-3 rounded-md focus:outline-none focus:border-primary transition-colors"
                disabled={loading || success}
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Password Requirements */}
          <div className="bg-black border border-[#404040] rounded-md p-4">
            <h3 className="text-white font-semibold text-sm mb-2">
              Password Requirements:
            </h3>
            <ul className="space-y-1 text-[#A3A3A3] text-xs">
              <li className="flex items-center gap-2">
                <span
                  className={
                    newPassword.length >= 8 ? "text-green-500" : "text-gray-500"
                  }
                >
                  {newPassword.length >= 8 ? "✓" : "○"}
                </span>
                At least 8 characters
              </li>
              <li className="flex items-center gap-2">
                <span
                  className={
                    newPassword === confirmPassword && confirmPassword !== ""
                      ? "text-green-500"
                      : "text-gray-500"
                  }
                >
                  {newPassword === confirmPassword && confirmPassword !== ""
                    ? "✓"
                    : "○"}
                </span>
                Passwords match
              </li>
              <li className="flex items-center gap-2">
                <span
                  className={
                    currentPassword !== newPassword &&
                    newPassword !== "" &&
                    currentPassword !== ""
                      ? "text-green-500"
                      : "text-gray-500"
                  }
                >
                  {currentPassword !== newPassword &&
                  newPassword !== "" &&
                  currentPassword !== ""
                    ? "✓"
                    : "○"}
                </span>
                Different from current password
              </li>
            </ul>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            type="button"
            onClick={resetForm}
            disabled={loading || success}
            className="px-6 py-3 border border-[#404040] text-[#A3A3A3] rounded-[8px] hover:bg-[#1D1D1D] transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm lg:text-base"
          >
            Reset Form
          </button>
          <button
            type="submit"
            disabled={!formComplete || loading || success}
            className={`px-6 py-3 rounded-[8px] font-semibold transition-all text-sm lg:text-base ${
              formComplete && !loading && !success
                ? "bg-primary text-white hover:bg-primary-light cursor-pointer"
                : "bg-[#1D1D1D] text-[#737373] cursor-not-allowed border border-[#404040]"
            }`}
          >
            {loading
              ? "Changing Password..."
              : success
              ? "Success!"
              : "Change Password"}
          </button>
        </div>
      </form>
    </section>
  );
}
