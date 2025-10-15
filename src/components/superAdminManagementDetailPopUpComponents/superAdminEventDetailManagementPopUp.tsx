"use client";
import { FormEvent, useEffect, useState } from "react";
import ExitIcon from "../icons/exitIcon";
import { InformationIcon } from "../icons/informationIcon";
import { PencilIcon } from "../icons/pencilIcon";
import { Calendar } from "lucide-react";
import DangerPopUp from "../dialog/dangerPopUp";
import WarningPopUp from "../dialog/warningPopUp";
import ImageInputField from "../adminComponents/imageInputField";
import InputField from "../adminComponents/inputField";
import TextAreaField from "../adminComponents/textAreaField";
import { DeleteAndSaveButtonForEdit } from "../adminComponents/deleteAndSaveButton";
import ToolTip from "../tooltip";
import DatePicker from "../datePicker";
import TimePicker from "../timePicker";

type SuperAdminEventManagementProps = {
	organization: string;
	eventName: string;
	registrationUrl1: string;
	date: string;
	startTime: string;
	endTime: string;
	registrationUrl2?: string;
	startDate?: string;
	endDate?: string;
	eventDescription: string;
	image: string;
};

type EventPopUpProps = {
	open: boolean;
	close: () => void;
	save: (
		superAdminEventManagementData: SuperAdminEventManagementProps,
		index: number
	) => void;
	delete: (index: number) => void;
	data: SuperAdminEventManagementProps[];
	index: number;
};

export default function SuperAdminEventDetailManagementPopUp({
	open,
	close,
	save,
	delete: deleteData,
	data,
	index,
}: EventPopUpProps) {
	const [togel, setTogel] = useState<boolean>(false);
	const [organization, setOrganization] = useState<string>("");
	const [eventName, setEventName] = useState<string>("");
	const [registrationUrl1, setRegistrationUrl1] = useState<string>("");
	const [date, setDate] = useState<string>("");
	const [startTime, setStartTime] = useState<string>("");
	const [endTime, setEndTime] = useState<string>("");
	const [registrationUrl2, setRegistrationUrl2] = useState<string>("");
	const [startDate, setStartDate] = useState<string>("");
	const [endDate, setEndDate] = useState<string>("");
	const [eventDescription, setEventDescription] = useState<string>("");
	const [preview, setPreview] = useState<string>("");
	const formComplete =
		eventName &&
		date &&
		startTime &&
		endTime &&
		eventDescription &&
		preview &&
		(togel || (registrationUrl2 && startDate && endDate));
	const [submited, setSubmited] = useState<string | null>(null);
	const [editOrganization, setEditOrganization] = useState<boolean>(true);
	const [editEventName, setEditEventName] = useState<boolean>(true);
	const [editRegistrationUrl1, setEditRegistrationUrl1] =
		useState<boolean>(true);
	const [editDate, setEditDate] = useState<boolean>(true);
	const [editStartTime, setEditStartTime] = useState<boolean>(true);
	const [editEndTime, setEditEndTime] = useState<boolean>(true);
	const [editRegistrationUrl2, setEditRegistrationUrl2] =
		useState<boolean>(true);
	const [editStartDate, setEditStartDate] = useState<boolean>(true);
	const [editEndDate, setEditEndDate] = useState<boolean>(true);
	const [editEventDescription, setEditEventDescription] =
		useState<boolean>(true);
	const [editImage, setEditImage] = useState<boolean>(true);

	const [calendarPopUp, setCalendarOpen] = useState<string>("");
	const [timePickerPopUp, setTimePickerOpen] = useState<string>("");

	const [warningPopUp, setWarningPopUp] = useState<boolean>(false);
	const [warningPopUpDescription, setWarningPopUpDescription] =
		useState<string>("");

	const [dangerPopUp, setDangerPopUp] = useState<boolean>(false);

	const tooltipData = [
		["Data", "Min", "Max"],
		[
			["Event Name", "-", "100 characters"],
			["Event Date", "-", "-"],
			["Registration Url", "-", "-"],
			["Registration Start Date", "-", "-"],
			["Registration End Date", "-", "-"],
			["Event Description", "-", "200 characters"],
			["Poster", "1 image", "1 image"],
		],
	];

	useEffect(() => {
		if (data && data.length > 0) {
			setEventName(data[0].eventName || "");
			setDate(data[0].date || "");
			setStartTime(data[0].startTime);
			setEndTime(data[0].endTime);
			setRegistrationUrl2(data[0].registrationUrl2 ?? "");
			setStartDate(data[0].startDate ?? "");
			setEndDate(data[0].endDate ?? "");
			setEventDescription(data[0].eventDescription ?? "");
			setPreview(data[0].image);
		}
	}, [data, open]);
	function resetState() {
		setEditEventName(true);
		setEditDate(true);
		setEditStartTime(true);
		setEditEndTime(true);
		setEditRegistrationUrl2(true);
		setEditStartDate(true);
		setEditEndDate(true);
		setEditEventDescription(true);
		setEditImage(true);
		setSubmited(null);
	}

	function handleImage(file: File[]) {
		const image = file[0];

		setPreview(URL.createObjectURL(image));
	}

	function validateUrl(url: string) {
		const pattern = new RegExp(
			"^(https?:\\/\\/)?" +
				"((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
				"((\\d{1,3}\\.){3}\\d{1,3}))" +
				"(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
				"(\\?[;&a-z\\d%_.~+=-]*)?" +
				"(\\#[-a-z\\d_]*)?$",
			"i"
		);
		return !!pattern.test(url);
	}

	function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		const editEventData: SuperAdminEventManagementProps = {
			organization,
			eventName,
			registrationUrl1,
			date,
			startTime,
			endTime,
			registrationUrl2,
			startDate,
			endDate,
			eventDescription,
			image: preview || data[0].image,
		};

		if (!validateUrl(registrationUrl2) && !togel) {
			setWarningPopUp(true);
			setWarningPopUpDescription("Invalid Registration URL");
		} else {
			save(editEventData, index);
			setSubmited("save");

			resetState();
			close();
		}
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
			<div className="col-span-12 xl:col-start-2 xl:col-end-12 2xl:col-start-3 2xl:col-end-11 rounded-t-[6px] px-2 sm:px-5 xl:px-5">
				<div className="flex justify-between items-center border-b border-neutral-300 bg-black px-[24px] py-[10px] rounded-t-[6px]">
					<h1 className="text-xs sm:text-xl md:text-2xl font-semibold">
						Upcoming Event
					</h1>
					<div
						onClick={() => {
							resetState();
							close();
						}}
						className="cursor-pointer border border-white rounded-[4px] p-2">
						<ExitIcon size={13} />
					</div>
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
							<li className="gap-x-[40px]">
								<div className="relative w-full flex flex-col gap-y-[6px]">
									<InputField
										inputLabel="Organization"
										inputPlaceholder="Magna Organization"
										setData={setOrganization}
										setEditData={setEditOrganization}
										editData={editOrganization}
										submited={null}
										data={data[0].organization}
									/>
								</div>
							</li>
							<li className="grid grid-cols-12 gap-x-[20px]">
								<div className="relative col-span-12 md:col-span-4 lg:col-span-6 flex flex-col gap-y-[6px]">
									<InputField
										inputLabel="Event Name"
										inputPlaceholder="Enter the event name"
										setData={setEventName}
										setEditData={setEditEventName}
										editData={editEventName}
										submited={null}
										data={data[0].eventName}
									/>
								</div>
								<div className="relative col-span-12 md:col-span-4 lg:col-span-6 flex flex-col gap-y-[6px]">
									<InputField
										inputLabel="Registration URL"
										inputPlaceholder="Registration URL"
										setData={setRegistrationUrl1}
										setEditData={setEditRegistrationUrl1}
										editData={editRegistrationUrl1}
										submited={null}
										data={data[0].registrationUrl1}
									/>
								</div>
							</li>
							<li className="grid grid-cols-12 gap-[20px]">
								<div className="relative col-span-12 md:col-span-4 lg:col-span-6 flex flex-col gap-[6px]">
									<label className="text-xs sm:text-base font-bold" htmlFor="">
										Date
									</label>
									<div
										onClick={() => setCalendarOpen("date")}
										className={`cursor-pointer h-full flex items-center rounded-[4px] border ${
											editDate
												? "bg-neutral-800 border-transparent"
												: "bg-transparent border-neutral-500"
										} px-4 gap-x-3 py-1 sm:py-2`}>
										<Calendar className="w-4 sm:w-7" color="#737373" />
										<p className="text-neutral-500 text-xs sm:text-base">
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
								<table className="col-span-12 md:col-span-8 lg:col-span-6">
									<thead>
										<tr>
											<td className="w-[50%] text-xs sm:text-base font-bold">
												Start Time
											</td>
											<td className="px-2 sm:px-5"></td>
											<td className="w-[50%] text-xs sm:text-base font-bold">End Time</td>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td className="relative w-[50%]">
												<div
													onClick={() => setTimePickerOpen("startTime")}
													className={`cursor-pointer flex items-center h-full mt-[6px] rounded-[4px] border ${
														editStartTime
															? "bg-neutral-800 border-transparent"
															: "bg-transparent border-neutral-500"
													}  px-2 sm:px-4 py-[4px] sm:py-[8px] gap-x-1 sm:gap-x-3`}>
													<Calendar className="w-4 sm:w-7" color="#737373" />
													<p className="text-xs sm:text-base text-neutral-500">
														{startTime ? startTime : "Select A Time"}
													</p>
												</div>
												<TimePicker
													close={() => setTimePickerOpen("")}
													open={timePickerPopUp == "startTime" && !editStartTime}
													time={(value) => setStartTime(value)}
												/>
												{submited == null && (
													<div
														onClick={() => setEditStartTime(!editStartTime)}
														className="cursor-pointer absolute right-1 sm:right-2 bottom-1 sm:bottom-2 flex items-center bg-neutral-700 gap-x-[5px] sm:gap-x-[10px] px-[8px] py-[5px] rounded-[8px]">
														<p className="text-xs text-neutral-400">Edit</p>
														<PencilIcon width={14} height={14} color="#A3A3A3" />
													</div>
												)}
											</td>
											<td className="px-2 sm:px-5">-</td>
											<td className="relative w-[50%]">
												<div
													onClick={() => setTimePickerOpen("endTime")}
													className={`cursor-pointer flex items-center h-full mt-[6px] rounded-[4px] border ${
														editEndTime
															? "bg-neutral-800 border-transparent"
															: "bg-transparent border-neutral-500"
													} px-2 sm:px-4 py-[4px] sm:py-[8px] gap-x-1 sm:gap-x-3`}>
													<Calendar className="w-4 sm:w-7" color="#737373" />
													<p className="text-xs sm:text-base text-neutral-500">
														{endTime ? endTime : "Select A Time"}
													</p>
												</div>
												<TimePicker
													close={() => setTimePickerOpen("")}
													open={timePickerPopUp == "endTime" && !editEndTime}
													time={(value) => setEndTime(value)}
												/>
												{submited == null && (
													<div
														onClick={() => setEditEndTime(!editEndTime)}
														className="cursor-pointer absolute right-1 sm:right-2 bottom-1 sm:bottom-2 flex items-center bg-neutral-700 gap-x-[5px] sm:gap-x-[10px] px-[8px] py-[5px] rounded-[8px]">
														<p className="text-xs text-neutral-400">Edit</p>
														<PencilIcon width={14} height={14} color="#A3A3A3" />
													</div>
												)}
											</td>
										</tr>
									</tbody>
								</table>
							</li>
							<li className="flex items-center gap-x-[20px]">
								<div
									onClick={() => setTogel(!togel)}
									className={`w-[40px] sm:w-[60px] h-[20px] sm:h-[30px] ${
										!togel ? "bg-primary" : "bg-neutral-400"
									} flex items-center rounded-full px-[5px] relative cursor-pointer`}>
									<div
										className={`absolute left-[5px] w-[11px] sm:w-[21px] h-[11px] sm:h-[21px] bg-white rounded-full transition-all duration-300 ${
											togel ? "translate-x-0" : "translate-x-[20px] sm:translate-x-[30px]"
										}`}></div>
								</div>
								<p className="text-xs sm:text-base font-bold">
									Registration Informations
								</p>
							</li>
							{!togel && (
								<li className="grid grid-cols-12 gap-[20px]">
									<div className="relative col-span-12 md:col-span-4 lg:col-span-6 flex flex-col gap-y-[6px]">
										<label className="text-xs sm:text-base font-bold" htmlFor="">
											Registration Url
										</label>
										<div className="flex items-center">
											<input
												onChange={(e) => setRegistrationUrl2(e.target.value)}
												value={registrationUrl2}
												className={`w-full text-xs sm:text-base font-normal border ${
													editRegistrationUrl2
														? "bg-neutral-800 border-transparent"
														: "bg-transparent border-neutral-500"
												} px-[12px] py-[8px] rounded-[4px] outline-none`}
												type="text"
												placeholder="Enter the Registration Url"
												disabled={editRegistrationUrl2}
											/>
											{submited == null && (
												<div
													onClick={() => setEditRegistrationUrl2(!editRegistrationUrl2)}
													className="cursor-pointer absolute right-1 sm:right-2 bottom-1 sm:bottom-2 flex items-center bg-neutral-700 gap-x-[5px] sm:gap-x-[10px] px-[8px] py-[5px] rounded-[8px]">
													<p className="text-xs text-neutral-400">Edit</p>
													<PencilIcon width={14} height={14} color="#A3A3A3" />
												</div>
											)}
										</div>
									</div>
									<table className="col-span-12 md:col-span-8 lg:col-span-6">
										<thead>
											<tr>
												<td className="w-[50%] text-xs sm:text-base font-bold">
													Start Date
												</td>
												<td className="px-2 sm:px-5"></td>
												<td className="w-[50%] text-xs sm:text-base font-bold">End Date</td>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td className="relative">
													<div
														onClick={() => setCalendarOpen("startDate")}
														className={`cursor-pointer flex items-center h-full mt-[6px] rounded-[4px] border ${
															editStartDate
																? "bg-neutral-800 border-transparent"
																: "bg-transparent border-neutral-500"
														} px-2 sm:px-4 py-[4px] sm:py-[8px] gap-x-1 sm:gap-x-3`}>
														<Calendar className="w-4 sm:w-7" color="#737373" />
														<p className="text-xs sm:text-base text-neutral-500">
															{startDate
																? `${startDate.split("-")[0].split("/")[1]}/${
																		startDate.split("-")[0].split("/")[0]
																  }/${startDate.split("-")[0].split("/")[2]}`
																: "Pick a date"}
														</p>
													</div>
													<DatePicker
														close={() => setCalendarOpen("")}
														open={calendarPopUp == "startDate" && !editStartDate}
														date={(value) => setStartDate(value)}
														data={date}
													/>
													{submited == null && (
														<div
															onClick={() => setEditStartDate(!editStartDate)}
															className="cursor-pointer absolute right-1 sm:right-2 bottom-1 sm:bottom-2 flex items-center bg-neutral-700 gap-x-[5px] sm:gap-x-[10px] px-[8px] py-[5px] rounded-[8px]">
															<p className="text-xs text-neutral-400">Edit</p>
															<PencilIcon width={14} height={14} color="#A3A3A3" />
														</div>
													)}
												</td>
												<td className="px-2 sm:px-5">-</td>
												<td className="relative">
													<div
														onClick={() => setCalendarOpen("endDate")}
														className={`cursor-pointer flex items-center h-full mt-[6px] rounded-[4px] border ${
															editEndDate
																? "bg-neutral-800 border-transparent"
																: "bg-transparent border-neutral-500"
														} px-2 sm:px-4 py-[4px] sm:py-[8px] gap-x-1 sm:gap-x-3`}>
														<Calendar className="w-4 sm:w-7" color="#737373" />
														<p className="text-xs sm:text-base text-neutral-500">
															{endDate
																? `${endDate.split("-")[0].split("/")[1]}/${
																		endDate.split("-")[0].split("/")[0]
																  }/${endDate.split("-")[0].split("/")[2]}`
																: "Pick a date"}
														</p>
													</div>
													<DatePicker
														className="right-0"
														close={() => setCalendarOpen("")}
														open={calendarPopUp == "endDate" && !editEndDate}
														date={(value) => setEndDate(value)}
														data={date}
													/>
													{submited == null && (
														<div
															onClick={() => setEditEndDate(!editEndDate)}
															className="cursor-pointer absolute right-1 sm:right-2 bottom-1 sm:bottom-2 flex items-center bg-neutral-700 gap-x-[5px] sm:gap-x-[10px] px-[8px] py-[5px] rounded-[8px]">
															<p className="text-xs text-neutral-400">Edit</p>
															<PencilIcon width={14} height={14} color="#A3A3A3" />
														</div>
													)}
												</td>
											</tr>
										</tbody>
									</table>
								</li>
							)}
							<li className="w-full gap-x-[40px]">
								<div className="relative col-span-12 flex flex-col gap-y-[6px]">
									<TextAreaField
										textAreaLabel="Event Description"
										textAreaPlaceholder="Enter The Event Description"
										setData={setEventDescription}
										setEditData={setEditEventDescription}
										editData={editEventDescription}
										submited={null}
										data={data[0].eventDescription}
									/>
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

			<WarningPopUp
				open={warningPopUp}
				close={() => setWarningPopUp(false)}
				onConfirm={() => setWarningPopUp(false)}
				title="Warning!"
				message={warningPopUpDescription}
			/>

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
