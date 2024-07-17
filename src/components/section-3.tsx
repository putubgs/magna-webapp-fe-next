"use client";

import Image from "next/image";
import CountUp from "react-countup";

function Section3() {
  return (
    <section className="text-center relative w-full z-0">
      <div className="absolute w-full h-full -z-10">
        <Image src={"/assets/impact-img.png"} alt="Background Image" fill />
      </div>

      <div className="px-[120px] py-[96px] flex flex-col items-center max-w-screen-2xl mx-auto">
        <div className="max-w-[730px]">
          <h2 className="font-semibold text-2xl space-y-2 [&>span]:block">
            <span>Why Leading Businesses</span>
            <span className="font-normal text-5xl font-gilda-display">
              Choose Magna Partners
            </span>
          </h2>
          <p className="mt-5">
            These numbers are more than just figures, they represent our
            dedication to making a meaningful difference and driving progress.
            We continue to strive for excellence, aiming to create even greater
            impacts in the years to come.
          </p>
        </div>
        <div className="rounded-xl w-full mt-[33px] border-[0.5px] py-[30px] px-[80px] border-white flex justify-between gap-5 bg-white/[8%] [&>div]:space-y-3 [&>div>h3]:font-bold [&>div>h3]:text-5xl">
          <div>
            <h3>
              <CountUp
                start={0}
                end={35}
                suffix="k+"
                enableScrollSpy
                scrollSpyOnce
              />
            </h3>
            <p>Event Registrans</p>
          </div>
          <div>
            <h3>
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
          <div>
            <h3>
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
          <div>
            <h3>
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
          <div>
            <h3>
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
    </section>
  );
}

export default Section3;
