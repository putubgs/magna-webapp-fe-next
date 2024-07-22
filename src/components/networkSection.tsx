import React, { useEffect, useState } from "react";
import PartnerType from "@/types/Partner";
import Marquee from "./marquee";

function shuffleArray(array: any[]) {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

function splitUniqueData(data: PartnerType[]) {
  const firstMarqueeData: PartnerType[] = [];
  const secondMarqueeData: PartnerType[] = [];
  const usedNames: Set<string> = new Set();

  for (const item of data) {
    if (!usedNames.has(item.name)) {
      if (firstMarqueeData.length < data.length / 2) {
        firstMarqueeData.push(item);
      } else {
        secondMarqueeData.push(item);
      }
      usedNames.add(item.name);
    } else {
      secondMarqueeData.push(item);
    }
  }

  const secondMarqueeSet = new Set<string>();
  secondMarqueeData.forEach((item, index) => {
    if (secondMarqueeSet.has(item.name)) {
      secondMarqueeData.splice(index, 1);
    } else {
      secondMarqueeSet.add(item.name);
    }
  });

  return { firstMarqueeData, secondMarqueeData };
}

const CompanyData: PartnerType[] = [
  { logo: "/assets/logo/company-partners/Card.png", name: "Indosat Ooredoo" },
  { logo: "/assets/logo/company-partners/Card-1.png", name: "Unilever" },
  { logo: "/assets/logo/company-partners/Card-2.png", name: "Bank BRI" },
  { logo: "/assets/logo/company-partners/Card-3.png", name: "Bank BCA" },
  { logo: "/assets/logo/company-partners/Card-4.png", name: "ULA App" },
  {
    logo: "/assets/logo/company-partners/Card-5.png",
    name: "Astra International",
  },
  { logo: "/assets/logo/company-partners/Card-6.png", name: "Lazada" },
  { logo: "/assets/logo/company-partners/Card-7.png", name: "Shopee" },
  {
    logo: "/assets/logo/company-partners/Card-8.png",
    name: "Paragon Technology and Innovation",
  },
  { logo: "/assets/logo/company-partners/Card-9.png", name: "Deloitte" },
  { logo: "/assets/logo/company-partners/Card-10.png", name: "TikTok" },
  { logo: "/assets/logo/company-partners/Card-11.png", name: "Narasi" },
  { logo: "/assets/logo/company-partners/Card-12.png", name: "Danone" },
  { logo: "/assets/logo/company-partners/Card-13.png", name: "Loreal" },
  {
    logo: "/assets/logo/company-partners/Card-14.png",
    name: "PT HM Sampoerna Tbk.",
  },
  { logo: "/assets/logo/company-partners/Card-15.png", name: "Bank OCBC" },
  {
    logo: "/assets/logo/company-partners/Card-16.png",
    name: "Schneider Electric",
  },
  { logo: "/assets/logo/company-partners/Card-17.png", name: "Mantappu Corp" },
  { logo: "/assets/logo/company-partners/Card-18.png", name: "NutriFood" },
  { logo: "/assets/logo/company-partners/Card-19.png", name: "P&G" },
  { logo: "/assets/logo/company-partners/Card.png", name: "Indosat Ooredoo" },
  { logo: "/assets/logo/company-partners/Card-1.png", name: "Unilever" },
  { logo: "/assets/logo/company-partners/Card-2.png", name: "Bank BRI" },
  { logo: "/assets/logo/company-partners/Card-3.png", name: "Bank BCA" },
  { logo: "/assets/logo/company-partners/Card-4.png", name: "ULA App" },
  {
    logo: "/assets/logo/company-partners/Card-5.png",
    name: "Astra International",
  },
  { logo: "/assets/logo/company-partners/Card-6.png", name: "Lazada" },
  { logo: "/assets/logo/company-partners/Card-7.png", name: "Shopee" },
  {
    logo: "/assets/logo/company-partners/Card-8.png",
    name: "Paragon Technology and Innovation",
  },
  { logo: "/assets/logo/company-partners/Card-9.png", name: "Deloitte" },
  { logo: "/assets/logo/company-partners/Card-10.png", name: "TikTok" },
  { logo: "/assets/logo/company-partners/Card-11.png", name: "Narasi" },
  { logo: "/assets/logo/company-partners/Card-12.png", name: "Danone" },
  { logo: "/assets/logo/company-partners/Card-13.png", name: "Loreal" },
  {
    logo: "/assets/logo/company-partners/Card-14.png",
    name: "PT HM Sampoerna Tbk.",
  },
  { logo: "/assets/logo/company-partners/Card-15.png", name: "Bank OCBC" },
  {
    logo: "/assets/logo/company-partners/Card-16.png",
    name: "Schneider Electric",
  },
  { logo: "/assets/logo/company-partners/Card-17.png", name: "Mantappu Corp" },
  { logo: "/assets/logo/company-partners/Card-18.png", name: "NutriFood" },
  { logo: "/assets/logo/company-partners/Card-19.png", name: "P&G" },
];

export default function NetworkSection() {
  const [marqueeData, setMarqueeData] = useState<{
    firstMarqueeData: PartnerType[];
    secondMarqueeData: PartnerType[];
  }>({
    firstMarqueeData: [],
    secondMarqueeData: [],
  });

  useEffect(() => {
    const shuffledCompanyData = shuffleArray([...CompanyData]);
    const { firstMarqueeData, secondMarqueeData } =
      splitUniqueData(shuffledCompanyData);
    setMarqueeData({ firstMarqueeData, secondMarqueeData });
  }, []);

  return (
    <div className="flex flex-col items-center py-[80px] space-y-[40px]">
      <div className="font-normal md:text-5xl font-gilda-display text-[24px]">
        Our Collaborative Network
      </div>
      <div className="flex flex-col space-y-[16px] items-center">
        <Marquee companyData={marqueeData.firstMarqueeData} direction="right" />
        <Marquee companyData={marqueeData.secondMarqueeData} direction="left" />
      </div>
    </div>
  );
}
