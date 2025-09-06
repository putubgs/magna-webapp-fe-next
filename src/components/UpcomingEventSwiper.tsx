import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ArrowLeftShortIcon from "./icons/arrowLeftShortIcon";
import ArrowRightShortIcon from "./icons/arrowRIghtShortIcon";
import UpcomingEventCard from "./UpcomingEventCard";

export default function UpcomingEventSwiper() {
	return (
		<div className="w-full md:w-4/5">
			<Swiper
				slidesPerView={1}
				spaceBetween={20}
				modules={[Navigation]}
				navigation={{
					prevEl: ".prev",
					nextEl: ".next",
				}}>
				<SwiperSlide>
					<UpcomingEventCard />
				</SwiperSlide>
				<SwiperSlide>
					<UpcomingEventCard />
				</SwiperSlide>
			</Swiper>
			<div className="mt-6 gap-6 flex justify-center">
				<button className="prev border border-white p-[13px] rounded-lg disabled:bg-neutral-800 disabled:text-neutral-500 disabled:border-neutral-800">
					<ArrowLeftShortIcon className="size-4" />
				</button>
				<button className="next border border-white p-[13px] rounded-lg disabled:bg-neutral-800 disabled:text-neutral-500 disabled:border-neutral-800">
					<ArrowRightShortIcon className="size-4" />
				</button>
			</div>
		</div>
	);
}
