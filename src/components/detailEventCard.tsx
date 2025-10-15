import { CalendarDays, Clock } from "lucide-react";
import Image from "next/image";

export default function DetailEventCard() {
	return (
		<>
			<div className="w-64 md:w-80 lg:w-[400px] rounded-b-xl overflow-hidden">
				<Image
					className="h-40 md:h-48 lg:h-[250px] object-cover object-top"
					width={500}
					height={500}
					src={"/assets/img/event-poster-dummy.png"}
					alt={"event poster image"}
				/>
				<div className="border-l-2 border-b-2 border-r-2 border-[#262626] p-4 md:p-6 lg:p-[36px] rounded-b-xl space-y-2 md:space-y-3 lg:space-y-[12px]">
					<div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 md:gap-0">
						<div className="flex items-center gap-1 md:gap-[4px]">
							<CalendarDays width={18} height={18} color="#A3A3A3" />
							<p className="text-xs md:text-sm text-[#A3A3A3]">September 17, 2022</p>
						</div>
						<div className="flex items-center gap-1 md:gap-[4px]">
							<Clock width={18} height={18} color="#A3A3A3" />
							<p className="text-xs md:text-sm text-[#A3A3A3]">10 .00 - 12.00 WIB</p>
						</div>
					</div>
					<h1 className="text-base md:text-lg lg:text-xl font-bold">
						Desgining User Friendly Apps for the Masses
					</h1>
					<button className="w-full md:w-auto bg-transparent border border-white rounded-full py-2 md:py-3 lg:py-[14px] px-4 md:px-6 lg:px-[28px] text-xs md:text-sm lg:text-base">
						Register Now
					</button>
				</div>
			</div>
		</>
	);
}
