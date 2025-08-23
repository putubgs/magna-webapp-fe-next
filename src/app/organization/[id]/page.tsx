"use client";

import { ArrowIcon } from "@/components/icons/arrowIcon";
import ChatIcon from "@/components/icons/chatIcon";
import InstaIcon from "@/components/icons/instaIcon";
import LinkedinIcon from "@/components/icons/linkedinIcon";
import MailIcon from "@/components/icons/mailIcon";
import PreviousEventCard from "@/components/PreviousEventCard";
import TestimonyCard from "@/components/TestimonyCard";
import UpcomingEventCard from "@/components/UpcomingEventCard";
import UpcomingEventSwiper from "@/components/UpcomingEventSwiper";
import { logos, logos2 } from "@/data/companyData";
import { gilda } from "@/lib/fonts";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import CountUp from "react-countup";
import Marquee from "react-fast-marquee";
import { Swiper, SwiperSlide } from "swiper/react";

export default function OrganizationPage() {
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
    <div>
      <nav className="sticky top-0 bg-black z-40 flex justify-between py-6 px-4 md:px-[120px] items-center shadow-md">
        <Link
          className="flex items-center space-x-4 cursor-poointe"
          href="#main"
        >
          <Image
            src="/assets/logo/business-units/Magna.png"
            alt="Magna Logo"
            width={30}
            height={56}
            style={{ width: "auto", height: "auto" }}
          />

          <div className="md:text-[24px] text-[18px] font-extrabold">
            Magna Partners
          </div>
        </Link>
        <div className="hidden md:flex space-x-12">
          <Link href="#events" className="cursor-pointer">
            Our Event
          </Link>
          <Link href="#partnership" className="cursor-pointer">
            Our Collaboration
          </Link>
          <Link href="#impact" className="cursor-pointer">
            Our Impact
          </Link>
          <Link href="#contact" className="cursor-pointer">
            Contact Us
          </Link>
        </div>
        <div
          className={`block md:hidden ham-menu ${burgerStatus ? "active" : ""}`}
          onClick={handleBurger}
        >
          <span></span>
          <span></span>
        </div>
        {burgerStatus && (
          <div className="flex flex-col bg-black w-48 h-40 rounded-xl absolute right-6 top-20 p-4 z-99 space-y-[12px] md:hidden">
            <Link
              href="#events"
              className="cursor-pointer"
              onClick={handleBurger}
            >
              Our Event
            </Link>
            <Link
              href="#partnership"
              className="cursor-pointer"
              onClick={handleBurger}
            >
              Our Collaboration
            </Link>
            <Link
              href="#impact"
              className="cursor-pointer"
              onClick={handleBurger}
            >
              Our Impact
            </Link>
            <Link
              href="#contact"
              className="cursor-pointer"
              onClick={handleBurger}
            >
              Contact Us
            </Link>
          </div>
        )}
      </nav>
      <main className="text-lg">
        <section className="md:min-h-screen overflow-hidden flex md:justify-center flex-col md:items-center pt-16 md:pt-32 pb-12 md:pb-20 gap-10 md:gap-44 relative z-0">
          <div className="absolute -bottom-1/2 md:bottom-0 -z-10 h-screen w-full">
            <Image
              src="/assets/img/magna-hero-background-blue.webp"
              alt="background-section1"
              className="object-cover"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 90vw"
              priority
            />
          </div>
          <div className="px-4 md:px-[120px] flex flex-col-reverse md:flex-row md:items-center md:justify-between gap-10 md:gap-32">
            <div className="space-y-7">
              <h2 className="font-semibold text-4xl md:text-7xl">BU Slogan</h2>
              <p className="text-sm md:text-xl">
                Connecting top companies with motivated students through job
                fairs, CV reviews, and career prep programs.
              </p>
              <div className="flex items-center gap-3">
                <Link
                  href={`mailto:${"magnainitiatives.id@gmail.com"}`}
                  target="_blank"
                  aria-label={`${"BU"}'s Email Address`}
                  className="border rounded-full p-2 border-white/20"
                >
                  <MailIcon size={18} color="#FFFFFF" />
                </Link>

                <Link
                  href={`https://www.instagram.com/`}
                  target="_blank"
                  aria-label={`${"BU"}'s Instagram`}
                  className="border rounded-full p-2 border-white/20"
                >
                  <InstaIcon size={18} color="#FFFFFF" />
                </Link>
                <Link
                  href={`https://www.linkedin.com/`}
                  target="_blank"
                  aria-label={`${"BU"}'s Instagram`}
                  className="border rounded-full p-2 border-white/20"
                >
                  <LinkedinIcon size={18} color="#FFFFFF" />
                </Link>
              </div>
            </div>
            <div className="ml-4 md:m-0 size-[70px] md:size-52 shrink-0 flex items-center justify-center relative bg-white rounded-[14px] md:rounded-[20px]">
              <div className="size-[70px] md:size-52 bg-blue-500 rounded-[14px] md:rounded-[20px] absolute rotate-[25deg] -z-10 top-0 left-0"></div>
              <Image
                src={"/assets/logo/business-units/ltw-logo-lg.png"}
                alt={`${"BU"} logo`}
                width={37}
                height={37}
                className="size-[37px] md:size-[130px] object-contain"
              />
            </div>
          </div>
          <div className="px-4 md:px-[120px] grid grid-cols-3 gap-5 md:gap-24 text-xs md:text-lg">
            <div className="space-y-5 w-full">
              <h3 className="font-extrabold md:text-3xl">Tagline</h3>
              <p>
                Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem
                ipsum dolor sit amet Lorem .
              </p>
            </div>
            <div className="space-y-5 w-full">
              <h3 className="font-extrabold md:text-3xl">Tagline</h3>
              <p>
                Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem
                ipsum dolor sit amet Lorem .
              </p>
            </div>
            <div className="space-y-5 w-full">
              <h3 className="font-extrabold md:text-3xl">Tagline</h3>
              <p>
                Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem
                ipsum dolor sit amet Lorem .
              </p>
            </div>
          </div>
        </section>

        <section
          id="events"
          className="flex flex-col px-4 md:px-[120px] items-center pt-20 md:pt-28 pb-20 justify-center gap-14 text-sm md:text-lg"
        >
          <div className="space-y-5 text-center">
            <h2 className={`${gilda.className} text-2xl md:text-5xl`}>
              Up Coming Events
            </h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
              varius, lorem quis tempor suscipit, nisl enim pellentesque turpis,
            </p>
          </div>
          <UpcomingEventSwiper />
        </section>

        <section id="impact" className="text-center relative w-full z-0">
          <div className="absolute w-full h-full -z-10">
            <Image
              src="/assets/img/impact-bu.png"
              alt="Background Image"
              fill
              quality={75}
              className="md:object-cover"
            />
          </div>

          <div className="md:px-[120px] px-5 py-8 md:py-[96px] flex flex-col items-center max-w-screen-2xl mx-auto">
            <div className="max-w-[730px]">
              <h2 className="font-semibold md:text-2xl space-y-2 [&>span]:block">
                <span>Why Leading Businesses</span>
                <span
                  className={`${gilda.className} font-normal md:text-5xl text-[24px] font-gilda-display`}
                >
                  Choose Magna Partners
                </span>
              </h2>
              <p className="mt-5">
                These numbers are more than just figures, they represent our
                dedication to making a meaningful difference and driving
                progress. We continue to strive for excellence, aiming to create
                even greater impacts in the years to come.
              </p>
            </div>
            <div className="w-full mt-[33px] mx-20 flex flex-wrap px-7 lg:px-0 justify-between gap-5">
              <div className="flex justify-center lg:justify-between w-full gap-5 flex-wrap border-white border-[0.5px] rounded-xl py-6 px-2 lg:px-[80px] bg-white/[8%]">
                <div className="flex flex-col items-center space-y-1 md:space-y-3">
                  <h3 className="font-semibold text-2xl md:text-4xl lg:text-5xl">
                    <CountUp
                      start={0}
                      end={37}
                      suffix="k+"
                      enableScrollSpy
                      scrollSpyOnce
                    >
                      {({ countUpRef }) => <span ref={countUpRef} />}
                    </CountUp>
                  </h3>
                  <p className="text-xs md:text-base text-center max-w-[80px] md:max-w-fit">
                    Event Registrants
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-1 md:space-y-3">
                  <h3 className="font-semibold text-2xl md:text-4xl lg:text-5xl">
                    <CountUp
                      start={0}
                      end={200}
                      suffix="k+"
                      enableScrollSpy
                      scrollSpyOnce
                    >
                      {({ countUpRef }) => <span ref={countUpRef} />}
                    </CountUp>
                  </h3>
                  <p className="text-xs md:text-base text-center max-w-[80px] md:max-w-fit">
                    Social Media Followers
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-1 md:space-y-3">
                  <h3 className="font-semibold text-2xl md:text-4xl lg:text-5xl">
                    <CountUp
                      start={0}
                      end={300}
                      suffix="+"
                      enableScrollSpy
                      scrollSpyOnce
                    >
                      {({ countUpRef }) => <span ref={countUpRef} />}
                    </CountUp>
                  </h3>
                  <p className="text-xs md:text-base text-center max-w-[80px] md:max-w-fit">
                    Universities Reached
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-1 md:space-y-3">
                  <h3 className="font-semibold text-2xl md:text-4xl lg:text-5xl">
                    <CountUp
                      start={0}
                      end={500}
                      suffix="+"
                      enableScrollSpy
                      scrollSpyOnce
                    >
                      {({ countUpRef }) => <span ref={countUpRef} />}
                    </CountUp>
                  </h3>
                  <p className="text-xs md:text-base text-center max-w-[80px] md:max-w-fit">
                    Partnerships
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-1 md:space-y-3">
                  <h3 className="font-semibold text-2xl md:text-4xl lg:text-5xl">
                    <CountUp
                      start={0}
                      end={30}
                      suffix="+"
                      enableScrollSpy
                      scrollSpyOnce
                    >
                      {({ countUpRef }) => <span ref={countUpRef} />}
                    </CountUp>
                  </h3>
                  <p className="text-xs md:text-base text-center max-w-[80px] md:max-w-fit">
                    Company Partnerships
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="partnership"
          className="flex flex-col items-center py-20 gap-10"
        >
          <div
            className={`${gilda.className} font-normal md:text-5xl text-2xl`}
          >
            Our Collaborative Network
          </div>
          {loading ? (
            <></>
          ) : (
            <div className="flex flex-col space-y-[16px] items-center w-full max-w-screen [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
              <Marquee direction="left" speed={50}>
                <ul className="flex">
                  {logos.map((logo, index) => (
                    <li key={index} className="md:mx-4 mx-2">
                      <img
                        src={logo.src}
                        alt={logo.alt}
                        className="md:w-56 rounded-[12px] object-contain"
                        loading="lazy"
                        style={{ height: "auto" }}
                        srcSet={`
              ${logo.src} 1x,
              ${logo.src.replace(".webp", "@2x.webp")} 2x
            `}
                      />
                    </li>
                  ))}
                </ul>
              </Marquee>
              <Marquee direction="right" speed={50}>
                <ul className="flex">
                  {logos2.map((logo, index) => (
                    <li key={index} className="md:mx-4 mx-2">
                      <img
                        src={logo.src}
                        alt={logo.alt}
                        className="md:w-56 rounded-[12px] object-contain"
                        loading="lazy"
                        style={{ height: "auto" }}
                        srcSet={`
              ${logo.src} 1x,
              ${logo.src.replace(".webp", "@2x.webp")} 2x
            `}
                      />
                    </li>
                  ))}
                </ul>
              </Marquee>
            </div>
          )}
          <Link href={"/"}>
            <button className="text-sm md:text-xl flex items-center gap-[10px] py-3 px-16 rounded-full border border-neutral-700 mt-9">
              <span>Become Our Partner</span>
              <div className="border border-neutral-700 rounded-full p-2">
                <ArrowIcon height={10} width={16} />
              </div>
            </button>
          </Link>
        </section>

        <section className="flex gap-8 flex-col items-center py-12 px-4 md:px-[120px]">
          <h2 className={`${gilda.className} text-2xl md:text-5xl`}>
            What They Say?
          </h2>
          <div className="flex gap-[10px] [&>div]:space-y-[10px]">
            <div className="hidden basis-1/3 md:block">
              <TestimonyCard
                name="Sophia Rodriguez"
                company="Bright Ideas Consulting"
                text="Evoke exceeded our expectations. They turned our vision into reality, refining our offerings and boosting revenue."
              />
              <TestimonyCard
                name="Sophia Rodriguez"
                company="Bright Ideas Consulting"
                text="Evoke exceeded our expectations. They turned our vision into reality, refining our."
              />
            </div>
            <div className="basis-1/2 md:basis-1/3">
              <TestimonyCard
                name="Sophia Rodriguez"
                company="Bright Ideas Consulting"
                text="Evoke exceeded our expectations. They turned our vision into reality, refining our offerings and boosting revenue. Their expertise propelled us to new heights."
              />
              <TestimonyCard
                name="Sophia Rodriguez"
                company="Bright Ideas Consulting"
                text="Evoke exceeded our expectations. They turned our vision into reality, refining our."
              />
            </div>
            <div className="basis-1/2 md:basis-1/3">
              <TestimonyCard
                name="Sophia Rodriguez"
                company="Bright Ideas Consulting"
                text="Loorem ipsum dolor sit amet"
              />
              <TestimonyCard
                name="Sophia Rodriguez"
                company="Bright Ideas Consulting"
                text="Evoke exceeded our expectations. They turned our vision into reality, refining our."
              />
            </div>
          </div>
        </section>

        <section className="px-4 md:px-[120px] text-center gap-5 flex-col flex items-center justify-center pt-7 md:pt-20 pb-9 md:pb-24 text-xs md:text-base">
          <h2 className={`${gilda.className} text-2xl md:text-5xl`}>
            Previous Event Gallery
          </h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut varius,
            lorem quis tempor suscipit, nisl enim pellentesque turpis,
          </p>
          <div className="pt-14 w-full">
            <Swiper
              slidesPerView={2}
              breakpoints={{
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 24,
                },
              }}
              spaceBetween={20}
              className="md:w-4/5"
            >
              {[...Array(6)].map((_, index) => (
                <SwiperSlide key={index}>
                  <PreviousEventCard />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>

        <section
          id="contact"
          className="px-4 md:px-[120px] text-center gap-5 flex-col flex items-center justify-center pt-7 md:pt-20 pb-9 md:pb-24 text-xs md:text-base"
        >
          <h2 className={`${gilda.className} text-2xl md:text-5xl`}>
            How We Can Help You?
          </h2>
          <p>
            If you have any issues, please reach out to our designated contact
            person.
          </p>
          <div className="pt-5 flex gap-5 md:gap-10">
            <Link href={"/"}>
              <button className="text-xs md:text-xl flex items-center gap-[10px] py-1 md:py-3 px-5 md:px-10 rounded-full border border-neutral-700 mt-9">
                <span>Name</span>
                <div className="border border-neutral-700 rounded-full p-2">
                  <ChatIcon className="size-[10px] md:size-6" />
                </div>
              </button>
            </Link>
            <Link href={"/"}>
              <button className="text-xs md:text-xl flex items-center gap-[10px] py-1 md:py-3 px-5 md:px-10 rounded-full border border-neutral-700 mt-9">
                <span>Name</span>
                <div className="border border-neutral-700 rounded-full p-2">
                  <ChatIcon className="size-[10px] md:size-6" />
                </div>
              </button>
            </Link>
          </div>
        </section>
      </main>
      <footer
        className={`footer-background flex flex-col items-center md:p-[80px] space-y-[40px] justify-center`}
      >
        <div className="flex flex-col items-center text-[16px] text-center">
          <div className="md:text-[24px] text-[16px]">Contact Us</div>
          <div className={`${gilda.className} md:text-[48px] text-[32px]`}>
            Stay connected with Magna Partners!
          </div>
        </div>
        <div className="flex gap-y-6 md:gap-x-[60px] gap-x-[25px]">
          <Link
            className="flex md:space-x-3 space-x-0 items-center"
            href="https://www.instagram.com/magna.partners/"
            target="_blank"
          >
            <div className="md:flex hidden items-center justify-center rounded-full border border-white w-[30px] h-[30px]">
              <InstaIcon size={15} color="white" />
            </div>
            <div
              className="flex md:hidden items-center justify-center rounded-full border border-white w-[50px] h-[50px]"
              aria-label="Magna Partners Instagram"
            >
              <InstaIcon size={25} color="white" />
            </div>
            <div className="md:flex hidden">@magna.partners</div>
          </Link>
          <Link
            className="flex md:space-x-3 space-x-0 items-center"
            href="mailto:magnainitiatives.id@gmail.com"
          >
            <div className="md:flex hidden items-center justify-center rounded-full border border-white w-[30px] h-[30px]">
              <MailIcon size={15} color="white" />
            </div>
            <div
              className="flex md:hidden items-center justify-center rounded-full border border-white w-[50px] h-[50px]"
              aria-label="Magna Partners Email"
            >
              <MailIcon size={25} color="white" />
            </div>
            <div className="md:flex hidden">magnainitiatives.id@gmail.com</div>
          </Link>
          <Link
            className="flex md:space-x-3 space-x-0 items-center"
            href="https://www.linkedin.com/company/magna-id/"
            target="_blank"
          >
            <div className="md:flex hidden items-center justify-center rounded-full border border-white w-[30px] h-[30px]">
              <LinkedinIcon size={15} color="white" />
            </div>
            <div
              className="flex md:hidden items-center justify-center rounded-full border border-white w-[50px] h-[50px]"
              aria-label="Magna Partners LinkedIn"
            >
              <LinkedinIcon size={25} color="white" />
            </div>
            <div className="md:flex hidden">Magna Partners</div>
          </Link>
        </div>
      </footer>
    </div>
  );
}
