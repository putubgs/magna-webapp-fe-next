"use client";
import { useEffect, useState } from "react";
import { LeftChevronIcon } from "../icons/leftChevronIcon";
import { PencilIcon } from "../icons/pencilIcon";

import DangerPopUp from "../dialog/dangerPopUp";
import SuccessPopUp from "../dialog/sucessPopUp";
import { AdminCalendarIcon } from "../icons/adminCalendarIcon";
import { ChevronDown, Search } from "lucide-react";

import SuperAdminGalleryManagementPopUp from "../superAdminManagementPopUpComponents/superAdminGalleryManagementPopUp";
import SuperAdminGalleryManagementDetailPopUp from "../superAdminManagementDetailPopUpComponents/superAdminGalleryManagementDetailPopUp";

type SuperAdminGalleryManagementProps = {
	organization: string;
	eventName: string;
	date: string;
	image: string;
};

type SuccessPopUpProps = {
	title: string;
	message: string;
};

export default function SuperAdminGalleryManagement() {
	const [galleryPopUp, setGalleryPopUp] = useState<boolean>(false);
	const [
		superAdminGalleryManagementDetailPopUp,
		setSuperAdminGalleryManagementDetailPopUp,
	] = useState<boolean>(false);
	const [index, setIndex] = useState<number>(-1);
	const [
		superAdminGalleryManagementDetailData,
		setSuperAdminGalleryManagementDetailData,
	] = useState<SuperAdminGalleryManagementProps[] | null>(null);
	const [superAdminGalleryManagementData, setSuperAdminGalleryManagementData] =
		useState<SuperAdminGalleryManagementProps[] | null>(() => {
			try {
				const getData = localStorage.getItem("superAdminGalleryManagementData");

				if (!getData || getData == null || getData == "") {
					return null;
				}

				const parsedData = JSON.parse(getData);

				return parsedData.length > 0 ? parsedData : null;
			} catch {
				localStorage.removeItem("superAdminGalleryManagementData");
			}
		});

	const [dangerPopUp, setDangerPopUp] = useState<boolean>(false);
	const [successPopUp, setSuccessPopUp] = useState<boolean>(false);
	const [successPopUpComponent, setSuccessPopUpComponent] =
		useState<SuccessPopUpProps | null>(null);

	useEffect(() => {
		if (superAdminGalleryManagementData == null) {
			localStorage.removeItem("superAdminGalleryManagementData");
		} else {
			localStorage.setItem(
				"superAdminGalleryManagementData",
				JSON.stringify(superAdminGalleryManagementData)
			);
		}
	}, [superAdminGalleryManagementData]);

	function handleSubmitGallery(
		superAdminGalleryData: SuperAdminGalleryManagementProps
	) {
		setSuccessPopUpComponent({
			title: "Photo Added!",
			message: "You've successfully added a new photo to the panel",
		});
		setSuccessPopUp(true);

		setSuperAdminGalleryManagementData((prev) =>
			prev ? [...prev, superAdminGalleryData] : [superAdminGalleryData]
		);
	}

	function handleUpdateGallery(
		updatedData: SuperAdminGalleryManagementProps,
		index: number
	) {
		setSuperAdminGalleryManagementData((prev) => {
			if (!prev) return null;

			const currentData = prev[index];

			const change =
				currentData.eventName !== updatedData.eventName ||
				currentData.date !== updatedData.date ||
				currentData.image !== updatedData.image;

			if (change) {
				const newData = [...prev];
				newData[index] = updatedData;

				setSuccessPopUpComponent({
					title: "Gallery Updated!",
					message: "The gallery have been successfully updated",
				});
				setSuccessPopUp(true);

				return newData;
			} else {
				return prev;
			}
		});
	}

	function handleDeleteGallery() {
		setSuperAdminGalleryManagementData((prev) => {
			if (!prev) return null;

			const result = prev.filter((_, i) => i !== index);

			return result.length > 0 ? result : null;
		});
	}

	function showDetail(index: number) {
		setIndex(index);
		setSuperAdminGalleryManagementDetailPopUp(true);

		if (
			superAdminGalleryManagementData &&
			superAdminGalleryManagementData[index]
		) {
			setSuperAdminGalleryManagementDetailData([
				{
					organization: superAdminGalleryManagementData[index].organization,
					eventName: superAdminGalleryManagementData[index].eventName,
					date: superAdminGalleryManagementData[index].date,
					image: superAdminGalleryManagementData[index].image,
				},
			]);
		}
	}

	return (
		<>
			<section className="flex-col justify-between items-center bg-black border border-[#404040] p-[20px] rounded-[12px] space-y-[24px]">
				<section className="flex justify-between items-center">
					<h1 className="text-lg lg:text-2xl font-semibold">
						Gallery Management Panel
					</h1>
					<button
						onClick={() => setGalleryPopUp(true)}
						className="cursor-pointer bg-primary text-sm lg:text-base p-[16px] rounded-[8px]">
						Add Gallery +
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
			<section className="overflow-scroll xl:overflow-auto h-[500px] bg-black flex flex-col justify-start border border-[#404040] rounded-[20px] p-4">
				<h1 className="text-xl font-semibold mb-7">Gallery</h1>
				<table className="table-auto w-[1000px] xl:w-full text-white">
					<thead>
						<tr className="border-b border-[#D4D4D4] text-left">
							<th className="text-base lg:text-lg font-bold py-3 px-4">No</th>
							<th className="text-base lg:text-lg font-bold py-3 px-4">Date</th>
							<th className="text-base lg:text-lg font-bold py-3 px-4">BU Name</th>

							<th className="text-base lg:text-lg font-bold py-3 px-0">Event Name</th>
							<th className="text-base lg:text-lg font-bold py-3 px-4">Detail</th>
						</tr>
					</thead>
					<tbody className="relative h-auto">
						{superAdminGalleryManagementData ? (
							superAdminGalleryManagementData.map((data, index) => (
								<tr key={index} className="border-b border-[#D4D4D4]">
									<td className="py-4 px-4 align-top text-sm font-medium">
										{index + 1}
									</td>
									<td className="py-4 px-4 align-top text-base font-medium whitespace-nowrap">
										{new Date(data.date).toLocaleDateString("en-GB", {
											day: "2-digit",
											month: "short",
											year: "numeric",
										})}
									</td>

									<td className="py-4 px-4 align-top">
										<p className="text-base font-semibold leading-tight">
											{data.organization}
										</p>
									</td>
									<td className="py-4 px-4 align-top">
										<p className="text-base font-semibold leading-tight">
											{data.eventName}
										</p>
									</td>
									<td className="py-4 px-4 align-top">
										<div className="flex items-center gap-x-[16px] pl-2">
											<div
												onClick={() => showDetail(index)}
												className="cursor-pointer w-[34px] h-[34px] flex justify-center items-center border border-[#FF8800] p-[8px] rounded-[8px]">
												<PencilIcon width={18} height={18} color="#FF8800" />
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
					className={`w-[1000px] xl:w-full mt-3 ${
						superAdminGalleryManagementData &&
						superAdminGalleryManagementData.length > 0
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
			<SuperAdminGalleryManagementPopUp
				open={galleryPopUp}
				close={() => setGalleryPopUp(false)}
				save={handleSubmitGallery}
			/>

			{superAdminGalleryManagementDetailData && (
				<SuperAdminGalleryManagementDetailPopUp
					open={superAdminGalleryManagementDetailPopUp}
					close={() => setSuperAdminGalleryManagementDetailPopUp(false)}
					save={handleUpdateGallery}
					delete={handleDeleteGallery}
					data={superAdminGalleryManagementDetailData}
					index={index}
				/>
			)}

			<DangerPopUp
				open={dangerPopUp}
				close={() => setDangerPopUp(false)}
				onConfirm={handleDeleteGallery}
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
