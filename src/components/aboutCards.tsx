import AboutType from "@/types/About";
import Image from "next/image";
import Link from "next/link";
import InstaIcon from "./icons/instaIcon";
import TiktokIcon from "./icons/tiktokIcon";

interface AboutCardProps {
  abouts: AboutType[];
}

export const AboutCard = ({ abouts }: AboutCardProps) => (
  <>
    {abouts.map((about, index) => (
      <div
        className="border border-[#FFFFFF33] w-[170px] lg:w-[265px] p-[6px]"
        key={index}
      >
        <div className="">
          <div className="relative w-full h-[80px] lg:h-[134px] bg-[#FFFFFF14]">
            <div className="flex justify-center h-full items-center ">
              <div
                className="absolute w-[35px] h-[35px] lg:h-[70px] lg:w-[70px] rotate-[25deg] rounded-[6px] lg:rounded-[14px]"
                style={{ backgroundColor: about.bgColor }}
              ></div>
              <div className="absolute w-[35px] h-[35px] lg:h-[70px] lg:w-[70px] rotate-0 rounded-[6px] lg:rounded-[14px] bg-white">
                <div className="flex justify-center items-center h-full">
                  <Image
                    src={about.logo}
                    alt={`${about.title} logo`}
                    width={37}
                    height={37}
                    className="w-[27px] lg:w-[37px] h-[27px] lg:h-[37px] object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="gap-2 lg:gap-[14px] w-[158px] lg:w-full min-h-[165px] lg:min-h-[173px] text-center">
            <div className="h-[40px] my-[12px] flex items-center justify-center">
              <p className="text-sm lg:text-xl font-bold">{about.title}</p>
            </div>
            <div className="h-[1px] w-[168px] mx-auto flex items-center justify-center bg-gradient-to-r from-transparent via-purple-800 to-transparent"></div>
            <p className="text-xs lg:text-sm pt-3 font-light">
              {about.description}
            </p>
          </div>
        </div>
        <div className="w-[56px] mb-2 mx-auto  flex gap-[20px]">
          <Link href={about.igLink} target="_blank">
            <InstaIcon size={18} color="#A3A3A3" />
          </Link>
          <Link href={about.tiktokLink} target="_blank">
            <TiktokIcon size={18} color="#A3A3A3" />
          </Link>
        </div>
      </div>
    ))}
  </>
);
