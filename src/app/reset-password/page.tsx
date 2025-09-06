"use client";

import { Icon } from "@iconify/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

function ForgotPassword() {
  const router = useRouter();

  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);

  const [containNumber, setContainNumber] = useState(false);
  const [containUppercase, setContainUppercase] = useState(false);
  const [containSpecial, setContainSpecial] = useState(false);
  const [containMinLength, setContainMinLength] = useState(false);

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    setContainNumber(/\d/.test(value));
    setContainUppercase(/[A-Z]/.test(value));
    setContainSpecial(/[!@#$%^&*(),.?":{}|<>]/.test(value));
    setContainMinLength(value.length >= 8);
  };

  function submitHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmedPass = password.trim();
    const trimmedConfirm = confirmPassword.trim();
    
    //temporary
    if (
      !(containNumber && containUppercase && containSpecial && containMinLength)
    ) {
      alert("Password belum memenuhi semua kriteria.");
      return;
    }

    if (trimmedPass !== trimmedConfirm) {
      alert("Password dan Konfirmasi tidak sama.");
      return;
    }

    router.push("/login");
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
              Please enter your new password below. Make sure it’s strong and
              something you’ll remember.
            </p>

            <div className="flex flex-col gap-2">
              <p className="text-[16px] font-bold">New Password</p>
              <div className="flex items-center w-full md:px-[12px] px-[16px] py-[12px] md:py-[8px] rounded-md outline-none border border-neutral-500">
                <input
                  value={password}
                  onChange={(e) => handlePasswordChange(e.target.value)}
                  type={showPassword ? "password" : "text"}
                  placeholder="*************"
                  className="w-full outline-none bg-transparent text-white"
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
                {!containMinLength && (
                  <p>• At least 8 characters</p>
                )}
                {!containUppercase && (
                  <p>• At least one uppercase letter</p>
                )}
                {!containNumber && (
                  <p>• At least one number</p>
                )}
                {!containSpecial && (
                  <p>• At least one special character</p>
                )}
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
                  className="w-full outline-none bg-transparent text-white"
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
                className="w-full bg-white rounded-md text-[#270081] cursor-pointer text-center py-2 font-bold text-base"
              >
                Send
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

export default ForgotPassword;
