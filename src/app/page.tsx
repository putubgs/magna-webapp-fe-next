"use client";

import Image from "next/image";
import LinkedinIcon from "@/components/icons/linkedinIcon";
import InstaIcon from "@/components/icons/instaIcon";
import MailIcon from "@/components/icons/mailIcon";
import { ArrowIcon } from "@/components/icons/arrowIcon";
import WhatsappIcon from "@/components/icons/whatsappIcon";
import { Gilda_Display } from "next/font/google";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AboutCard } from "@/components/aboutCards";
import CountUp from "react-countup";
import { logos, logos2 } from "@/data/companyData";
import { AboutData } from "@/data/aboutData";
import Marquee from "react-fast-marquee";

const gilda = Gilda_Display({ subsets: ["latin"], weight: "400" });

export default function Home() {
  const [burgerStatus, setBurgerStatus] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state

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
    <main className="smooth-scroll relative" id="main">
      <div className="sticky top-0 bg-black z-[50] flex justify-between py-6 px-4 md:px-[120px] items-center shadow-md">
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
          <Link href="#organizations" className="cursor-pointer">
            Organizations
          </Link>
          <Link href="#partnership" className="cursor-pointer">
            Partnership
          </Link>
          <Link href="#contact" className="cursor-pointer">
            Contact
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
          <div className="flex flex-col bg-black w-48 h-40 rounded-xl absolute right-6 top-20 p-4 z-99 space-y-[12px] block md:hidden">
            <Link
              href="#organizations"
              className="cursor-pointer"
              onClick={handleBurger}
            >
              Organizations
            </Link>
            <Link
              href="#partnership"
              className="cursor-pointer"
              onClick={handleBurger}
            >
              Partnership
            </Link>
            <Link
              href="#contact"
              className="cursor-pointer"
              onClick={handleBurger}
            >
              Contact
            </Link>
          </div>
        )}
      </div>
      <div id="hero">
        <div className="flex flex-col items-center">
          <div className="relative min-w-screen h-auto px-5 md:px-[120px] pt-24">
            <div className="absolute bottom-0 -z-10 h-full w-full -mx-5 md:-mx-[120px]">
              <Image
                src="/assets/img/magna-hero-background.webp"
                alt="background-section1"
                className="object-cover"
                fill
                sizes="90vw"
                priority
              />
            </div>
            <div className="flex flex-col gap-12 w-full">
              <h1 className="text-4xl md:text-7xl">
                <p className="mb-3">
                  We&apos;re <b>Magna</b>
                </p>
                <p>
                  Greatness <span className={gilda.className}>Start Here</span>
                </p>
              </h1>
              <p className="text-lg font-medium text-white/70">
                Magna Partners was established in 2024 as a collectively
                developed network of organizations and communities that focused
                on solving the problems of youths: high schoolers, college
                students, and young professionals, with various types of
                products and services.
              </p>
              <Link className="flex gap-3 items-center" href="#contact">
                <p className="text-lg">Contact Us</p>
                <div className="border border-white/30 p-2 rounded-full">
                  <ArrowIcon height={14} width={14} />
                </div>
              </Link>
              <Image
                src="/assets/img/magna-hero-banner.webp"
                alt="section1-hero"
                className="w-full"
                width={300}
                height={300}
              />
            </div>
          </div>
        </div>
        <div id="organizations">
          <div className="py-[80px] px-5">
            <div className="text-center max-w-[730px] mx-auto space-y-[8px]">
              <p className="text-base lg:text-2xl font-semibold">About</p>
              {/* change this font style */}
              <p
                className={`${gilda.className} text-2xl lg:text-5xl font-gilda-display`}
              >
                Magna Organizations
              </p>
              <p className="text-sm lg:text-base">
                Discover the diverse landscape of Magna Organizations, each
                dedicated to innovation and excellence in their respective
                fields
              </p>
            </div>
            {/* max-w can be remove if the width already set in the main page */}
            <div className="flex gap-2 md:gap-4 lg:gap-8 justify-center flex-wrap mt-10 max-w-full">
              <AboutCard abouts={AboutData} />
            </div>
          </div>
        </div>
        <section className="text-center relative w-full z-0">
          <div className="absolute w-full h-full -z-10">
            <Image
              src={"/assets/img/impact-img.png"}
              alt="Background Image"
              fill
            />
          </div>

          <div className="md:px-[120px] px-5 py-[96px] flex flex-col items-center max-w-screen-2xl mx-auto">
            <div className="max-w-[730px]">
              <h2 className="font-semibold md:text-2xl space-y-2 [&>span]:block">
                <span>Why Leading Businesses</span>
                <span
                  className={`${gilda.className} font-normal md:text-5xl text-[24px] font-gilda-display`}
                >
                  Choose Magna Partners
                </span>
              </h2>
              <p className="mt-5 md:text-[20]">
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
        <div id="partnership">
          <div className="flex flex-col items-center py-20 space-y-10">
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
                          className="md:w-56 md:h-28 rounded-[12px]"
                          loading="lazy"
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
                          className="md:w-56 md:h-28 rounded-[12px]"
                          loading="lazy"
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
          </div>
        </div>
        <div id="founder">
          <div className="w-full max-w-full px-5 md:px-[120px] pt-[36px] pb-[96px]">
            <div className="flex flex-col-reverse md:flex-row gap-5 md:gap-20">
              <div className="relative w-[350px] h-[340px] md:h-[288px] rounded-[12px]">
                <Image
                  src="/assets/founder-photo.png"
                  alt="Founder Photo"
                  priority
                  width={350}
                  height={288}
                  className="w-full h-full object-cover rounded-[12px] "
                />
              </div>
              <div className="w-full md:w-[754px] min-h-[288px] flex flex-col ">
                <div className="h-auto md:h-[92px] flex flex-col gap-[8px]">
                  <p className="text-base md:text-xl lg:text-3xl font-semibold">
                    A Message
                  </p>
                  {/* change this font style */}
                  <p
                    className={`${gilda.className} text-2xl md:text-3xl lg:text-5xl font-gilda-display`}
                  >
                    From The Founder
                  </p>
                </div>
                <div className="h-auto md:h-[98px] flex flex-col gap-2 md:gap-2.5 lg:gap-[26px] md:mt-0 mt-[24px] space-y-[26px] md:space-y-0">
                  <p className="text-base pt-2">
                    The main &apos;thrust&apos; is to focus on educating
                    attendees on how to best protect highly vulnerable business
                    applications with interactive panel discussions and
                    roundtables led by subject matter experts.
                  </p>
                  <p className="text-base">
                    Micah Davis - Founder of Magna Partners
                  </p>
                </div>
                <div className="flex-1 flex items-center md:items-end">
                  <div className="flex items-center px-[29px] py-[13px] h-[50px] rounded-3xl border border-white md:mt-0 mt-[24px]">
                    <Link
                      className="font-gilda-display"
                      href={"https://www.google.com/"}
                      target="_blank"
                    >
                      Know More About Micah
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex w-full gap-[30px] pt-10">
              <p className="whitespace-nowrap">
                More of Micah’s crafted products.
              </p>
              {/* white line */}
              <div className="w-full justify-center items-center flex">
                <div className="w-full bg-white h-[1px]"></div>
              </div>
            </div>
            <div className="flex flex-wrap justify-between items-center pt-5">
              <Image
                src="/assets/logo/founder-projects/project-5.png"
                width={130}
                height={130}
                alt="Project 1 Image"
                className="w-[68px] md:w-[130px]"
              />

              <Image
                src="/assets/logo/founder-projects/project-1.png"
                width={40}
                height={40}
                alt="Project 1 Image"
                className="w-[19px] md:w-[40px]"
              />

              <Image
                src="/assets/logo/founder-projects/project-4.png"
                width={60}
                height={60}
                alt="Project 1 Image"
                className="w-[45px] md:w-[60px]"
              />

              <Image
                src="/assets/logo/founder-projects/project-2.png"
                width={81}
                height={81}
                alt="Project 1 Image"
                className="w-[52px] md:w-[81px]"
              />

              <Image
                src="/assets/logo/founder-projects/project-3.png"
                width={116}
                height={116}
                alt="Project 1 Image"
                className="w-[88px] md:w-[116px]"
              />
            </div>
          </div>
        </div>
      </div>
      <div
        id="contact"
        className={`footer-background flex flex-col items-center md:p-[80px] space-y-[40px] justify-center`}
      >
        <div className="flex flex-col items-center text-[16px] text-center">
          <div className="md:text-[24px] text-[16px]">Contact Us</div>
          <div className={`${gilda.className} md:text-[48px] text-[32px]`}>
            Stay connected with Magna Partners!
          </div>
        </div>
        <div className="grid grid-cols-2 gap-y-6 md:gap-x-[100px] gap-x-[15px]">
          <Link className="flex space-x-3 items-center" href="#">
            <div className="flex items-center justify-center rounded-full border border-white w-[30px] h-[30px]">
              <MailIcon size={15} color="white" />
            </div>
            <div>@magna.partners</div>
          </Link>
          <Link
            className="flex space-x-3 items-center text-end"
            href="https://www.instagram.com/magna.partners/"
            target="_blank"
          >
            <div className="flex items-center justify-center rounded-full border border-white w-[30px] h-[30px]">
              <InstaIcon size={15} color="white" />
            </div>
            <div>@magna.partners</div>
          </Link>
          <Link className="flex space-x-3 items-center" href="#">
            <div className="flex items-center justify-center rounded-full border border-white w-[30px] h-[30px]">
              <WhatsappIcon size={15} color="white" />
            </div>
            <div>+628999009029</div>
          </Link>
          <Link
            className="flex space-x-3 items-center"
            href="https://www.linkedin.com/company/magna-id/"
            target="_blank"
          >
            <div className="flex items-center justify-center rounded-full border border-white w-[30px] h-[30px]">
              <LinkedinIcon size={15} color="white" />
            </div>
            <div>Magna Partners</div>
          </Link>
        </div>
      </div>
    </main>
  );
}
