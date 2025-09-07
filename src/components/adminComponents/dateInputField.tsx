import { Calendar, ChevronDown } from "lucide-react";
import { PencilIcon } from "../icons/pencilIcon";
import DatePicker from "../datePicker";

type DateInputFieldProps = {
	setDatePickerOpen: (value: string) => void;
	setDatePickerOpenType?: string;
	setDate: (value: string) => void;
	date: string | undefined;
	setEditDate: (value: boolean) => void;
	editDate: boolean;
	submited: string | null;
	datePickerPopUp: string;
	selectedDate?: string;
	selectedStartDate?: string | undefined;
	selectedEndDate?: string | undefined;
	className?: string;
	label?: string;
};

export default function DateInputField({
	setDatePickerOpen,
	setDatePickerOpenType = "date",
	setDate,
	date,
	setEditDate,
	editDate,
	submited,
	datePickerPopUp,
	selectedDate,
	selectedStartDate,
	selectedEndDate,
	className,
	label,
}: DateInputFieldProps) {
	return (
		<div className="relative flex flex-col gap-y-[6px]">
			<label className="text-xs sm:text-base font-bold" htmlFor="">
				{label}
			</label>
			<div
				onClick={() => setDatePickerOpen(setDatePickerOpenType)}
				className={`cursor-pointer flex items-center h-full rounded-[4px] border ${
					editDate
						? "bg-neutral-800 border-transparent"
						: "bg-transparent border-neutral-500"
				} px-2 sm:px-4 py-[4px] sm:py-[8px] gap-x-1 sm:gap-x-3`}>
				<Calendar className="w-4 sm:w-7" color="#737373" />
				<p
					className={`w-full flex justify-between items-center text-xs sm:text-base ${
						date ? "text-white" : "text-neutral-500"
					}`}>
					{date
						? `${date.split("-")[0].split("/")[1]}/${
								date.split("-")[0].split("/")[0]
						  }/${date.split("-")[0].split("/")[2]}`
						: "Pick a date"}
					<ChevronDown />
				</p>
			</div>
			<DatePicker
				className={className || "top-17"}
				close={() => setDatePickerOpen("")}
				open={datePickerPopUp === setDatePickerOpenType && !editDate}
				date={(value) => setDate(value)}
				picked={setDatePickerOpenType}
				selectedDate={selectedDate}
				selectedStartDate={selectedStartDate}
				selectedEndDate={selectedEndDate}
			/>
			{submited && (
				<div
					onClick={() => setEditDate(!editDate)}
					className="cursor-pointer absolute right-1 sm:right-2 bottom-1 sm:bottom-2 flex items-center bg-neutral-700 gap-x-[5px] sm:gap-x-[10px] px-[8px] py-[5px] rounded-[8px]">
					<p className="text-xs text-neutral-400">Edit</p>
					<PencilIcon width={14} height={14} color="#A3A3A3" />
				</div>
			)}
		</div>
	);
}
