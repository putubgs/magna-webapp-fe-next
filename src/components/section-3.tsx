"use client";

import Image from "next/image";
import CountUp from "react-countup";

function Section3() {
  return (
    <section className="text-center relative w-full z-0">
      <div className="absolute w-full h-full -z-10">
        <Image src={"/assets/impact-img.png"} alt="Background Image" fill />
      </div>

      <div className="md:px-[120px] px-5 py-[96px] flex flex-col items-center max-w-screen-2xl mx-auto">
        <div className="max-w-[730px]">
          <h2 className="font-semibold md:text-2xl space-y-2 [&>span]:block">
            <span>Why Leading Businesses</span>
            <span className="font-normal md:text-5xl text-[24px] font-gilda-display">
              Choose Magna Partners
            </span>
          </h2>
          <p className="mt-5 md:text-[20]">
            These numbers are more than just figures, they represent our
            dedication to making a meaningful difference and driving progress.
            We continue to strive for excellence, aiming to create even greater
            impacts in the years to come.
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
  );
}

export default Section3;
