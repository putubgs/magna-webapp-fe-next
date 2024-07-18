import React, { FC } from "react";
import Image from "next/image";

interface CompanyCardsProps {
  imgSrc?: string;
  companyName?: string;
}

const CompanyCards: FC<CompanyCardsProps> = ({ imgSrc, companyName }) => {
  return (
    <div className="flex items-center w-[220px] h-[115px] bg-white rounded-xl justify-center">
      <Image
        src={imgSrc || "/default.png"}
        alt={companyName || "Company logo"}
        width={200}
        height={115}
        objectFit="contain"
      />
    </div>
  );
};

export default CompanyCards;
