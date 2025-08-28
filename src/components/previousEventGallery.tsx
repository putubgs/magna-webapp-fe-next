import { useRef, useState, useEffect } from "react";
import { LeftArrowIcon } from "./icons/leftArrowIcon";
import { RightArrowIcon } from "./icons/rightArrowIcon";

type PreviousEventGalleryProps = {
	previousEventGalleryData: {
		title: string;
		date: string;
		imageUrl: string;
	}[];
};

export const PreviousEventGallery = ({
	previousEventGalleryData,
}: PreviousEventGalleryProps) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const [currentIndex, setCurrentIndex] = useState(0);
	const cardSize = 304 + 16;

	const scrollToCenter = () => {
		if (containerRef.current) {
			const container = containerRef.current;
			const containerSize = container.offsetWidth;
			const scrollX = currentIndex * cardSize - (containerSize - cardSize) / 2;

			container.scrollTo({
				left: scrollX,
				behavior: "smooth",
			});
		}
	};

	useEffect(() => {
		scrollToCenter();
	}, [currentIndex]);

	const handleNext = () => {
		if (currentIndex < previousEventGalleryData.length - 1) {
			setCurrentIndex((prev) => prev + 1);
		}
	};

	const handlePrev = () => {
		if (currentIndex > 0) {
			setCurrentIndex((prev) => prev - 1);
		}
	};

	return (
		<section className="px-5 sm:px-[50px] lg:px-[90px] xl:px-40 2xl:px-56 py-[40px] space-y-[40px]">
			<div className="text-center flex flex-col items-center gap-y-[20px] md:px-[90px] 2xl:px-96">
				<h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl gilda-font">
					Previous Event Gallery
				</h1>
				<p className="text-xs sm:text-base xl:text-lg font-normal">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut varius, lorem
					quis tempor suscipit, nisl enim pellentesque turpis.
				</p>
			</div>
			<div className="relative">
				{previousEventGalleryData.length - 1 <= 3 ? (
					<div
						ref={containerRef}
						className="flex justify-start md:justify-center overflow-x-scroll scroll-smooth gap-4 no-scrollbar">
						{previousEventGalleryData.map((event, index) => (
							<div
								key={index}
								className={`w-[304px] h-[304px] rounded-[8px] shrink-0 relative cursor-pointer ${
									index === currentIndex ? "z-0" : "opacity-30"
								} transition-transform duration-300`}>
								<img
									className="w-full h-full object-cover rounded-[8px]"
									src={event.imageUrl}
									alt="Previous Event"
								/>
								<div className="absolute top-0 z-10 w-full h-full bg-black/10 rounded-[8px]"></div>
								<div className="absolute bottom-5 left-3 space-y-[12px]">
									<p className="bg-gradient-to-r from-[#82cfff] to-[#B2EBFF] text-transparent bg-clip-text font-semibold backdrop-blur-xl px-[12px] py-[4px] rounded-[8px]">
										{event.date}
									</p>
									<h1 className="text-2xl font-bold text-white">{event.title}</h1>
								</div>
							</div>
						))}
					</div>
				) : (
					<div
						ref={containerRef}
						className="flex justify-start overflow-x-scroll scroll-smooth gap-4 no-scrollbar">
						{previousEventGalleryData.map((event, index) => (
							<div
								key={index}
								className={`w-[304px] h-[304px] rounded-[8px] shrink-0 relative cursor-pointer ${
									index === currentIndex ? "z-0" : "opacity-30"
								} transition-transform duration-300`}>
								<img
									className="w-full h-full object-cover rounded-[8px]"
									src={event.imageUrl}
									alt="Previous Event"
								/>
								<div className="absolute top-0 z-10 w-full h-full bg-black/10 rounded-[8px]"></div>
								<div className="absolute bottom-5 left-3 space-y-[12px]">
									<p className="bg-gradient-to-r from-[#82cfff] to-[#B2EBFF] text-transparent bg-clip-text font-semibold backdrop-blur-xl px-[12px] py-[4px] rounded-[8px]">
										{event.date}
									</p>
									<h1 className="text-2xl font-bold text-white">{event.title}</h1>
								</div>
							</div>
						))}
					</div>
				)}

				<div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-3">
					<button
						onClick={handlePrev}
						disabled={currentIndex === 0}
						className={`p-[13px] rounded-[8px] ${
							currentIndex === 0
								? "bg-[#262626] border border-transparent"
								: "bg-transparent border border-white"
						}`}>
						<LeftArrowIcon
							fill={currentIndex === 0 ? "#737373" : "white"}
							width={18}
							height={16}
						/>
					</button>
					<button
						onClick={handleNext}
						disabled={currentIndex === previousEventGalleryData.length - 1}
						className={`p-[13px] rounded-[8px] ${
							currentIndex === previousEventGalleryData.length - 1
								? "bg-[#262626] border border-transparent"
								: "bg-transparent border border-white"
						}`}>
						<RightArrowIcon
							fill={
								currentIndex === previousEventGalleryData.length - 1
									? "#737373"
									: "white"
							}
							width={18}
							height={16}
						/>
					</button>
				</div>
			</div>
		</section>
	);
};
