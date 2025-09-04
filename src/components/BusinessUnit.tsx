import { AboutData } from "@/data/aboutData";
import Header from "@/components/header";
import CountUp from "react-countup";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { UpComingEvents } from "@/components/upComingEvents";
import { iconMapper } from "@/data/iconMapperData";
import { HeroBackground } from "@/components/heroBackground";
import ExitIcon from "@/components/icons/exitIcon";
import { BecomeOurPartners } from "@/components/becomeOurPartners";
import InstaIcon from "@/components/icons/instaIcon";
import MailIcon from "@/components/icons/mailIcon";
import LinkedinIcon from "@/components/icons/linkedinIcon";
import { PreviousEventGallery } from "@/components/previousEventGallery";
import { useParams } from "next/navigation";
import Image from "next/image";

function BusinessUnit() {
	const countUpRef = useRef(null);
	const [inView, setInView] = useState(false);
	const [prevEventGalleryPopUp, setPrevEventGalleryPopUp] =
		useState<boolean>(false);

	// get each bu data by params url
	const { bu } = useParams<{ bu: string }>();

	const buData = AboutData.find(
		(item) => item.title.toLowerCase().replace(/\s+/g, "") == bu
	);

	// reset scroll position
	useLayoutEffect(() => {
		window.scrollTo({ top: 0, left: 0, behavior: "instant" });
	}, []);

	// run the count up when reach the achievement section & scroll effect while pop up
	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setInView(true);
					observer.unobserve(entry.target);
				}
			},
			{ threshold: 0.4 }
		);

		if (countUpRef.current) {
			observer.observe(countUpRef.current);
		}

		if (prevEventGalleryPopUp) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "auto";
		}

		return () => {
			if (countUpRef.current) observer.unobserve(countUpRef.current);
		};
	}, [prevEventGalleryPopUp]);

	return (
		<>
			{/* header */}
			<Header />

			{/* hero section */}
			<section className="relative h-full grid grid-cols-12 space-y-20 sm:space-y-28 md:space-y-56 px-5 md:px-[50px] lg:px-[90px] xl:px-40 2xl:px-56 pt-30 pb-10 sm:py-40">
				<div className="col-span-12 md:col-span-7 space-y-[15px] md:space-y-[30px]">
					<h1 className="text-4xl sm:text-5xl xl:text-7xl font-[600]">
						{buData?.title}
					</h1>
					<h3 className="text-sm md:text-lg xl:text-xl font-[400]">
						{buData?.description}
					</h3>
					<div className="flex items-center gap-x-5">
						{buData?.contacts.top.map((contact, index) => {
							const Icon = iconMapper[contact.icon];
							return (
								<a
									key={index}
									className="w-[50px] h-[50px] flex justify-center items-center border border-white p-3 rounded-full"
									href={`mailto:${buData?.mailLink}`}
									target="_blank"
									rel="noopener noreferrer"
									aria-label={`${buData?.title}'s Email Address`}>
									<Icon size={25} color="#fff" />
								</a>
							);
						})}
					</div>
				</div>
				<div className="ms-10 sm:ms-0 order-first md:order-none col-span-12 md:col-span-5">
					<div className="flex justify-start md:justify-center h-full items-center">
						<div
							className="absolute w-[100px] h-[100px] sm:w-[150px] sm:h-[150px] md:w-[200px] md:h-[200px] lg:w-[250px] xl:w-[300px] lg:h-[250px] xl:h-[300px] rotate-[25deg] rounded-[15px] sm:rounded-[20px] lg:rounded-[30px] transition-transform duration-300 hover-trigger-element"
							style={{ backgroundColor: buData?.bgColor }}></div>
						<div className="absolute w-[100px] h-[100px] sm:w-[150px] sm:h-[150px] md:w-[200px] md:h-[200px] lg:w-[250px] lg:h-[250px] xl:w-[300px] xl:h-[300px] rotate-0 rounded-[15px] sm:rounded-[20px] lg:rounded-[30px] bg-white">
							<div className="flex justify-center items-center h-full">
								<Image
									src={buData?.logo || ''}
									alt={`${buData?.title} logo`}
									className="w-[40px] h-[40px] sm:w-[70px] sm:h-[70px] md:w-[100px] md:h-[100px] lg:w-[150px] lg:h-[150px] xl:w-[200px] xl:h-[200px] object-contain"
								/>
							</div>
						</div>
					</div>
					<HeroBackground haxColor={buData?.bgColor} />
				</div>
				<div className="col-span-12 flex justify-between items-start gap-3 sm:gap-0">
					{buData?.taglines.map((tagline, index) => (
						<div key={index} className="w-[300px] space-y-2">
							<h2 className="text-xs sm:text-2xl xl:text-3xl font-[800]">
								{tagline.title}
							</h2>
							<p className="text-xs sm:text-base xl:text-lg font-[400]">
								{tagline.description}
							</p>
						</div>
					))}
				</div>
			</section>

			{/* up coming events section */}
			{buData?.upComingEventsData && (
				<UpComingEvents upComingEventsData={buData.upComingEventsData} />
			)}

			{/* achievement section */}
			<section
				id="ourCollaboration"
				ref={countUpRef}
				className="relative overflow-hidden flex flex-col items-center text-center space-y-[32px] px-5 sm:px-[50px] lg:px-[90px] xl:px-40 2xl:px-56 py-10 sm:py-[96px]">
				<div className="space-y-[20px] px-0 xl:px-40 2xl:px-72">
					<h2 className="text-base sm:text-2xl font-semibold">
						Why Leading Businesses
					</h2>
					<h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl gilda-font">
						Choose Magna Partners
					</h1>
					<p className="text-xs sm:text-base xl:text-lg font-normal">
						These numbers are more than just figures, they represent our dedication to
						making a meaningful difference and driving progress. We continue to strive
						for excellence, aiming to create even greater impacts in the years to
						come.
					</p>
				</div>
				<div className="w-full flex flex-wrap justify-center md:justify-between gap-[14px] border border-white bg-white/15 backdrop-blur-lg px-1 sm:px-[8px] md:px-[40px] 2xl:px-[80px] py-[30px] rounded-[12px]">
					{buData?.achievements.map((item, i) => (
						<div key={i} className="flex flex-col items-center gap-[12px]">
							<h1 className="text-2xl md:text-3xl xl:text-5xl font-semibold">
								{inView && <CountUp end={item.end} duration={2} />}
								{item.suffix}
							</h1>
							<p className="text-xs md:text-sm lg:text-base font-normal">
								{item.label}
							</p>
						</div>
					))}
				</div>
				<div
					className="absolute -z-10 w-[400px] h-[400px] bg-[#137CF8] rounded-full -left-[50px] bottom-0 blur-[140px]"
					style={{ backgroundColor: buData?.bgColor }}></div>
				<div
					className="absolute -z-10 w-[400px] h-[400px] bg-[#137CF8] rounded-full right-[50px] top-0 blur-[140px]"
					style={{ backgroundColor: buData?.bgColor }}></div>
				<Image
					className="absolute -z-10 bottom-0 left-0 w-full h-full"
					src="/assets/img/impact-img.png"
					alt=""
				/>
			</section>

			{/* let's become our partner section */}
			{buData?.partners && <BecomeOurPartners partners={buData.partners} />}

			{/* clients reviews section */}
			<section
				id="ourImpact"
				className="flex flex-col items-center space-y-[40px] px-5 sm:px-[50px] lg:px-[90px] xl:px-40 2xl:px-80 py-[80px]">
				<h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl gilda-font">
					What They Say?
				</h1>
				<div className="w-full">
					<div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
						{buData?.clientsReviews.map((reviewData, index) => (
							<div
								key={index}
								className="break-inside-avoid border border-[#262626] space-y-[20px] p-[24px] mb-6 w-full">
								<div className="space-y-[4px]">
									<h1 className="text-xs sm:text-base xl:text-lg font-semibold">
										{reviewData.name}
									</h1>
									<h2 className="text-xs sm:text-sm xl:text-base font-normal">
										{reviewData.position}
									</h2>
								</div>
								<p className="text-xs sm:text-sm xl:text-base font-normal">
									&quot;{reviewData.description}&quot;
								</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* previous event gallery section */}
			{prevEventGalleryPopUp && (
				<PreviousEventGallery
					previousEventGalleryData={buData?.previousEventGallery ?? []}
				/>
			)}

			{/* contact section */}
			<section className="text-center flex flex-col items-center gap-y-[40px] px-5 md:px-[50px] py-[80px]">
				<h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl gilda-font">
					How We Can Help You?
				</h1>
				<p className="text-xs sm:text-base xl:text-lg font-normal">
					If you have any issues, please reach out to our designated contact person.
				</p>
				<div className="flex flex-wrap justify-center md:justify-around gap-5 xs:gap-7">
					{buData?.contacts.middle.map((contact, index) => {
						const Icon = iconMapper[contact.icon];
						return (
							<a
								key={index}
								href={contact.link}
								target="_blank"
								rel="noopener noreferrer">
								<button className="flex items-center text-xs sm:text-base xl:text-xl font-normal border border-white rounded-full px-[30px] sm:px-[60px] py-[7px] sm:py-[12px] gap-2 sm:gap-[10px]">
									{contact.title}
									<div className="flex justify-center items-center border border-full rounded-full w-[25px] h-[25px] sm:w-[36px] sm:h-[36px]">
										<Icon size={16} color="white" />
									</div>
								</button>
							</a>
						);
					})}
				</div>
			</section>

			{/* contact section */}
			<section
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
			</section>

			{/* prev event gallery pop up */}
			{prevEventGalleryPopUp && (
				<section className="fixed inset-0 z-50 w-full h-screen bg-black/80 grid grid-cols-12 items-center">
					<div className="col-start-2 col-end-12 sm:col-start-3 sm:col-end-11 xl:col-start-5 xl:col-end-9 flex flex-col items-end gap-y-[10px]">
						<ExitIcon
							onClick={() => setPrevEventGalleryPopUp(false)}
							size={20}
							color="white"
						/>
						<div className="relative w-full h-[300px] sm:h-[500px] rounded-[8px]">
							<Image
								className="w-full h-full object-cover rounded-[8px]"
								src="/assets/img/prevEventImage.png"
								alt="Previous Event Image"
							/>
							<div className="absolute top-0 z-10 w-full h-full bg-black/10 rounded-[8px]"></div>
							<div className="absolute bottom-5 left-3 space-y-[12px]">
								<p className="bg-gradient-to-r from-[#82cfff] to-[#B2EBFF] text-transparent bg-clip-text font-semibold backdrop-blur-xl px-[12px] py-[4px] rounded-[8px]">
									March 03, 2024
								</p>
								<h1 className="text-2xl font-bold text-white">Judul Event</h1>
							</div>
						</div>
					</div>
				</section>
			)}
		</>
	);
}

export default BusinessUnit;
