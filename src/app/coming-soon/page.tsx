"use client";
import Header from "@/components/header";
import InstaIcon from "@/components/icons/instaIcon";
import LinkedinIcon from "@/components/icons/linkedinIcon";
import MailIcon from "@/components/icons/mailIcon";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ComingSoon() {
	const [burgerStatus, setBurgerStatus] = useState(false);
	const [loading, setLoading] = useState(true);

	function handleBurger() {
		setBurgerStatus(!burgerStatus);
	}

	useEffect(() => {
		const timer = setTimeout(() => {
			setLoading(false);
		}, 3000);

		return () => clearTimeout(timer);
	}, []);
	return (
		<>
			<div className="h-screen flex flex-col justify-between">
				<div className="sticky top-0 bg-black z-[50] flex justify-between py-6 px-4 md:px-[120px] items-center shadow-md">
					<a className="flex items-center space-x-4 cursor-pointer" href="#main">
						<Image
							src="/assets/logo/business-units/Magna.png"
							alt="Magna Logo"
							width={30}
							height={56}
						/>
						<div className="md:text-[24px] text-[18px] font-extrabold">
							Magna Partners
						</div>
					</a>
					<div className="hidden md:flex space-x-12">
						<a href="#organizations" className="cursor-pointer">
							Organizations
						</a>
						<a href="#partnership" className="cursor-pointer">
							Partnership
						</a>
						<a href="#contact" className="cursor-pointer">
							Contact
						</a>
					</div>
					<div
						className={`block md:hidden ham-menu ${burgerStatus ? "active" : ""}`}
						onClick={handleBurger}>
						<span></span>
						<span></span>
					</div>
					{burgerStatus && (
						<div className="flex flex-col bg-black w-48 h-40 rounded-xl absolute right-6 top-20 p-4 z-[99] space-y-[12px] md:hidden">
							<a
								href="#organizations"
								className="cursor-pointer"
								onClick={handleBurger}>
								Organizations
							</a>
							<a href="#partnership" className="cursor-pointer" onClick={handleBurger}>
								Partnership
							</a>
							<a href="#contact" className="cursor-pointer" onClick={handleBurger}>
								Contact
							</a>
						</div>
					)}
				</div>
				<main className="w-full flex flex-col justify-center items-center footer-coming-soon-background gap-3">
					<h1 className="text-3xl sm:text-5xl gilda-font">Coming Soon!</h1>
					<p className="text-sm sm:text-xl">Lorem ipsum dolor sit amet</p>
				</main>
				<div
					id="contact"
					className="footer-background flex flex-col items-center md:p-[80px] space-y-[40px] justify-center">
					<div className="flex flex-col items-center text-[16px] text-center">
						<div className="md:text-[24px] text-[16px]">Contact Us</div>
						<div className="gilda-font md:text-[48px] text-[32px]">
							Stay connected with Magna Partners!
						</div>
					</div>
					<div className="flex gap-y-6 md:gap-x-[60px] gap-x-[25px]">
						<a
							className="flex md:space-x-3 space-x-0 items-center"
							href="https://www.instagram.com/magna.partners/"
							target="_blank"
							rel="noopener noreferrer">
							<div className="md:flex hidden items-center justify-center rounded-full border border-white w-[30px] h-[30px]">
								<InstaIcon size={15} color="white" />
							</div>
							<div
								className="flex md:hidden items-center justify-center rounded-full border border-white w-[50px] h-[50px]"
								aria-label="Magna Partners Instagram">
								<InstaIcon size={25} color="white" />
							</div>
							<div className="md:flex hidden">@magna.partners</div>
						</a>
						<a
							className="flex md:space-x-3 space-x-0 items-center"
							href="mailto:magnainitiatives.id@gmail.com">
							<div className="md:flex hidden items-center justify-center rounded-full border border-white w-[30px] h-[30px]">
								<MailIcon size={15} color="white" />
							</div>
							<div
								className="flex md:hidden items-center justify-center rounded-full border border-white w-[50px] h-[50px]"
								aria-label="Magna Partners Email">
								<MailIcon size={25} color="white" />
							</div>
							<div className="md:flex hidden">magnainitiatives.id@gmail.com</div>
						</a>
						<a
							className="flex md:space-x-3 space-x-0 items-center"
							href="https://www.linkedin.com/company/magna-id/"
							target="_blank"
							rel="noopener noreferrer">
							<div className="md:flex hidden items-center justify-center rounded-full border border-white w-[30px] h-[30px]">
								<LinkedinIcon size={15} color="white" />
							</div>
							<div
								className="flex md:hidden items-center justify-center rounded-full border border-white w-[50px] h-[50px]"
								aria-label="Magna Partners LinkedIn">
								<LinkedinIcon size={25} color="white" />
							</div>
							<div className="md:flex hidden">Magna Partners</div>
						</a>
					</div>
				</div>
			</div>
		</>
	);
}
