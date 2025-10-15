"use client";
import ExitIcon from "../icons/exitIcon";
import { PencilIcon } from "../icons/pencilIcon";
import { InformationIcon } from "../icons/informationIcon";
import { FormEvent, useEffect, useState } from "react";
import { Calendar } from "lucide-react";
import DangerPopUp from "../dialog/dangerPopUp";
import InputField from "../adminComponents/inputField";
import ImageInputField from "../adminComponents/imageInputField";
import { DeleteAndSaveButtonForEdit } from "../adminComponents/deleteAndSaveButton";
import ToolTip from "../tooltip";
import DatePicker from "../datePicker";

type GalleryDataProps = {
	eventName: string;
	date: string;
	image: string;
};

type GalleryPopUpProps = {
	open: boolean;
	close: () => void;
	save: (galleryData: GalleryDataProps, index: number) => void;
	delete: (index: number) => void;
	data: GalleryDataProps[];
	index: number;
};

export default function GalleryDetailPopUp({
	open,
	close,
	save,
	delete: deleteData,
	data,
	index,
}: GalleryPopUpProps) {
	const [eventName, setEventName] = useState<string>("");
	const [date, setDate] = useState<string>("");
	const [preview, setPreview] = useState<string>("");
	const formComplete = eventName && date && preview;
	const [submited, setSubmited] = useState<string | null>(null);
	const [editEventName, setEditEventName] = useState<boolean>(true);
	const [editDate, setEditDate] = useState<boolean>(true);
	const [editImage, setEditImage] = useState<boolean>(true);

	const [calendarPopUp, setCalendarOpen] = useState<string>("");

	const [dangerPopUp, setDangerPopUp] = useState<boolean>(false);

	const tooltipData = [
		["Data", "Min", "Max"],
		[
			["Name", "-", "100 characters"],
			["Date", "-", "-"],
			["Image", "1 image", "1 image"],
		],
	];

	useEffect(() => {
		if (data && data.length > 0) {
			setEventName(data[0].eventName);
			setDate(data[0].date);
			setPreview(data[0].image);
		}
	}, [data, open]);

	function resetState() {
		setEventName("");
		setDate("");
		setPreview("");
		setSubmited(null);
		setEditEventName(true);
		setEditDate(true);
		setEditImage(true);
	}

	function handleImage(file: File[]) {
		const image = file[0];

		setPreview(URL.createObjectURL(image));
	}

	function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		const editEventData: GalleryDataProps = {
			eventName,
			date,
			image: preview || data[0].image,
		};

		save(editEventData, index);
		setSubmited("save");

		resetState();
		close();
	}

	function handleDangerPopUp() {
		setDangerPopUp(true);
	}

	function handleDelete() {
		deleteData(index);
		resetState();
		close();
	}

	if (!open) return null;

	return (
		<section className="overflow-y-auto absolute top-0 left-0 w-full h-full grid grid-cols-12 items-center bg-white/20 backdrop-blur-[4px] py-10">
			<div className="col-span-12 xl:col-start-2 xl:col-end-12 2xl:col-start-3 2xl:col-end-11 rounded-t-[6px] px-2 sm:px-5 xl:px-20">
				<div className="flex justify-between items-center border-b border-neutral-300 bg-black px-[24px] py-[10px] rounded-t-[6px]">
					<h1 className="text-xs sm:text-xl md:text-2xl font-semibold">
						Previous Event Gallery
					</h1>
					<button
						onClick={() => {
							close();
							resetState();
						}}
						className="cursor-pointer border border-white rounded-[4px] p-2">
						<ExitIcon size={13} />
					</button>
				</div>
				<div className="bg-neutral-900 flex flex-col items-end px-5 sm:px-[36px] py-[24px] space-y-[20px] sm:space-y-[32px]">
					<div className="relative cursor-pointer">
						<InformationIcon width={20} height={20} color="white" />
						<ToolTip tooltipData={tooltipData} />
					</div>
					<form
						onSubmit={handleSubmit}
						className="w-full flex flex-col items-end gap-y-[32px]">
						<ul className="w-full border border-neutral-700 px-[20px] py-[24px] rounded-[8px] space-y-[40px]">
							<li className="w-full flex flex-col sm:flex-row gap-[20px]">
								<div className="relative w-full sm:w-[50%] flex flex-col gap-y-[6px]">
									<InputField
										inputLabel="Event Name"
										inputPlaceholder="Enter The Event Name"
										setData={setEventName}
										setEditData={setEditEventName}
										editData={editEventName}
										submited={null}
										data={data[0].eventName}
									/>
								</div>
								<div className="relative w-full sm:w-[50%] flex flex-col gap-y-[6px]">
									<label className="text-xs sm:text-base font-bold" htmlFor="">
										Date
									</label>
									<div
										onClick={() => setCalendarOpen("date")}
										className={`cursor-pointer h-full flex items-center rounded-[4px] border ${
											editDate
												? "bg-neutral-800 border-transparent"
												: "bg-transparent border-neutral-500"
										} px-2 sm:px-4 py-[4px] sm:py-[8px] gap-x-1 sm:gap-x-3`}>
										<Calendar className="w-4 sm:w-7" color="#737373" />
										<p className="text-neutral-500">
											{date
												? `${date.split("-")[0].split("/")[1]}/${
														date.split("-")[0].split("/")[0]
												  }/${date.split("-")[0].split("/")[2]}`
												: "Pick a date"}
										</p>
									</div>
									<DatePicker
										className="top-17"
										close={() => setCalendarOpen("")}
										open={calendarPopUp == "date" && !editDate}
										date={(value) => setDate(value)}
										data={date}
									/>
									{submited == null && (
										<div
											onClick={() => setEditDate(!editDate)}
											className="cursor-pointer absolute right-1 sm:right-2 bottom-1 sm:bottom-2 flex items-center bg-neutral-700 gap-x-[5px] sm:gap-x-[10px] px-[8px] py-[5px] rounded-[8px]">
											<p className="text-xs text-neutral-400">Edit</p>
											<PencilIcon width={14} height={14} color="#A3A3A3" />
										</div>
									)}
								</div>
							</li>
							<li className="grid grid-cols-12 gap-[20px]">
								<ImageInputField
									setPreview={setPreview}
									preview={preview}
									handleImage={handleImage}
									setEditImage={setEditImage}
									editImage={editImage}
									submited={submited}
								/>
							</li>
						</ul>
						<DeleteAndSaveButtonForEdit
							submited={submited}
							formComplete={formComplete}
							handleDangerPopUp={handleDangerPopUp}
							saveLabel="Save"
						/>
					</form>
				</div>
			</div>

			<DangerPopUp
				open={dangerPopUp}
				close={() => setDangerPopUp(false)}
				onConfirm={handleDelete}
				title="Delete"
				message="Are you sure you want to delete this?"
			/>
		</section>
	);
}
