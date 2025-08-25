import Image from "next/image";
import CalendarIcon from "./icons/calendarIcon";
import ClockIcon from "./icons/clockIcon";

export default function UpcomingEventCard() {
  return (
    <div className="border-4 text-sm flex flex-col w-full md:flex-row items-center gap-14 border-neutral-800 rounded-lg p-6 ">
      <div className="w-4/5 relative aspect-[4/5]">
        <Image
          src={"/assets/img/event-poster-dummy.png"}
          alt="Event Poster"
          fill
        />
      </div>
      <div className="text-start flex flex-col items-center md:items-start gap-6">
        <h3 className="font-extrabold text-xl">
          Desgining User Friendly Apps for the Masses
        </h3>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Evoke exceeded our expectations. They turned our vision into
          reality, refining our expertise propelled us to new heights.
        </p>
        <div className="grid w-full grid-cols-2 gap-3">
          <div className="flex text-neutral-400 items-center gap-1">
            <CalendarIcon />
            <p>March 17, 2024 </p>
          </div>
          <div className="flex text-neutral-400 items-center gap-1">
            <ClockIcon />
            <p>10.30- 12.30 WIB </p>
          </div>
        </div>
        <button className="border border-white py-[10px] px-7 rounded-full">
          Register Now
        </button>
      </div>
    </div>
  );
}
