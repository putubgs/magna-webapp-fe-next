import Image from "next/image";

export default function Header() {
  return (
      <div className="flex justify-between py-6 px-[120px] items-center">
        <div className="flex items-center space-x-4">
          <Image 
            src="/assets/logo/business-units/Magna.png"
            alt="Magna Logo"
            width={35}
            height={56}
          />
          <div className="text-[24px] font-extrabold">
            Magna Partners
          </div>
        </div>  
        <div className="flex space-x-12">
            <div>
              Business Units
            </div>
            <div>
              Partnership
            </div>
            <div>
              Contact
            </div>
        </div>
      </div>
  );
}
