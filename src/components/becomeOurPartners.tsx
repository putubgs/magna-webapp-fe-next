import { RightArrowIcon } from "./icons/rightArrowIcon";
import Marquee from "react-fast-marquee";
import { useEffect, useState } from "react";

type PartnersProps = {
	partners: {
		src: string;
		alt: string;
	}[];
};

export const BecomeOurPartners = ({ partners }: PartnersProps) => {
	const [loading, setLoading] = useState(true);
	const [firstLine, setFirstLine] = useState<typeof partners>([]);
	const [secondLine, setSecondLine] = useState<typeof partners>([]);

	useEffect(() => {
		if (partners.length - 1 > 15) {
			const mid = Math.ceil(partners.length / 2);
			const first = partners.slice(0, mid);
			const second = partners.slice(mid);

			setFirstLine(first);
			setSecondLine(second);
		} else {
			setFirstLine(partners);
		}

		const timer = setTimeout(() => {
			setLoading(false);
		}, 100);

		return () => clearTimeout(timer);
	}, []);

	if (!partners || partners.length < 3) return null;

	return (
		<section className="flex flex-col items-center py-[80px] gap-y-[40px]">
			<h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl gilda-font">
				Let's Become Our Partner!
			</h1>
			{loading ? null : (
				<div className="flex flex-col space-y-[16px] items-center w-full max-w-screen">
					{partners.length - 1 <= 5 ? (
						<>
							<ul className="hidden sm:flex">
								{firstLine.map((logo, index) => (
									<li key={index} className="md:mx-4 mx-2">
										<img
											src={logo.src}
											alt={logo.alt}
											className="sm:w-56 rounded-[12px] object-contain"
											loading="lazy"
											style={{ height: "auto" }}
											srcSet={`${logo.src} 1x, ${logo.src.replace(
												".webp",
												"@2x.webp"
											)} 2x`}
										/>
									</li>
								))}
							</ul>
							<Marquee
								style={{
									maskImage:
										"linear-gradient(to right, transparent 0, black 128px, black calc(100% - 128px), transparent 100%)",
								}}
								className="block sm:hidden"
								direction="left"
								speed={50}>
								<ul className="flex sm:hidden">
									{firstLine.map((logo, index) => (
										<li key={index} className="md:mx-4 mx-2">
											<img
												src={logo.src}
												alt={logo.alt}
												className="md:w-56 rounded-[12px] object-contain"
												loading="lazy"
												style={{ height: "auto" }}
												srcSet={`${logo.src} 1x, ${logo.src.replace(
													".webp",
													"@2x.webp"
												)} 2x`}
											/>
										</li>
									))}
								</ul>
							</Marquee>
						</>
					) : (
						<>
							<Marquee direction="left" speed={50}>
								<ul className="flex">
									{firstLine.map((logo, index) => (
										<li key={index} className="md:mx-4 mx-2">
											<img
												src={logo.src}
												alt={logo.alt}
												className="md:w-56 rounded-[12px] object-contain"
												loading="lazy"
												style={{ height: "auto" }}
												srcSet={`${logo.src} 1x, ${logo.src.replace(
													".webp",
													"@2x.webp"
												)} 2x`}
											/>
										</li>
									))}
								</ul>
							</Marquee>
							<Marquee direction="right" speed={50}>
								<ul className="flex">
									{secondLine.map((logo, index) => (
										<li key={index} className="md:mx-4 mx-2">
											<img
												src={logo.src}
												alt={logo.alt}
												className="md:w-56 rounded-[12px] object-contain"
												loading="lazy"
												style={{ height: "auto" }}
												srcSet={`${logo.src} 1x, ${logo.src.replace(
													".webp",
													"@2x.webp"
												)} 2x`}
											/>
										</li>
									))}
								</ul>
							</Marquee>
						</>
					)}
				</div>
			)}
			<button className="flex items-center text-sm md:text-xl font-normal border border-white rounded-full px-7 sm:px-[60px] py-[12px] gap-[10px]">
				Become Our Partner{" "}
				<div className="flex justify-center items-center border border-full rounded-full w-[36px] h-[36px]">
					<RightArrowIcon fill="white" width={16} height={10} />
				</div>
			</button>
		</section>
	);
};
