"use client";
import { Icon } from "@iconify/react";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

function Login() {
	const router = useRouter();

	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [showPassword, setShowPassword] = useState(true);

	function submitHander(e: FormEvent<HTMLFormElement>) {
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
		<div className="flex justify-between h-screen bg-[#171717]">
			<div className="md:hidden block w-[273px] h-[291px] bg-[#3D0FA8] opacity-50 blur-3xl rounded-full absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2"></div>
			<div className="w-full h-full items-center justify-center">
				<div className="flex flex-col h-screen md:justify-between justify-center md:py-30 md:px-25 md:pt-50 p-10">
					<form onSubmit={submitHander} className="flex flex-col gap-2 z-99">
						<p className="text-[40px] gilda-font">Welcome Back!</p>
						<p className="text-[18px]">
							Your expertise is essential for managing our platform, and we are excited
							to support your vision for improvement and innovation.
						</p>
						<div className="flex flex-col pt-10 gap-7">
							<div className="gap-1">
								<p className="text-[16px] font-bold">Email</p>
								<input
									onChange={(e) => setEmail(e.target.value)}
									type="email"
									placeholder="Your Email"
									className="w-full md:px-[12px] px-[16px] py-[12px] md:py-[8px] rounded-md outline-none border border-[#737373]"
								/>
							</div>
							<div className="gap-1">
								<p className="text-[16px] font-bold">Password</p>
								<div className="flex items-center w-full md:px-[12px] px-[16px] py-[12px] md:py-[8px] rounded-md outline-none border border-[#737373]">
									<input
										onChange={(e) => setPassword(e.target.value)}
										type={showPassword ? "password" : "text"}
										placeholder="Your Password"
										className="w-full outline-none"
									/>
									<div
										className="cursor-pointer"
										onClick={() => setShowPassword(!showPassword)}>
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
								className="w-full bg-white rounded-md text-black  cursor-pointer text-center py-2">
								Login
							</button>
						</div>
					</form>
					<div className="md:pt-0 pt-10">
						<p className="">Don’t have any account yet? contact the (who?)</p>
					</div>
				</div>
			</div>
			<div className="md:block hidden w-[818px] h-[872px] bg-[#3D0FA8] opacity-50 blur-3xl rounded-full absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2"></div>
			<div className="md:flex hidden bg-black w-full items-center justify-center z-99">
				<img
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
