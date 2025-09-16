"use client";
import { ChevronDown, PencilIcon, Search } from "lucide-react";
import { AdminCalendarIcon } from "../icons/adminCalendarIcon";
import { LeftChevronIcon } from "../icons/leftChevronIcon";
import { useEffect, useState } from "react";
import SuccessPopUp from "../dialog/sucessPopUp";
import DangerPopUp from "../dialog/dangerPopUp";
import SuperAdminEventManagementPopUp from "../superAdminManagementPopUpComponents/superAdminEventManagementPopUp";
import SuperAdminEventDetailPopUp from "../superAdminManagementDetailPopUpComponents/superAdminEventDetailManagementPopUp";

type SuperAdminEventManagementProps = {
	organization: string;
	eventName: string;
	registrationUrl1: string;
	date: string;
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

export default function SuperAdminEventManagement() {
	const [eventPopUp, setEventPopUp] = useState<boolean>(false);
	const [
		superAdminEventManagementDetailPopUp,
		setSuperAdminEventManagementDetailPopUp,
	] = useState<boolean>(false);
	const [index, setIndex] = useState<number>(-1);
	const [
		superAdminEventManagementDetailData,
		setSuperAdminEventManagementDetailData,
	] = useState<SuperAdminEventManagementProps[] | null>(null);
	const [superAdminEventManagementData, setSuperAdminEventManagementData] =
		useState<SuperAdminEventManagementProps[]>(() => {
			try {
				const getData = localStorage.getItem("superAdminEventManagementData");

				if (!getData || getData == null || getData == "") {
					return null;
				}

				const parsedData = JSON.parse(getData);

				return parsedData.length > 0 ? parsedData : null;
			} catch {
				localStorage.removeItem("superAdminEventManagementData");
			}
		});

	const [dangerPopUp, setDangerPopUp] = useState<boolean>(false);
	const [successPopUp, setSuccessPopUp] = useState<boolean>(false);
	const [successPopUpComponent, setSuccessPopUpComponent] =
		useState<SuccessPopUpProps | null>(null);

	useEffect(() => {
		const superAdminEventData = localStorage.getItem(
			"superAdminEventManagementData"
		);
		if (superAdminEventData) {
			const parsedData = JSON.parse(superAdminEventData);
			setSuperAdminEventManagementData(parsedData || []);
		}
	}, []);

	useEffect(() => {
		if (superAdminEventManagementData == null) {
			localStorage.removeItem("superAdminEventManagementData");
		} else {
			localStorage.setItem(
				"superAdminEventManagementData",
				JSON.stringify(superAdminEventManagementData)
			);
		}
	}, [superAdminEventManagementData]);

	function handleSubmitEvent(
		superAdminEventData: SuperAdminEventManagementProps
	) {
		setSuccessPopUpComponent({
			title: "Event Added!",
			message: "You've successfully added a new event to the panel",
		});
		setSuccessPopUp(true);

		setSuperAdminEventManagementData((prev) =>
			prev ? [...prev, superAdminEventData] : [superAdminEventData]
		);
	}

	function handleUpdateEvent(
		updatedData: SuperAdminEventManagementProps,
		index: number
	) {
		setSuperAdminEventManagementDetailData((prev) => {
			if (!prev) return null;

			const currentData = prev[0];

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
				setSuperAdminEventManagementData((prevMain) => {
					const newData = [...prevMain];
					newData[index] = updatedData;

					localStorage.setItem(
						"superAdminEventManagementData",
						JSON.stringify(newData)
					);

					return newData;
				});

				const newDetailData = [updatedData];

				setSuccessPopUpComponent({
					title: "Event Updated!",
					message: "The event have been successfully updated",
				});

				setSuccessPopUp(true);

				return newDetailData;
			} else {
				return prev;
			}
		});
	}

	function handleDeleteEvent() {
		setSuperAdminEventManagementData((prev) => {
			const newData = [...prev];
			newData.splice(index, 1);

			localStorage.removeItem("superAdminEventManagementData");

			return newData;
		});

		setDangerPopUp(false);
		setSuperAdminEventManagementDetailPopUp(false);

		setSuccessPopUpComponent({
			title: "Event Deleted!",
			message: "The event has been successfully deleted",
		});
		setSuccessPopUp(true);
	}

	function showDetail(index: number) {
		setIndex(index);
		setSuperAdminEventManagementDetailPopUp(true);

		if (superAdminEventManagementData && superAdminEventManagementData[index]) {
			setSuperAdminEventManagementDetailData([
				{
					organization: superAdminEventManagementData[index].organization,
					date: superAdminEventManagementData[index].date,
					eventName: superAdminEventManagementData[index].eventName,
					registrationUrl1: superAdminEventManagementData[index].registrationUrl1,
					startTime: superAdminEventManagementData[index].startTime,
					endTime: superAdminEventManagementData[index].endTime,
					registrationUrl: superAdminEventManagementData[index].registrationUrl,
					startDate: superAdminEventManagementData[index].startDate,
					endDate: superAdminEventManagementData[index].endDate,
					eventDescription: superAdminEventManagementData[index].eventDescription,
					image: superAdminEventManagementData[index].image,
				},
			]);
		}
	}

	const getData = (): SuperAdminEventManagementProps[] => {
		try {
			const superAdminEventData = localStorage.getItem(
				"superAdminEventManagementData"
			);

			if (!superAdminEventData || superAdminEventData === "") {
				return [];
			}

			const parsedData = JSON.parse(superAdminEventData);

			return Array.isArray(parsedData) ? parsedData : [];
		} catch {
			localStorage.removeItem("superAdminEventManagementData");

			return [];
		}
	};

	const superAdminEventData = getData();

	return (
		<>
			<section className="bg-black border border-[#404040] p-[20px] rounded-[12px] space-y-[24px]">
				<section className="flex justify-between items-center">
					<h1 className="text-lg lg:text-2xl font-semibold">
						Event Management Panel
					</h1>
					<button
						onClick={() => setEventPopUp(true)}
						className="cursor-pointer bg-primary text-sm lg:text-base p-[16px] rounded-[8px]">
						Add Event +
					</button>
				</section>
				<section className="grid grid-cols-12 gap-x-[20px]">
					<div className="col-span-9 flex items-center bg-neutral-800 gap-[10px] p-[12px] rounded-[8px]">
						<Search />
						<input
							className="w-full h-full text-white placeholder-white outline-none"
							type="text"
							placeholder="Search"
						/>
					</div>
					<div className="col-span-1 bg-neutral-800 flex justify-center items-center gap-x-[10px] rounded-[8px]">
						<p>Date</p>
						<AdminCalendarIcon className="w-5 h-5" color="#fff" />
					</div>
					<div className="col-span-2 bg-neutral-800 flex justify-center items-center gap-x-[10px] rounded-[8px]">
						<p>Organization</p>
						<ChevronDown />
					</div>
				</section>
			</section>
			<section className="overflow-scroll xl:overflow-auto h-full bg-black flex flex-col border border-[#404040] p-[28px] rounded-[20px] gap-[28px]">
				<h1 className="text-2xl font-semibold">Event</h1>
				<table className="table-auto w-[1000px] xl:w-full text-white">
					<thead>
						<tr className="border-b border-[#D4D4D4] text-left">
							<th className="text-base lg:text-lg font-bold py-3 px-4">No</th>
							<th className="text-base lg:text-lg font-bold py-3 px-4">BU Name</th>
							<th className="text-base lg:text-lg font-bold py-3 px-10">Event Name</th>
							<th className="text-base lg:text-lg font-bold py-3 px-4">Date</th>
							<th className="text-base lg:text-lg font-bold py-3 px-">Actions</th>
						</tr>
					</thead>
					<tbody className="relative">
						{superAdminEventData.length > 0 ? (
							superAdminEventData.map(
								(data: SuperAdminEventManagementProps, index: number) => (
									<tr key={index} className="border-b border-[#D4D4D4]">
										<td className="py-4 px-4 align-top text-sm font-medium">
											{index + 1}
										</td>
										<td className="py-4 px-4 align-top text-sm font-medium">
											{data.organization}
										</td>
										<td className="py-4 px-10 align-top">
											<p className="text-base font-medium leading-tight">
												{data.eventName}
											</p>
										</td>
										<td className="py-4 px-0 align-top text-base font-normal whitespace-nowrap">
											{data.date}
										</td>
										<td className="py-4 px-4 align-top">
											<div className="flex items-center gap-x-[16px]">
												<div className="cursor-pointer w-[34px] h-[34px] flex justify-center items-center border border-[#FF8800] p-[8px] rounded-[8px]">
													<div
														onClick={() => showDetail(index)}
														className="cursor-pointer w-[34px] h-[34px] flex justify-center items-center border border-[#FF8800] p-[8px] rounded-[8px]">
														<PencilIcon width={18} height={18} color="#FF8800" />
													</div>
												</div>
											</div>
										</td>
									</tr>
								)
							)
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
					className={`w-[1000px] xl:w-full ${
						superAdminEventManagementData && superAdminEventManagementData.length > 0
							? "flex"
							: "hidden"
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

			<SuperAdminEventManagementPopUp
				open={eventPopUp}
				close={() => setEventPopUp(false)}
				save={handleSubmitEvent}
			/>

			{superAdminEventManagementDetailData && (
				<SuperAdminEventDetailPopUp
					open={superAdminEventManagementDetailPopUp}
					close={() => setSuperAdminEventManagementDetailPopUp(false)}
					save={handleUpdateEvent}
					delete={handleDeleteEvent}
					data={superAdminEventManagementDetailData}
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
