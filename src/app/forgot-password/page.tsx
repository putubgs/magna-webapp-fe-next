"use client";

import ForgotPassPopUp from "@/components/ForgotPassPopUp";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

function ForgotPassword() {
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [popUp, setPopUp] = useState(false);

  function submitHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    //temporary
    setEmail(email.trim());
    if (email != "") setPopUp(!popUp);
  }

  const closePopUp = () => {
    setPopUp(!popUp);
    router.push("/reset-password");
  }

  return (
    <div className="min-w-screen max-h-screen flex">
      <div className="flex flex-col justify-center items-center min-h-screen bg-[#171717] w-full md:w-[60%]">
        <div className="md:hidden block w-[80%] h-[45%] bg-[#3D0FA8] opacity-50 blur-3xl rounded-full absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-0"></div>
        <div className="flex flex-col md:w-[75%] w-full justify-center items-center z-10 p-6 md:p-0">
          <form onSubmit={submitHandler} className="flex flex-col gap-4">
            <p className="text-2xl leading-[32px] text-white text-center font-bold">
              Forgot Password
            </p>
            <p className="text-base text-neutral-300">
              Please enter your email address in the form below. If the email is
              registered, we will send you an email to reset your password.
            </p>
            <div className="flex flex-col gap-2">
              <p className="text-base font-bold">Email</p>
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Your Email"
                className="w-full md:px-[12px] px-[16px] py-[12px] md:py-[8px] rounded-md outline-none border border-[#737373] bg-transparent"
              />
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
      {popUp && (
        <ForgotPassPopUp
          title="Check Your Email"
          description="We’ve sent a password reset link to your email address. Please check your inbox and follow the instructions to reset your password."
          isSuccess={true}
          closePopUp={closePopUp}
        />
      )}
    </div>
  );
}

export default ForgotPassword;
