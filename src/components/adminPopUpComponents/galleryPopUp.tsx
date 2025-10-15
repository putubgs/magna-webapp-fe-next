"use client";
import ExitIcon from "../icons/exitIcon";
import { InformationIcon } from "../icons/informationIcon";
import { FormEvent, useState } from "react";
import DangerPopUp from "../dialog/dangerPopUp";
import InputField from "../adminComponents/inputField";
import ImageInputField from "../adminComponents/imageInputField";
import DeleteAndSaveButtonForAdd from "../adminComponents/deleteAndSaveButton";
import DateInputField from "../adminComponents/dateInputField";
import { Backdrop } from "../backdrop";
import ToolTip from "../tooltip";

type GalleryProps = {
	eventName: string;
	date: string;
	image: string;
};

type GalleryPopUpProps = {
	open: boolean;
	close: () => void;
	save: (galleryData: GalleryProps) => void;
};

export default function GalleryPopUp({ open, close, save }: GalleryPopUpProps) {
	const [eventName, setEventName] = useState<string>("");
	const [date, setDate] = useState<string>("");
	const [imageFileName, setImageFileName] = useState<string>("");
	const [preview, setPreview] = useState<string>("");
	const formComplete = eventName && date && preview;
	const [submited, setSubmited] = useState<string | null>(null);
	const [editEventName, setEditEventName] = useState<boolean>(false);
	const [editDate, setEditDate] = useState<boolean>(false);
	const [editImage, setEditImage] = useState<boolean>(false);

	const [datePickerPopUp, setDatePickerOpen] = useState<string>("");

	const [dangerPopUp, setDangerPopUp] = useState<boolean>(false);

	const tooltipData = [
		["Data", "Min", "Max"],
		[
			["Name", "-", "100 characters"],
			["Date", "-", "-"],
			["Image", "1 image", "1 image"],
		],
	];

	const tooltipGuide = [
		"Each organization must display a minimum of 3 event photos.",
	];

	function resetForm() {
		setEventName("");
		setDate("");
		setPreview("");
		setSubmited(null);
		setEditEventName(false);
		setEditDate(false);
		setEditImage(false);
	}

	function handleImage(file: File[]) {
		const image = file[0];

		setImageFileName(image.name);
		setPreview(URL.createObjectURL(image));
	}

	function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		if (submited == null) {
			setSubmited("submit");
			setEditEventName(true);
			setEditDate(true);
			setEditImage(true);
		} else if (submited == "submit") {
			const galleryData: GalleryProps = {
				eventName,
				date,
				image: preview,
			};

			save(galleryData);
			resetForm();
			close();
		}
	}

	function handleDelete() {
		resetForm();
		close();
	}

	if (!open) return null;

	return (
		<section className="overflow-y-auto absolute top-0 left-0 w-full h-full grid grid-cols-12 items-center bg-white/20 backdrop-blur-[4px] py-10">
			<div className="col-span-12 xl:col-start-2 xl:col-end-12 2xl:col-start-3 2xl:col-end-11 rounded-t-[6px] px-2 sm:px-5 xl:px-20">
				<div className="relative">
					<div className="flex justify-between items-center border-b border-neutral-300 bg-black px-[24px] py-[10px] rounded-t-[6px]">
						<h1 className="text-xs sm:text-xl md:text-2xl font-semibold">
							Previous Event Gallery
						</h1>
						<div
							onClick={() =>
								eventName || date || preview ? setDangerPopUp(true) : close()
							}
							className="cursor-pointer border border-white rounded-[4px] p-2">
							<ExitIcon size={13} />
						</div>
					</div>
					<div className="bg-neutral-900 flex flex-col items-end px-5 sm:px-[36px] py-[24px] space-y-[20px] sm:space-y-[32px]">
						<div className="cursor-pointer group">
							<Backdrop className="z-1 bg-white/10 group-hover:opacity-95 duration-300" />
							<div className="relative z-2">
								<InformationIcon width={20} height={20} color="white" />
								<ToolTip
									tooltipGuide={tooltipGuide}
									tooltipData={tooltipData}
									className="group-hover:opacity-100 duration-300 pointer-events-none"
								/>
							</div>
						</div>
						<form
							onSubmit={handleSubmit}
							className="w-full flex flex-col items-end gap-y-[32px]">
							<ul className="w-full border border-neutral-700 px-[20px] py-[24px] rounded-[8px] space-y-[40px]">
								<li className="w-full flex flex-col sm:flex-row gap-[20px]">
									<div className="relative w-full sm:w-[50%] flex flex-col gap-y-[6px]">
										<InputField
											inputLabel="Event Name"
											inputPlaceholder="Enter the event name"
											setData={setEventName}
											setEditData={setEditEventName}
											editData={editEventName}
											submited={`${submited}`}
										/>
									</div>
									<div className="relative w-full sm:w-[50%] flex flex-col gap-y-[6px]">
										<DateInputField
											label="Date"
											setDatePickerOpen={setDatePickerOpen}
											setDate={setDate}
											date={date}
											setEditDate={setEditDate}
											editDate={editDate}
											submited={submited}
											datePickerPopUp={datePickerPopUp}
										/>
									</div>
								</li>
								<li className="grid grid-cols-12 gap-[20px]">
									<ImageInputField
										type="add"
										setPreview={setPreview}
										preview={preview}
										handleImage={handleImage}
										imageFileName={imageFileName}
										setEditImage={setEditImage}
										editImage={editImage}
										submited={submited}
									/>
								</li>
							</ul>
							<DeleteAndSaveButtonForAdd
								submited={submited}
								formComplete={formComplete}
								handleDangerPopUp={() => setDangerPopUp(!dangerPopUp)}
								saveLabel="Save"
							/>
						</form>
					</div>
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
