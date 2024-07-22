"use client";

import Image from "next/image";
import About from "@/components/about/main";
import Section3 from "@/components/section-3";
import Founder from "@/components/founder/main";
import NetworkSection from "@/components/networkSection";
import styles from "./footer.module.css";
import LinkedinIcon from "@/components/icon/linkedinIcon";
import InstaIcon from "@/components/icon/instaIcon";
import MailIcon from "@/components/icon/mailIcon";
import { ArrowIcon } from "@/components/arrayIcon/main";
import WhatsappIcon from "@/components/icon/whatsappIcon";
import { Gilda_Display } from "next/font/google";
import Link from "next/link";
import { useEffect, useState } from "react";

const gilda = Gilda_Display({ subsets: ["latin"], weight: "400" });

export default function Home() {
  const [burgerStatus, setBurgerStatus] = useState(false);

  function handleBurger() {
    setBurgerStatus(!burgerStatus);
  }

  return (
    <main className="smooth-scroll relative" id="main">
      <div className="sticky top-0 bg-black z-50 flex justify-between py-6 px-4 md:px-[120px] items-center shadow-md">
        <Link className="flex items-center space-x-4 cursor-poointe" href="#main">
          <Image
            src="/assets/logo/business-units/Magna.png"
            alt="Magna Logo"
            width={35}
            height={56}
          />
          <div className="md:text-[24px] text-[18px] font-extrabold">
            Magna Partners
          </div>
        </Link>
        <div className="hidden md:flex space-x-12">
          <Link href="#about" className="cursor-pointer">
            Business Units
          </Link>
          <Link href="#network" className="cursor-pointer">
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
              href="#about"
              className="cursor-pointer"
              onClick={handleBurger}
            >
              Business Units
            </Link>
            <Link
              href="#network"
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
      <div className="flex flex-col items-center">
        <div className="relative min-w-screen h-auto px-5 md:px-[120px] pt-24">
          <div className="absolute bottom-0 -z-10 h-full w-full -mx-5 md:-mx-[120px]">
            <Image
              src="/images/section1-bg.png"
              alt="background-section1"
              objectFit="cover"
              fill
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
              Magna Partners was established in 2024 as a collectively developed
              network of organizations and communities that focused on solving
              the problems of youths: high schoolers, college students, and
              young professionals, with various types of products and services.
            </p>
            <Link className="flex gap-3 items-center" href="#contact">
              <p className="text-lg">Contact Us</p>
              <div className="border border-white/30 p-2 rounded-full">
                <ArrowIcon height={14} width={14} />
              </div>
            </Link>
            <Image
              src="/images/section1-hero.png"
              alt="section1-hero"
              className="w-full"
              width={300}
              height={300}
            />
          </div>
        </div>

        <div id="about">
          <About />
        </div>
        <Section3 />
        <div id="network">
          <NetworkSection />
        </div>
        <Founder />
      </div>
      <div
        id="contact"
        className={`${styles.background} flex flex-col items-center md:p-[80px] space-y-[40px] items-center justify-center`}
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
