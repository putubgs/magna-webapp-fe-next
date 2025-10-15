import { useRef } from "react";

type TooltipProps = {
  tooltipData: (string | string[])[][];
  tooltipGuide?: string[];
  className?: string;
};

export default function ToolTip({
  tooltipData,
  tooltipGuide,
  className,
}: TooltipProps) {
  const tooltipRef = useRef<HTMLTableElement>(null);

  return (
    <div>
      <div
        className={`absolute z-0 top-8 -right-5 flex flex-col ${className} opacity-0 backdrop-blur`}
      >
        <div className="mr-4 flex justify-end">
          <div className="w-0 h-0 border-l-[12px] border-l-transparent border-b-[12px] border-b-neutral-800 z-20"></div>
          <div className="w-0 h-0 border-r-[12px] border-r-transparent border-b-[12px] border-b-neutral-800 z-20"></div>
        </div>
        <table ref={tooltipRef} className="rounded-t-[12px] overflow-hidden">
          <thead className="bg-neutral-800 rounded-t-2xl">
            <tr className="font-bold text-white">
              {tooltipData[0].map((data, index) => (
                <td
                  key={index}
                  className="text-center whitespace-nowrap px-20 py-[12px]"
                >
                  {data}
                </td>
              ))}
            </tr>
          </thead>
          <tbody className="bg-neutral-900">
            {tooltipData[1].map((data, index) => (
              <tr key={index}>
                <td className="text-center whitespace-nowrap px-10 py-[12px] font-bold">
                  {data[0]}
                </td>
                <td className="text-center whitespace-nowrap px-20 py-[12px]">
                  {data[1]}
                </td>
                <td className="text-center whitespace-nowrap px-20 py-[12px]">
                  {data[2]}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {tooltipGuide?.map((guide, index) => (
          <div
            key={index}
            className="w-full bg-neutral-900 py-[12px] border-t-[0.5px] border-white text-center whitespace-nowrap text-neutral-200 text-sm"
          >
            {guide}
          </div>
        ))}
      </div>
    </div>
  );
}
