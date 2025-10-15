"use client";
import DetailEventCard from "@/components/detailEventCard";
import Header from "@/components/header";
import {
	ArrowUpRight,
	Banknote,
	CalendarDays,
	Clock,
	MapPin,
} from "lucide-react";
import Image from "next/image";

export default function DetailEvent() {
	return (
		<>
			<Header />
			<main className="py-4 sm:py-8 md:py-12 space-y-6 sm:space-y-8 md:space-y-[42px]">
				<h1 className="mx-5 md:mx-[120px] text-lg sm:text-2xl md:text-4xl font-bold leading-snug">
					Desgining User Friendly Apps for the Masses
				</h1>
				<div className="mx-5 md:mx-[120px]">
					<div className="text-base sm:text-lg md:text-xl">
						<p className="text-gray-400">Hosted by</p>
						<p className="font-semibold">TECHFUSION</p>
					</div>
				</div>
				<div className="mx-5 md:mx-[120px] grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-[92px]">
					<div className="md:col-span-9">
						<Image
							className="w-full h-auto sm:h-[300px] md:h-[500px] object-cover rounded-[8px] sm:rounded-[12px]"
							width={1300}
							height={1300}
							src={"/assets/img/event-poster-dummy.png"}
							alt={"event poster image"}
						/>
					</div>
					<div className="md:col-span-3 space-y-4 sm:space-y-5">
						<p className="text-lg sm:text-xl font-bold">Time and Place</p>
						<div className="border border-[#737373] p-4 sm:p-[24px] rounded-[8px] sm:rounded-[12px] space-y-4 sm:space-y-[24px] text-sm sm:text-base">
							<div className="flex items-center gap-3 sm:gap-[16px]">
								<CalendarDays
									width={24}
									height={24}
									className="sm:w-8 sm:h-8"
									color="#A3A3A3"
								/>
								<p className="text-[#A3A3A3]">Saturday, 17th September 2022</p>
							</div>
							<div className="flex items-center gap-3 sm:gap-[16px]">
								<Clock
									width={24}
									height={24}
									className="sm:w-8 sm:h-8"
									color="#A3A3A3"
								/>
								<p className="text-[#A3A3A3]">10.00 - 12.00 WIB</p>
							</div>
							<div className="flex items-start gap-3 sm:gap-[16px]">
								<MapPin
									className="w-[25px] h-[25px] sm:w-[30px] sm:h-[30px] flex-shrink-0"
									color="#A3A3A3"
								/>
								<div className="space-y-2 sm:space-y-4">
									<p className="text-[#A3A3A3]">Bean Cafe</p>
									<p className="text-[#A3A3A3] text-xs sm:text-sm leading-relaxed">
										Jl. Raya Cikini No.42, Menteng, Jakarta Pusat, 10330, Indonesia
									</p>
									<p className="flex items-center text-white gap-2 sm:gap-[8px] text-xs sm:text-sm">
										View on Google Maps{" "}
										<ArrowUpRight width={16} height={16} className="sm:w-5 sm:h-5" />
									</p>
								</div>
							</div>
						</div>
						<p className="text-lg sm:text-xl font-bold">Price</p>
						<div className="flex justify-center items-center border border-[#737373] p-3 sm:p-[24px] gap-3 sm:gap-[16px] rounded-[8px] sm:rounded-[12px] text-sm sm:text-base">
							<Banknote
								width={24}
								height={24}
								className="sm:w-6 sm:h-6"
								color="#A3A3A3"
							/>
							<p className="text-[#A3A3A3]">Rp10.000,00</p>
						</div>
					</div>
					<div className="md:col-span-9">
						<div className="mt-6 sm:mt-10 text-sm sm:text-base md:text-xl space-y-3 sm:space-y-4">
							<div>
								<p className="font-semibold mb-2">Speakers:</p>
								<ol className="list-decimal list-outside ml-4 sm:ml-5 space-y-1 text-xs sm:text-sm md:text-base">
									<li>Characqua Vania – MAP Batch 4</li>
									<li>Ika Wiworo – Talent Acquisition Specialist, Ruangguru</li>
									<li>Adhitya Khemal – MAP Batch 3</li>
								</ol>
							</div>
							<div>
								<p className="font-semibold mb-2">Moderators:</p>
								<ul className="list-disc list-outside ml-4 sm:ml-5 space-y-1 text-xs sm:text-sm md:text-base">
									<li>Ahza Zamzami – Marketing and Operation Lead, TechFusion</li>
								</ul>
							</div>
							<p className="text-xs sm:text-sm md:text-base leading-relaxed">
								In this interactive session, our expert speakers will share insights on
								how you can distinguish yourself in the highly competitive job market,
								especially with Management Trainee programs. Learn about the essential
								skills, experiences, and strategies that can give your career an edge.
								This webinar is perfect for fresh graduates and young professionals who
								are eager to learn more about Management Trainee opportunities and tips
								for excelling in them.
							</p>
						</div>
					</div>
				</div>
				<div className="space-y-3 sm:space-y-4 md:space-y-[20px]">
					<h1 className="mx-5 md:mx-[120px] gilda-font text-base sm:text-lg md:text-xl lg:text-2xl">
						Upcoming Tech Fusion Event
					</h1>
					<div className="ms-3 sm:ms-4 md:ms-[120px] flex overflow-x-scroll flex-nowrap gap-3 sm:gap-4 md:gap-[40px] scroll-smooth scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent scrollbar-hide">
						<div className="flex-none">
							<DetailEventCard />
						</div>
						<div className="flex-none">
							<DetailEventCard />
						</div>
						<div className="flex-none">
							<DetailEventCard />
						</div>
						<div className="flex-none">
							<DetailEventCard />
						</div>
						<div className="flex-none">
							<DetailEventCard />
						</div>
					</div>
				</div>
				<div className="space-y-3 sm:space-y-4 md:space-y-[20px]">
					<h1 className="mx-5 md:mx-[120px] gilda-font text-base sm:text-lg md:text-xl lg:text-2xl">
						More Event
					</h1>
					<div className="ms-3 sm:ms-4 md:ms-[120px] flex overflow-x-scroll flex-nowrap gap-3 sm:gap-4 md:gap-[40px] scroll-smooth scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent scrollbar-hide">
						<div className="flex-none">
							<DetailEventCard />
						</div>
						<div className="flex-none">
							<DetailEventCard />
						</div>
						<div className="flex-none">
							<DetailEventCard />
						</div>
						<div className="flex-none">
							<DetailEventCard />
						</div>
						<div className="flex-none">
							<DetailEventCard />
						</div>
					</div>
				</div>
			</main>
		</>
	);
}
