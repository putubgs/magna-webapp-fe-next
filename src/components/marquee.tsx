import React from "react";
import CompanyCards from "./companyCards";
import PartnerType from "@/types/Partner";
import styles from "@/app/marquee.module.css"

interface MarqueeProps {
  companyData: PartnerType[];
  direction: "left" | "right";
}

const Marquee: React.FC<MarqueeProps> = ({ companyData, direction }) => {
  return (
    <div className={`${styles.marquee} ${direction === "right" ? styles.marqueeRight : styles.marqueeLeft}`}>
      <div className={styles.marqueeContent}>
        {companyData.map((company, index) => (
          <div key={index} className="inline-block mx-2">
            <CompanyCards
              imgSrc={company.logo}
              companyName={company.name}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
