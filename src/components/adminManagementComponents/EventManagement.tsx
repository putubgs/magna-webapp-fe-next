"use client";
import { useEffect, useState } from "react";
import { LeftChevronIcon } from "../icons/leftChevronIcon";
import { PencilIcon } from "../icons/pencilIcon";
import { TrashCanIcon } from "../icons/trashCanIcon";
import EventPopUp from "../adminPopUpComponents/eventPopUp";
import EventDetailPopUp from "../adminDetailPopUpComponents/eventDetailPopUp";
import DangerPopUp from "../dialog/dangerPopUp";
import SuccessPopUp from "../dialog/sucessPopUp";
import SuperAdminEventManagement from "../superAdminManagementComponents/SuperAdminEventManagement";
import Image from "next/image";

type EventProps = {
	buName?: string;
	eventName?: string;
	date?: string;
	startTime: string;
	endTime: string;
	registrationUrl?: string;
	startDate?: string;
	endDate?: string;
	eventDescription: string;
	image: string;
};

type SuccessPopUpProps = {
	title: string;
	message: string;
};

export default function EventManagement() {
	const [eventPopUp, setEventPopUp] = useState<boolean>(false);
	const [eventDetailPopUp, setEventDetailPopUp] = useState<boolean>(false);
	const [index, setIndex] = useState<number>(-1);
	const [eventDetailData, setEventDetailData] = useState<EventProps[] | null>(
		null
	);
	const [eventData, setEventData] = useState<EventProps[] | null>(() => {
		try {
			const getData = localStorage.getItem("eventData");

			if (!getData || getData == null || getData == "") {
				return null;
			}

			const parsedData = JSON.parse(getData);

			return parsedData.length > 0 ? parsedData : null;
		} catch {
			localStorage.removeItem("eventData");
		}
	});

	const [dangerPopUp, setDangerPopUp] = useState<boolean>(false);
	const [successPopUp, setSuccessPopUp] = useState<boolean>(false);
	const [successPopUpComponent, setSuccessPopUpComponent] =
		useState<SuccessPopUpProps | null>(null);

	useEffect(() => {
		if (eventData == null) {
			localStorage.removeItem("eventData");
		} else {
			localStorage.setItem("eventData", JSON.stringify(eventData));
		}
	}, [eventData]);

	function handleSubmitEvent(eventData: EventProps) {
		setSuccessPopUpComponent({
			title: "Event Added!",
			message: "You've successfully added a new event to the panel",
		});
		setSuccessPopUp(true);

		setEventData((prev) => (prev ? [...prev, eventData] : [eventData]));
	}

	function handleUpdateEvent(updatedData: EventProps, index: number) {
		setEventData((prev) => {
			if (!prev) return null;

			const currentData = prev[index];

			const compare = (
				current: string | undefined,
				updated: string | undefined
			): boolean => {
				const currentValue = current;
				const updatedValue = updated;
				return currentValue !== updatedValue;
			};

			const change =
				currentData.eventName !== updatedData.eventName ||
				currentData.date !== updatedData.date ||
				currentData.startTime !== updatedData.startTime ||
				currentData.endDate !== updatedData.endDate ||
				currentData.eventDescription !== updatedData.eventDescription ||
				currentData.image !== updatedData.image ||
				compare(currentData.registrationUrl, updatedData.registrationUrl) ||
				compare(currentData.startDate, updatedData.startDate) ||
				compare(currentData.endDate, updatedData.endDate);

			if (change) {
				const newData = [...prev];
				newData[index] = updatedData;

				setSuccessPopUpComponent({
					title: "Event Updated!",
					message: "The event have been successfully updated",
				});
				setSuccessPopUp(true);

				return newData;
			} else {
				return prev;
			}
		});
	}

	function handleDeletePopUp(index: number) {
		setIndex(index);
		setDangerPopUp(true);
	}

	function handleDeleteEvent() {
		setEventData((prev) => {
			if (!prev) return null;

			const newData = [...prev];
			newData.splice(index, 1);

			return newData;
		});
	}

	function showDetail(index: number) {
		setIndex(index);
		setEventDetailPopUp(true);

		if (eventData && eventData[index]) {
			setEventDetailData([
				{
					eventName: eventData[index].eventName,
					date: eventData[index].date,
					startTime: eventData[index].startTime,
					endTime: eventData[index].endTime,
					registrationUrl: eventData[index].registrationUrl,
					startDate: eventData[index].startDate,
					endDate: eventData[index].endDate,
					eventDescription: eventData[index].eventDescription,
					image: eventData[index].image,
				},
			]);
		}
	}

	const userRole = localStorage.getItem("userRole");

	return (
		<>
			{userRole == "admin" ? (
				<>
					<section className="bg-black border border-[#404040] p-[20px] rounded-[12px] space-y-[24px]">
						<div className="flex justify-between items-center">
							<h1 className="text-lg lg:text-2xl font-semibold">
								Events Management Panel
							</h1>
							<button
								onClick={() => setEventPopUp(true)}
								className="cursor-pointer bg-primary text-sm lg:text-base p-[16px] rounded-[8px]">
								Add Event +
							</button>
						</div>
						<div className="grid grid-cols-12 gap-[31px]">
							<div className="col-span-6 bg-[#1D1D1D] rounded-[8px] p-[20px] space-y-[11px]">
								<h1 className="text-xl lg:text-2xl font-semibold">0</h1>
								<h3 className="text-sm md:text-base text-[#A3A3A3] font-medium">
									Active Event
								</h3>
							</div>
							<div className="col-span-6 bg-[#1D1D1D] rounded-[8px] p-[20px] space-y-[11px]">
								<h1 className="text-xl lg:text-2xl font-semibold">0</h1>
								<h3 className="text-sm md:text-base text-[#A3A3A3] font-medium">
									Expired Event
								</h3>
							</div>
						</div>
					</section>
					<section className="overflow-scroll xl:overflow-auto relative h-full bg-black flex flex-col justify-start items-end border border-[#404040] p-[28px] rounded-[20px]">
						<table className="table-auto w-[1000px] xl:w-full text-white">
							<thead>
								<tr className="border-b border-[#D4D4D4] text-left">
									<th className="text-base lg:text-lg font-bold py-3 px-4">No</th>
									<th className="text-base lg:text-lg font-bold py-3 px-4">Poster</th>
									<th className="text-base lg:text-lg font-bold py-3 px-0">
										Event Name
									</th>
									<th className="text-base lg:text-lg font-bold py-3 px-4">Date</th>
									<th className="text-base lg:text-lg font-bold py-3 px-4">Actions</th>
								</tr>
							</thead>
							<tbody className="relative">
								{eventData && eventData.length > 0 ? (
									eventData.map((data, index) => (
										<tr key={index} className="border-b border-[#D4D4D4]">
											<td className="py-4 px-4 align-top text-sm font-medium">
												{index + 1}
											</td>
											<td className="py-4 px-4 align-top">
												<Image
													className="w-[150px] h-[150px] object-cover"
													src={data.image}
													alt="Event Poster"
                          width={200}
                          height={200}
												/>
											</td>
											<td className="py-4 align-top">
												<p className="text-base font-semibold leading-tight">
													{data.eventName}
												</p>
											</td>
											<td className="py-4 px-4 align-top text-base font-semibold whitespace-nowrap">
												{`${data.date && data.date.split("-")[0].split("/")[1]}/${
													data.date && data.date.split("-")[0].split("/")[0]
												}/${data.date && data.date.split("-")[0].split("/")[2]}`}
											</td>
											<td className="py-4 px-4 align-top">
												<div className="flex items-center gap-x-[16px]">
													<div
														onClick={() => showDetail(index)}
														className="cursor-pointer w-[34px] h-[34px] flex justify-center items-center border border-[#FF8800] p-[8px] rounded-[8px]">
														<PencilIcon width={18} height={18} color="#FF8800" />
													</div>
													<div
														onClick={() => handleDeletePopUp(index)}
														className="cursor-pointer w-[34px] h-[34px] flex justify-center items-center border border-[#C00707] p-[8px] rounded-[8px]">
														<TrashCanIcon width={14} height={18} color="#C00707" />
													</div>
												</div>
											</td>
										</tr>
									))
								) : (
									<tr className="h-[250px]">
										<td colSpan={5}>
											<div className="flex flex-col justify-center items-center text-white">
												<h1 className="text-xl lg:text-3xl font-black">NO DATA</h1>
											</div>
										</td>
									</tr>
								)}
							</tbody>
						</table>
						<div
							className={`mt-3 w-[1000px] xl:w-full ${
								eventData && eventData.length > 0 ? "flex" : "hidden"
							} justify-end items-center gap-2`}>
							<button className="h-full bg-[#1c1c1c] text-white px-3 py-1 rounded-md border border-white/20">
								<LeftChevronIcon width={23} height={23} color="white" />
							</button>
							<div className="bg-[#1c1c1c] text-white px-3 py-1 rounded-md border border-white/20 appearance-none">
								<select className="bg-none p-0">
									<option className="bg-none p-0">1</option>
								</select>
							</div>
							<p className="text-white">of 1</p>
							<button className="h-full bg-[#1c1c1c] text-white px-3 py-1 rounded-md border border-white/20 rotate-180">
								<LeftChevronIcon width={23} height={23} color="white" />
							</button>
						</div>
					</section>
				</>
			) : (
				<SuperAdminEventManagement />
			)}

			<EventPopUp
				open={eventPopUp}
				close={() => setEventPopUp(false)}
				save={handleSubmitEvent}
			/>

			{eventDetailData && (
				<EventDetailPopUp
					open={eventDetailPopUp}
					close={() => setEventDetailPopUp(false)}
					save={handleUpdateEvent}
					delete={handleDeleteEvent}
					data={eventDetailData}
					index={index}
				/>
			)}

			<DangerPopUp
				open={dangerPopUp}
				close={() => setDangerPopUp(false)}
				onConfirm={handleDeleteEvent}
				title="Delete"
				message="Are you sure you want to delete this?"
			/>

			{successPopUpComponent && (
				<SuccessPopUp
					open={successPopUp}
					close={() => setSuccessPopUp(false)}
					onConfirm={() => setSuccessPopUp(false)}
					title={successPopUpComponent.title}
					message={successPopUpComponent.message}
				/>
			)}
		</>
	);
}
