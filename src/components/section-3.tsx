"use client";

import Image from "next/image";
import CountUp from "react-countup";

function Section3() {
  return (
    <section className="text-center relative w-full z-0">
      <div className="absolute w-full h-full -z-10">
        <Image src={"/assets/impact-img.png"} alt="Background Image" fill />
      </div>

      <div className="md:px-[120px] px-2 py-[96px] flex flex-col items-center max-w-screen-2xl mx-auto">
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
        <div className="rounded-xl w-full mt-[33px] border-[0.5px] py-[30px] px-4 md:px-[80px] border-white flex flex-wrap justify-between gap-5 bg-white/[8%]">
          <div className="grid grid-cols-3 md:grid-cols-5 w-full gap-5 items-center justify-center">
            <div className="flex flex-col items-center space-y-3">
              <h3 className="font-bold text-2xl md:text-5xl">
                <CountUp
                  start={0}
                  end={35}
                  suffix="k+"
                  enableScrollSpy
                  scrollSpyOnce
                />
              </h3>
              <p>Event Registrants</p>
            </div>
            <div className="flex flex-col items-center space-y-3">
              <h3 className="font-bold text-2xl md:text-5xl">
                <CountUp
                  start={0}
                  end={150}
                  suffix="k+"
                  enableScrollSpy
                  scrollSpyOnce
                />
              </h3>
              <p>Social Media Followers</p>
            </div>
            <div className="flex flex-col items-center space-y-3">
              <h3 className="font-bold text-2xl md:text-5xl">
                <CountUp
                  start={0}
                  end={300}
                  suffix="+"
                  enableScrollSpy
                  scrollSpyOnce
                />
              </h3>
              <p>Universities Reached</p>
            </div>
            <div className="flex flex-col items-center space-y-3">
              <h3 className="font-bold text-2xl md:text-5xl">
                <CountUp
                  start={0}
                  end={500}
                  suffix="+"
                  enableScrollSpy
                  scrollSpyOnce
                />
              </h3>
              <p>Partnerships</p>
            </div>
            <div className="flex flex-col items-center space-y-3">
              <h3 className="font-bold text-2xl md:text-5xl">
                <CountUp
                  start={0}
                  end={30}
                  suffix="+"
                  enableScrollSpy
                  scrollSpyOnce
                />
              </h3>
              <p>Company Partnerships</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Section3;
