import { useState } from "react";

export default function Header() {
	const [burgerStatus, setBurgerStatus] = useState(false);

	function handleBurger() {
		setBurgerStatus(!burgerStatus);
	}

	return (
		<>
			<header className="sticky top-0 bg-[#0B0D12] z-[50] flex justify-between py-6 px-4 md:px-12 lg:px-[90px] xl:px-[120px] items-center shadow-md">
				<a className="flex items-center space-x-4 cursor-pointer" href="/">
					<img
						src="/assets/logo/business-units/Magna.png"
						alt="Magna Logo"
						width={30}
						height={56}
					/>
					<div className="md:text-[24px] text-[18px] font-extrabold">
						Magna Partners
					</div>
				</a>
				<div className="hidden lg:flex space-x-12">
					<a href="#ourEvent" className="cursor-pointer">
						Our Event
					</a>
					<a href="#ourCollaboration" className="cursor-pointer">
						Our Collaboration
					</a>
					<a href="#ourImpact" className="cursor-pointer">
						Our Impact
					</a>
					<a href="#contactus" className="cursor-pointer">
						Contact Us
					</a>
				</div>
				<div
					className={`block lg:hidden ham-menu ${burgerStatus ? "active" : ""}`}
					onClick={handleBurger}>
					<span></span>
					<span></span>
				</div>
				{burgerStatus && (
					<div className="flex flex-col bg-black w-48 h-40 rounded-xl absolute right-6 top-20 p-4 z-[99] space-y-[12px] lg:hidden">
						<a href="#ourEvent" className="cursor-pointer" onClick={handleBurger}>
							Our Event
						</a>
						<a
							href="#ourCollaboration"
							className="cursor-pointer"
							onClick={handleBurger}>
							Our Collaboration
						</a>
						<a href="#ourImpact" className="cursor-pointer" onClick={handleBurger}>
							Our Impact
						</a>
						<a href="#contact" className="cursor-pointer" onClick={handleBurger}>
							Contact Us
						</a>
					</div>
				)}
			</header>
		</>
	);
}
