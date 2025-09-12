"use client";
import { useEffect, useState } from "react";
import { LeftChevronIcon } from "../icons/leftChevronIcon";
import { PencilIcon } from "../icons/pencilIcon";
import SuperAdminPartnershipManagementDetailPopUp from "../superAdminManagementDetailPopUpComponents/superAdminPartnershipManagementDetailPopUp";
import SuperAdminPartnershipManagementPopUp from "../superAdminManagementPopUpComponents/superAdminPartnershipManagementPopUp";
import { Search, TriangleAlert } from "lucide-react";
import { TrashCanIcon } from "../icons/trashCanIcon";
import DangerPopUp from "../dialog/dangerPopUp";
import SuccessPopUp from "../dialog/sucessPopUp";
import Image from "next/image";

type SuperAdminPartnershipProps = {
	checked?: boolean;
	partnerName: string;
	image: string;
};

type SuccessPopUpProps = {
	title: string;
	message: string;
};

export default function SuperAdminPartnershipManagement() {
	const [partnershipPopUp, setPartnershipPopUp] = useState<boolean>(false);
	const [
		superAdminPartnershipManagementDetailPopUp,
		setSuperAdminPartnershipManagementDetailPopUp,
	] = useState<boolean>(false);
	const [index, setIndex] = useState<number>(-1);
	const [superAdminPartnershipDetailData, setsuperAdminPartnershipDetailData] =
		useState<SuperAdminPartnershipProps[] | null>(null);
	const [
		superAdminPartnershipManagementData,
		setSuperAdminPartnershipManagementData,
	] = useState<SuperAdminPartnershipProps[] | null>(() => {
		try {
			const getData = localStorage.getItem("superAdminPartnershipManagementData");

			if (!getData || getData == null || getData == "") {
				return null;
			}

			const parsedData = JSON.parse(getData);

			return parsedData.length > 0 ? parsedData : null;
		} catch {
			localStorage.removeItem("superAdminPartnershipManagementData");
		}
	});

	const [dangerPopUp, setDangerPopUp] = useState<boolean>(false);
	const [successPopUp, setSuccessPopUp] = useState<boolean>(false);
	const [successPopUpComponent, setSuccessPopUpComponent] =
		useState<SuccessPopUpProps | null>(null);

	useEffect(() => {
		if (superAdminPartnershipManagementData == null) {
			localStorage.removeItem("superAdminPartnershipManagementData");
		} else {
			localStorage.setItem(
				"superAdminPartnershipManagementData",
				JSON.stringify(superAdminPartnershipManagementData)
			);
		}
	}, [superAdminPartnershipManagementData]);

	const handleCheck = (index: number) => {
		setSuperAdminPartnershipManagementData((prev) => {
			if (!prev) return null;

			const newData = [...prev];
			newData[index] = {
				...newData[index],
				checked: !newData[index].checked,
			};

			return newData;
		});
	};

	function handleSubmitPartnership(
		superAdminPartnershipData: SuperAdminPartnershipProps
	) {
		setSuccessPopUpComponent({
			title: "Partner Added!",
			message: "You've successfully added a new partner to the panel",
		});
		setSuccessPopUp(true);

		setSuperAdminPartnershipManagementData((prev) =>
			prev ? [...prev, superAdminPartnershipData] : [superAdminPartnershipData]
		);
	}

	function handleUpdatePartnership(
		updatedData: SuperAdminPartnershipProps,
		index: number
	) {
		setSuperAdminPartnershipManagementData((prev) => {
			if (!prev) return null;

			const currentData = prev[index];

			const change =
				currentData.partnerName !== updatedData.partnerName ||
				currentData.image !== updatedData.image ||
				(currentData.checked || false) !== (updatedData.checked || false);

			if (change) {
				const newData = [...prev];
				newData[index] = updatedData;

				setSuccessPopUpComponent({
					title: "Partnership Updated!",
					message: "The partnership have been successfully updated",
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

	function handleDeletePartnership() {
		setSuperAdminPartnershipManagementData((prev) => {
			if (!prev) return null;

			const result = prev.filter((_, i) => i !== index);

			return result.length > 0 ? result : null;
		});
	}

	function showDetail(index: number) {
		setIndex(index);
		setSuperAdminPartnershipManagementDetailPopUp(true);

		if (
			superAdminPartnershipManagementData &&
			superAdminPartnershipManagementData[index]
		) {
			setsuperAdminPartnershipDetailData([
				{
					partnerName: superAdminPartnershipManagementData[index].partnerName,
					image: superAdminPartnershipManagementData[index].image,
				},
			]);
		}
	}

	return (
		<>
			<section className="bg-black border border-[#404040] p-[20px] rounded-[12px] space-y-[24px]">
				<section className="flex justify-between items-center">
					<h1 className="text-lg lg:text-2xl font-semibold">
						Partnership Management Panel
					</h1>
					<button
						onClick={() => setPartnershipPopUp(true)}
						className="cursor-pointer bg-primary text-sm lg:text-base p-[16px] rounded-[8px]">
						Add Partner +
					</button>
				</section>
				{superAdminPartnershipManagementData && (
					<section className="grid grid-cols-12 gap-x-[20px]">
						<div className="col-span-12 flex items-center bg-neutral-800 gap-[10px] p-[12px] rounded-[8px]">
							<Search />
							<input
								className="w-full h-full text-white placeholder-white outline-none"
								type="text"
								placeholder="Search"
							/>
						</div>
					</section>
				)}
			</section>
			<section className="overflow-scroll xl:overflow-auto h-[500px] bg-black flex flex-col justify-start border border-[#404040] rounded-[20px] p-4">
				<table className="table-auto w-[700px] xl:w-full h-fit text-white">
					<thead>
						<tr className="border-b border-[#D4D4D4] text-left">
							<th className="text-base lg:text-lg font-bold py-3 px-4">No</th>
							<th className="text-base lg:text-lg font-bold py-3 px-4">Displayed</th>
							<th className="text-base lg:text-lg font-bold py-3 px-20">Logo</th>
							<th className="text-base lg:text-lg font-bold py-3 px-4">Partner</th>
							<th className="text-base lg:text-lg font-bold py-3 px-1">Actions</th>
						</tr>
					</thead>
					<tbody className="relative">
						{superAdminPartnershipManagementData ? (
							superAdminPartnershipManagementData.map((data, index) => (
								<tr key={index} className="border-b border-[#D4D4D4]">
									<td className="py-4 px-4 align-top text-sm font-medium">
										{index + 1}
									</td>
									<td className="py-4 px-4 align-top text-sm font-medium">
										<input
											onChange={() => handleCheck(index)}
											checked={data.checked || false}
											className="cursor-pointer w-[40px] h-[40px] appearance-none border-2 border-white bg-transparent rounded-md checked:bg-transparent checked:border-white relative before:content-[''] before:absolute before:top-4 before:left-1/2 before:transform before:-translate-x-1/2 before:-translate-y-1/2 before:w-4 before:h-2 before:border-l-2 before:border-b-2 before:border-white before:rotate-[-45deg] before:opacity-0 checked:before:opacity-100"
											type="checkbox"
										/>
									</td>
									<td className="py-4 px-20 align-top">
										<Image
											className="w-[50px] h-[50px]"
											src={data.image}
											alt=""
											width={200}
											height={200}
										/>
									</td>
									<td className="py-4 px-4 align-top text-base font-normal whitespace-nowrap">
										{data.partnerName}
									</td>
									<td className="py-4 align-top">
										<div className="flex items-center gap-x-[16px]">
											<div
												onClick={() => showDetail(index)}
												className="cursor-pointer w-[34px] h-[34px] flex justify-center items-center border border-[#FF8800] p-[8px] rounded-[8px]">
												<PencilIcon width={18} height={18} color="#FF8800" />
											</div>
											<div
												onClick={() => handleDeletePopUp(index)}
												className="cursor-pointer w-[36px] h-[36px] flex justify-center items-center border border-[#C00707] rounded-md">
												<TrashCanIcon width={16} height={18} color="#C00707" />
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
						superAdminPartnershipManagementData &&
						superAdminPartnershipManagementData.length > 0
							? "flex"
							: "hidden"
					} ${
						superAdminPartnershipManagementData &&
						superAdminPartnershipManagementData.length > 0 &&
						superAdminPartnershipManagementData?.filter(
							(item) => item.checked == true
						).length < 3
							? "justify-between"
							: "justify-end"
					} items-center`}>
					{superAdminPartnershipManagementData &&
						superAdminPartnershipManagementData.length > 0 &&
						superAdminPartnershipManagementData?.filter(
							(item) => item.checked == true
						).length < 3 && (
							<div className="flex items-center text-[#FB923C] gap-x-[10px]">
								<TriangleAlert />
								<p>Please select minimum 3 partners to display.</p>
							</div>
						)}
					<div className="flex justify-end items-center gap-2">
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
				</div>
			</section>

			<SuperAdminPartnershipManagementPopUp
				open={partnershipPopUp}
				close={() => setPartnershipPopUp(false)}
				save={handleSubmitPartnership}
			/>

			{superAdminPartnershipDetailData && (
				<SuperAdminPartnershipManagementDetailPopUp
					open={superAdminPartnershipManagementDetailPopUp}
					close={() => setSuperAdminPartnershipManagementDetailPopUp(false)}
					save={handleUpdatePartnership}
					delete={handleDeletePartnership}
					data={superAdminPartnershipDetailData}
					index={index}
				/>
			)}

			<DangerPopUp
				open={dangerPopUp}
				close={() => setDangerPopUp(false)}
				onConfirm={handleDeletePartnership}
				title="Delete This Partner?"
				message="Are you sure you want to delete this partner?"
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
