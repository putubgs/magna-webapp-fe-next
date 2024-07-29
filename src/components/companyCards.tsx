import React, { FC } from "react";
import Image from "next/image";

interface CompanyCardsProps {
  imgSrc?: string;
  companyName?: string;
}

const CompanyCards: FC<CompanyCardsProps> = ({ imgSrc, companyName }) => {
  return (
    <div className="flex items-center md:w-[220px] md:h-[115px] w-[120px] h-[50px] bg-white rounded-xl justify-center">
      <Image
        src={imgSrc || "/default.png"}
        alt={companyName || "Company logo"}
        width={200}
        height={115}
        style={{ objectFit: "contain" }}
        className="rounded-xl w-full max-w-[100px] md:max-w-[200px]"
      />
    </div>
  );
};

export default CompanyCards;
