import { PencilIcon } from "lucide-react";

type TextAreaField = {
	textAreaLabel: string;
	textAreaPlaceholder: string;
	setData: (value: string) => void;
	setEditData: (value: boolean) => void;
	editData: boolean;
	submited: string | null;
	data?: string;
};

export default function TextAreaField({
	textAreaLabel,
	textAreaPlaceholder,
	setData,
	setEditData,
	editData,
	submited,
	data,
}: TextAreaField) {
	return (
		<>
			<label className="text-xs sm:text-base font-bold" htmlFor="">
				{textAreaLabel}
			</label>
			<textarea
				onChange={(e) => setData(e.target.value)}
				className={`w-full h-28 md:h-20 text-xs sm:text-base font-normal border ${
					editData
						? "bg-neutral-800 border-transparent"
						: "bg-transparent border-neutral-500"
				} px-[12px] py-[8px] rounded-[4px] outline-none`}
				placeholder={textAreaPlaceholder}
				name=""
				id=""
				disabled={editData}>
				{data}
			</textarea>
			{(submited == "submit" || submited == null) && (
				<div
					onClick={() => setEditData(!editData)}
					className="cursor-pointer absolute right-1 sm:right-2 bottom-1 sm:bottom-2 flex items-center bg-neutral-700 gap-x-[5px] sm:gap-x-[10px] px-[8px] py-[5px] rounded-[8px]">
					<p className="text-xs text-neutral-400">Edit</p>
					<PencilIcon width={14} height={14} color="#A3A3A3" />
				</div>
			)}
		</>
	);
}
