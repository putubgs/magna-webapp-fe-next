"use client";
import { useEffect, useState } from "react";
import SuccessPopUp from "../dialog/sucessPopUp";
import SuperAdminAboutUsDetailPopup from "../superAdminManagementDetailPopUpComponents/superAdminAboutUsDetailPopup";
import SuperAdminAboutUsPopUp from "../superAdminManagementPopUpComponents/superAdminAboutUsPopUp";
import { PencilIcon } from "../icons/pencilIcon";
import { LeftChevronIcon } from "../icons/leftChevronIcon";
import { ChevronDown, Search } from "lucide-react";
import { AdminCalendarIcon } from "../icons/adminCalendarIcon";
import Status from "../status";

export type SuperAdminAboutUsManagementProps = {
	organization: string;
	title: string;
	color: string;
	slogan: string;
	description: string;
	instagram: string;
	email: string;
	linkedin: string;
	image: string;
	date: string;
	status: "waiting" | "approved" | "rejected";
};

type SuccessPopUpProps = {
	title: string;
	message: string;
};

export default function SuperAdminAboutUsManagement() {
	const [addAboutUsPopUp, setAddAboutUsPopUp] = useState<boolean>(false);
	const [aboutUsDetailPopUp, setAboutUsDetailPopUp] = useState<boolean>(false);
	const [index, setIndex] = useState<number>(-1);
	const [aboutUsDetailData, setAboutUsDetailData] = useState<
		SuperAdminAboutUsManagementProps[] | null
	>(null);
	const [aboutUsData, setAboutUsData] = useState<
		SuperAdminAboutUsManagementProps[] | null
	>(() => {
		try {
			const getData = localStorage.getItem("superAdminAboutUsData");

			if (!getData || getData == null || getData == "") {
				return null;
			}

			const parsedData = JSON.parse(getData);

			return parsedData.length > 0 ? parsedData : null;
		} catch {
			localStorage.removeItem("superAdminAboutUsData");
		}
	});

	const [successPopUp, setSuccessPopUp] = useState<boolean>(false);
	const [successPopUpComponent, setSuccessPopUpComponent] =
		useState<SuccessPopUpProps | null>(null);

	useEffect(() => {
		if (aboutUsData == null) {
			localStorage.removeItem("superAdminAboutUsData");
		} else {
			localStorage.setItem("superAdminAboutUsData", JSON.stringify(aboutUsData));
		}
	}, [aboutUsData]);

	function handleSubmitAboutUs(aboutUsData: SuperAdminAboutUsManagementProps) {
		setSuccessPopUpComponent({
			title: "Business Unit Page Added!",
			message: "You've successfully added a new business unit page to the panel",
		});
		setSuccessPopUp(true);

		setAboutUsData((prev) => (prev ? [...prev, aboutUsData] : [aboutUsData]));
	}

	function handleUpdateAboutUs(
		updatedData: SuperAdminAboutUsManagementProps,
		index: number
	) {
		setAboutUsData((prev) => {
			if (!prev) return null;

			const currentData = prev[index];

			const change =
				currentData.title !== updatedData.title ||
				currentData.color !== updatedData.color ||
				currentData.description !== updatedData.description ||
				currentData.instagram !== updatedData.instagram ||
				currentData.email !== updatedData.email ||
				currentData.linkedin !== updatedData.linkedin ||
				currentData.image !== updatedData.image ||
				currentData.status !== updatedData.status ||
				currentData.organization !== updatedData.organization ||
				currentData.slogan !== updatedData.slogan;

			if (change) {
				const newData = [...prev];
				newData[index] = updatedData;

				setSuccessPopUpComponent({
					title: "Business Unit Page Updated!",
					message: "The business unit have been successfully updated",
				});
				setSuccessPopUp(true);

				return newData;
			} else {
				return prev;
			}
		});
	}

	function handleDeleteAboutUs(index: number) {
		setAboutUsData((prev) => {
			if (!prev) return null;

			const result = prev.filter((_, i) => i !== index);

			return result.length > 0 ? result : null;
		});
	}

	function showDetail(index: number) {
		setIndex(index);
		setAboutUsDetailPopUp(true);

		if (aboutUsData && aboutUsData[index]) {
			setAboutUsDetailData([
				{
					organization: aboutUsData[index].organization,
					title: aboutUsData[index].title,
					color: aboutUsData[index].color,
					slogan: aboutUsData[index].slogan,
					description: aboutUsData[index].description,
					instagram: aboutUsData[index].instagram,
					email: aboutUsData[index].email,
					linkedin: aboutUsData[index].linkedin,
					image: aboutUsData[index].image,
					date: aboutUsData[index].date,
					status: aboutUsData[index].status,
				},
			]);
		}
	}

	return (
		<>
			<section className="bg-black border border-[#404040] p-[20px] rounded-[12px] space-y-[24px]">
				<section className="flex justify-between items-center bg-black">
					<h1 className="text-lg lg:text-2xl font-semibold">
						About Us Management Panel
					</h1>
					<button
						onClick={() => {
							setAddAboutUsPopUp(true);
						}}
						className="cursor-pointer bg-primary text-sm lg:text-base p-[16px] rounded-[8px]">
						Add About Us +
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
			<section className="overflow-auto h-full bg-black flex flex-col border border-[#404040] p-[28px] rounded-[20px] gap-[28px]">
				<h1 className="text-2xl font-semibold">About Us Database</h1>
				<table className="table-fixed w-full text-white">
					<thead>
						<tr className="border-b border-[#D4D4D4] text-left">
							<th className="w-1/12 py-3 text-base lg:text-lg font-bold">No</th>
							<th className="w-2/12 py-3 text-base lg:text-lg font-bold">Date</th>
							<th className="w-3/12 py-3 text-base lg:text-lg font-bold">BU Name</th>
							<th className="w-3/12 py-3 text-base lg:text-lg font-bold">BU Slogan</th>
							<th className="w-1/12 py-3 text-base text-center lg:text-lg font-bold">
								Status
							</th>
							<th className="text-end pr-8 w-2/12 py-3 text-base lg:text-l font-bold">
								Detail
							</th>
						</tr>
					</thead>
					<tbody className="relative">
						{aboutUsData && aboutUsData.length > 0 ? (
							aboutUsData.map((data, index) => (
								<tr key={index} className="border-b border-[#D4D4D4]">
									<td className="py-4 align-top text-sm font-medium">{index + 1}</td>
									<td className="py-4 align-top">
										<p className="text-base font-medium">{data.date}</p>
									</td>
									<td className="py-4 align-top text-sm font-medium">
										{data.organization}
									</td>
									<td className="py-4 px-0 align-top text-base font-normal whitespace-nowrap">
										{data.slogan}
									</td>
									<td className="py-4 px-0 align-top w-full text-base justify-center flex font-normal whitespace-nowrap">
										<Status status={data.status} />
									</td>
									<td className="py-4 align-top text-end pr-9">
										<div className="flex justify-end items-center gap-x-4">
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
					className={`w-[1000px] xl:w-full ${
						aboutUsData && aboutUsData.length > 0 ? "flex" : "hidden"
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

			<SuperAdminAboutUsPopUp
				open={addAboutUsPopUp}
				close={() => setAddAboutUsPopUp(false)}
				save={handleSubmitAboutUs}
			/>

			{aboutUsDetailData && (
				<SuperAdminAboutUsDetailPopup
					open={aboutUsDetailPopUp}
					close={() => setAboutUsDetailPopUp(false)}
					save={handleUpdateAboutUs}
					delete={handleDeleteAboutUs}
					data={aboutUsDetailData}
					index={index}
				/>
			)}

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
