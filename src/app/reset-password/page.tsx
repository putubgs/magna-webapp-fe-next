"use client";

import { Icon } from "@iconify/react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState, useEffect, Suspense } from "react";

function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState(false);
  const [isValidating, setIsValidating] = useState(true);

  const [containNumber, setContainNumber] = useState(false);
  const [containUppercase, setContainUppercase] = useState(false);
  const [containSpecial, setContainSpecial] = useState(false);
  const [containMinLength, setContainMinLength] = useState(false);

  // Get URL parameters
  const token = searchParams.get("token");
  const userType = searchParams.get("type");
  const userId = searchParams.get("id");

  useEffect(() => {
    // Check if required parameters are present
    if (!token || !userType || !userId) {
      router.push("/404");
      return;
    }

    // Validate token with backend
    const validateToken = async () => {
      try {
        const response = await fetch("/api/auth/validate-reset-token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token,
            userType,
            userId,
          }),
        });

        if (!response.ok) {
          router.push("/404");
          return;
        }

        // Token is valid, show the form
        setIsValidating(false);
      } catch (error) {
        console.error("Token validation error:", error);
        router.push("/404");
      }
    };

    validateToken();
  }, [token, userType, userId, router]);

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    setContainNumber(/\d/.test(value));
    setContainUppercase(/[A-Z]/.test(value));
    setContainSpecial(/[!@#$%^&*(),.?":{}|<>]/.test(value));
    setContainMinLength(value.length >= 8);
  };

  async function submitHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const trimmedPass = password.trim();
    const trimmedConfirm = confirmPassword.trim();

    // Validate password requirements
    if (
      !(containNumber && containUppercase && containSpecial && containMinLength)
    ) {
      setError("Password must meet all the requirements listed below.");
      setLoading(false);
      return;
    }

    if (trimmedPass !== trimmedConfirm) {
      setError("Password and confirmation do not match.");
      setLoading(false);
      return;
    }

    // Check if we have required parameters
    if (!token || !userType || !userId) {
      setError("Invalid reset link. Please request a new password reset.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          password: trimmedPass,
          userType,
          userId,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        console.log("Password reset successful:", data);
        // Redirect to login after a short delay
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        setError(data.error || "Failed to reset password");
      }
    } catch (error) {
      console.error("Reset password error:", error);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  // Show loading while validating token
  if (isValidating) {
    return (
      <div className="min-h-screen bg-[#171717] flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
          <p>Validating reset link...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-w-screen max-h-screen flex">
      <div className="flex flex-col justify-center items-center min-h-screen bg-[#171717] w-full md:w-[60%]">
        <div className="md:hidden block w-[80%] h-[45%] bg-[#3D0FA8] opacity-50 blur-3xl rounded-full absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-0"></div>
        <div className="flex flex-col md:w-[75%] w-full justify-center items-center z-10 p-6 md:p-0">
          <form onSubmit={submitHandler} className="flex flex-col gap-4">
            <p className="text-2xl leading-[32px] text-white text-center font-bold">
              Reset Your Password
            </p>
            <p className="text-base text-neutral-300">
              Please enter your new password below. Make sure it&apos;s strong
              and something you&apos;ll remember.
            </p>

            {error && (
              <div className="text-red-500 text-sm p-3 bg-red-500/10 border border-red-500/20 rounded-md">
                {error}
              </div>
            )}

            {success && (
              <div className="text-green-500 text-sm p-3 bg-green-500/10 border border-green-500/20 rounded-md">
                Password reset successfully! Redirecting to login...
              </div>
            )}

            <div className="flex flex-col gap-2">
              <p className="text-[16px] font-bold">New Password</p>
              <div className="flex items-center w-full md:px-[12px] px-[16px] py-[12px] md:py-[8px] rounded-md outline-none border border-neutral-500">
                <input
                  value={password}
                  onChange={(e) => handlePasswordChange(e.target.value)}
                  type={showPassword ? "password" : "text"}
                  placeholder="*************"
                  disabled={loading || success || !!error}
                  className="w-full outline-none bg-transparent text-white disabled:opacity-50"
                />
                <div
                  className="cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <Icon
                      icon="el:eye-close"
                      width="20"
                      height="20"
                      color="#737373"
                    />
                  ) : (
                    <Icon
                      icon="el:eye-open"
                      width="20"
                      height="20"
                      color="#737373"
                    />
                  )}
                </div>
              </div>
            </div>

            {password && (
              <div className="text-sm space-y-1 text-red-500">
                {!containMinLength && <p>• At least 8 characters</p>}
                {!containUppercase && <p>• At least one uppercase letter</p>}
                {!containNumber && <p>• At least one number</p>}
                {!containSpecial && <p>• At least one special character</p>}
              </div>
            )}

            <div className="flex flex-col gap-2">
              <p className="text-[16px] font-bold">Confirm Password</p>
              <div className="flex items-center w-full md:px-[12px] px-[16px] py-[12px] md:py-[8px] rounded-md outline-none border border-neutral-500">
                <input
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  type={showConfirmPassword ? "password" : "text"}
                  placeholder="*************"
                  disabled={loading || success || !!error}
                  className="w-full outline-none bg-transparent text-white disabled:opacity-50"
                />
                <div
                  className="cursor-pointer"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <Icon
                      icon="el:eye-close"
                      width="20"
                      height="20"
                      color="#737373"
                    />
                  ) : (
                    <Icon
                      icon="el:eye-open"
                      width="20"
                      height="20"
                      color="#737373"
                    />
                  )}
                </div>
              </div>
            </div>

            <div className="flex rounded p-2 mt-4 bg-[#303030] cursor-pointer w-full">
              <button
                type="submit"
                disabled={loading || success || !!error}
                className="w-full bg-white rounded-md text-[#270081] cursor-pointer text-center py-2 font-bold text-base disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-[#270081]"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Resetting...
                  </>
                ) : success ? (
                  "Password Reset!"
                ) : (
                  "Reset Password"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="pointer-events-none md:block hidden w-[40%] h-[100%] bg-[#3D0FA8] opacity-50 blur-3xl rounded-full absolute top-[50%] left-[60%] -translate-x-1/2 -translate-y-1/2"></div>
      <div className="md:flex hidden bg-black w-[40%] items-center justify-center z-10">
        <Image
          src="/assets/logo/business-units/Magna.png"
          alt="Magna Logo"
          width={300}
          height={300}
        />
      </div>
    </div>
  );
}

function ResetPassword() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#171717] flex items-center justify-center text-white">
          Loading...
        </div>
      }
    >
      <ResetPasswordContent />
    </Suspense>
  );
}

export default ResetPassword;
