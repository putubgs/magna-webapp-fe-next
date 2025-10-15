import { ApprovedIcon } from "./icons/approvedIcon";
import ClockIcon from "./icons/clockIcon";

type StatusProps = {
	status: "waiting" | "approved" | "rejected";
};
export default function Status({ status }: StatusProps) {
	return (
		<div
			className={`flex justify-center items-center border-[2px] w-fit ${
				status == "approved" ? "border-lime-900" : "border-orange-400"
			} py-[10px] px-8 rounded-[20px] gap-x-[8px]`}>
			{status == "approved" ? (
				<ApprovedIcon width={16} height={16} color="#84CC16" />
			) : (
				<ClockIcon width={14} height={14} color="#FB923C" />
			)}
			<p
				className={`text-xs font-bold ${
					status == "approved" ? "text-lime-500" : "text-orange-400"
				}`}>
				{status == "approved" ? "Approved" : "Waiting"}
			</p>
		</div>
	);
}
