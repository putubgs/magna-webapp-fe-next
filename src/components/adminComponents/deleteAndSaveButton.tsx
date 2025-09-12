type DeleteAndSaveButtonProps = {
	submited: string | null;
	formComplete: string | boolean | undefined;
	handleDangerPopUp: () => void;
	saveLabel: string;
};

export default function DeleteAndSaveButtonForAdd({
	submited,
	formComplete,
	handleDangerPopUp,
	saveLabel,
}: DeleteAndSaveButtonProps) {
	return (
		<div className="flex gap-x-[20px]">
			<div
				onClick={() => submited == "submit" && handleDangerPopUp()}
				className={`w-[80px] sm:w-[150px] h-[40px] sm:h-[50px] flex justify-center items-center text-xs sm:text-base text-rose-800 ${
					submited == "submit" && "cursor-pointer border border-rose-800"
				} px-[24px] py-[14px] rounded-full`}>
				{submited == "submit" && "Delete"}
			</div>

			<button
				type={formComplete ? "submit" : "button"}
				className={`w-[100px] sm:w-[150px] h-[40px] sm:h-[50px] flex justify-center items-center text-xs sm:text-base ${
					formComplete
						? "cursor-pointer border border-white text-white"
						: "cursor-not-allowed border border-gray-700 text-gray-700"
				} px-[24px] py-[14px] rounded-full`}>
				{saveLabel}
			</button>
		</div>
	);
}

export function DeleteAndSaveButtonForEdit({
	submited,
	formComplete,
	handleDangerPopUp,
	saveLabel,
}: DeleteAndSaveButtonProps) {
	return (
		<div className="flex gap-x-[20px]">
			<div
				onClick={() => submited == null && handleDangerPopUp()}
				className={`w-[80px] sm:w-[150px] h-[40px] sm:h-[50px] flex justify-center items-center text-xs sm:text-base text-rose-800 ${
					submited == null && "cursor-pointer border border-rose-800"
				} px-[24px] py-[14px] rounded-full`}>
				{submited == null && "Delete"}
			</div>

			<button
				type={formComplete ? "submit" : "button"}
				className={`w-[100px] sm:w-[150px] h-[40px] sm:h-[50px] flex justify-center items-center text-xs sm:text-base ${
					formComplete
						? "cursor-pointer border border-white text-white"
						: "cursor-not-allowed border border-gray-700 text-gray-700"
				} px-[24px] py-[14px] rounded-full`}>
				{saveLabel}
			</button>
		</div>
	);
}