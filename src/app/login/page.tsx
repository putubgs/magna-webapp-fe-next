"use client";

import { Icon } from "@iconify/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

function Login() {
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState(true);

  function submitHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (email === "magnaadmin@gmail.com" && password === "magnaadmin") {
      localStorage.setItem("userRole", "super-admin");
      router.push("/admin?panel=admin-manage");
    } else if (email === "admin@gmail.com" && password === "admin") {
      localStorage.setItem("userRole", "admin");
      router.push("/admin?panel=about-us");
    } else {
      alert("Wrong email or password");
    }
  }

  return (
    <div className="min-w-screen max-h-screen flex">
      <div className="flex flex-col justify-center min-h-screen bg-[#171717] w-full md:w-[60%]">
        <div className="md:hidden block w-[80%] h-[45%] bg-[#3D0FA8] opacity-50 blur-3xl rounded-full absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-0"></div>
        <div className="flex flex-col min-w-full h-full justify-center items-center p-6 md:p-10 z-10">
          <div className="flex flex-col justify-center md:pt-20 md:pb-24 w-full max-w-7xl">
            <form onSubmit={submitHandler} className="flex flex-col gap-2">
              <p className="text-[40px] gilda-font text-white">Welcome Back!</p>
              <p className="text-[18px] text-neutral-300">
                Your expertise is essential for managing our platform, and we
                are excited to support your vision for improvement and
                innovation.
              </p>
              <div className="flex flex-col pt-10 gap-7">
                <div className="gap-1">
                  <p className="text-[16px] font-bold">Email</p>
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="Your Email"
                    className="w-full md:px-[12px] px-[16px] py-[12px] md:py-[8px] rounded-md outline-none border border-[#737373] bg-transparent"
                  />
                </div>
                <div className="gap-1">
                  <p className="text-[16px] font-bold">Password</p>
                  <div className="flex items-center w-full md:px-[12px] px-[16px] py-[12px] md:py-[8px] rounded-md outline-none border border-neutral-500">
                    <input
                      onChange={(e) => setPassword(e.target.value)}
                      type={showPassword ? "password" : "text"}
                      placeholder="*************"
                      className="w-full outline-none bg-transparent"
                    />
                    <div
                      className="cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <Icon icon="el:eye-close" width="20" height="20" />
                      ) : (
                        <Icon icon="el:eye-open" width="20" height="20" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex rounded md:w-1/3 p-2 mt-4 bg-[#303030] cursor-pointer w-full">
                <button
                  type="submit"
                  className="w-full bg-white rounded-md text-[#270081] cursor-pointer text-center py-2 font-bold text-base"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
          <div className="md:pt-0 pt-7 w-full max-w-7xl">
            <p className="w-fit">
              Don’t have any account yet? contact the (who?)
            </p>
          </div>
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

export default Login;
