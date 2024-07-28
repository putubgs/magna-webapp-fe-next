import Image from "next/image";
import Link from "next/link";

/*
  Todo:
    - Change the SVG at the bottom. It is currently using the desktop size and will be fixed when the actual SVG is provided.
*/

const Founder = () => (
  <>
    <div className="w-full max-w-[1200px] px-5 pt-[36px] pb-[96px]">
      <div className="flex flex-col-reverse md:flex-row gap-5 md:gap-20">
        <div className="relative  w-[350px] h-[340px] md:h-[288px] rounded-[12px]">
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
            <p className="text-2xl md:text-3xl lg:text-5xl font-gilda-display">
              From The Founder
            </p>
          </div>
          <div className="h-auto md:h-[98px] flex flex-col gap-2 md:gap-2.5 lg:gap-[26px] md:mt-0 mt-[24px] space-y-[26px] md:space-y-0">
            <p className="text-base pt-2">
              The main &apos;thrust&apos; is to focus on educating attendees on
              how to best protect highly vulnerable business applications with
              interactive panel discussions and roundtables led by subject
              matter experts.
            </p>
            <p className="text-base">Micah Davis - Founder of Magna Partners</p>
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
        <p className="whitespace-nowrap">More of Micah’s crafted products.</p>
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
  </>
);

export default Founder;
