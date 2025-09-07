"use client";
import { ChevronDown, PencilIcon, Search } from "lucide-react";
import { AdminCalendarIcon } from "../icons/adminCalendarIcon";
import { useEffect, useState } from "react";
import SuccessPopUp from "../dialog/sucessPopUp";
import SuperAdminImpactManagementPopUp from "../superAdminManagementPopUpComponents/superAdminImpactManagementPopUp";
import SuperAdminImpactManagementDetailPopUp from "../superAdminManagementDetailPopUpComponents/superAdminImpactManagementDetailPopUp";

type SuperAdminImpactManagementProps = {
	displayed?: boolean;
	metric: string;
	metricValue: string;
};

type ImpactDetailProps = {
	impactDetail: SuperAdminImpactManagementProps[];
};

type SuccessPopUpProps = {
	title: string;
	message: string;
};

export default function SuperAdminImpactManagement() {
	const [impactPopUp, setImpactPopUp] = useState<boolean>(false);
	const [
		superAdminImpactManagementDetailPopUp,
		setSuperAdminImpactManagementDetailPopUp,
	] = useState<boolean>(false);
	const [
		superAdminImpactManagementDetailData,
		setSuperAdminImpactManagementDetailData,
	] = useState<ImpactDetailProps[] | null>(null);
	const [superAdminImpactManagementData, setSuperAdminImpactManagementData] =
		useState<SuperAdminImpactManagementProps[]>(() => {
			try {
				const getData = localStorage.getItem("superAdminImpactManagementData");

				if (!getData || getData == null || getData == "") {
					return null;
				}

				const parsedData = JSON.parse(getData);

				return parsedData.length > 0 ? parsedData : null;
			} catch {
				localStorage.removeItem("superAdminImpactManagementData");
			}
		});

	const [successPopUp, setSuccessPopUp] = useState<boolean>(false);
	const [successPopUpComponent, setSuccessPopUpComponent] =
		useState<SuccessPopUpProps | null>(null);

	useEffect(() => {
		const superAdminImpactData = localStorage.getItem(
			"superAdminImpactManagementData"
		);
		if (superAdminImpactData) {
			const parsedData = JSON.parse(superAdminImpactData);
			setSuperAdminImpactManagementData(parsedData || []);
		}
	}, []);

	useEffect(() => {
		if (superAdminImpactManagementData == null) {
			localStorage.removeItem("superAdminImpactManagementData");
		} else {
			localStorage.setItem(
				"superAdminImpactManagementData",
				JSON.stringify(superAdminImpactManagementData)
			);
		}
	}, [superAdminImpactManagementData]);

	function handleSubmitImpact(
		superAdminImpactData: SuperAdminImpactManagementProps
	) {
		setSuccessPopUpComponent({
			title: " Metric Added!",
			message: "You’ve successfully added a new metric to the panel",
		});
		setSuccessPopUp(true);

		setSuperAdminImpactManagementData((prev) =>
			prev ? [...prev, superAdminImpactData] : [superAdminImpactData]
		);
	}

	function handleUpdateImpact(
		updatedDataArray: SuperAdminImpactManagementProps[]
	) {
		setSuperAdminImpactManagementDetailData((prev) => {
			if (!prev) return null;

			const currentData = prev[0].impactDetail;

			const hasChanges =
				JSON.stringify(currentData) !== JSON.stringify(updatedDataArray);

			if (hasChanges) {
				setSuperAdminImpactManagementData(updatedDataArray);

				localStorage.setItem(
					"superAdminImpactData",
					JSON.stringify(updatedDataArray)
				);

				const newDetailData = [{ impactDetail: updatedDataArray }];

				setSuccessPopUpComponent({
					title: "Impact Updated!",
					message: "The impact metrics have been successfully updated",
				});

				setSuccessPopUp(true);

				return newDetailData;
			} else {
				return prev;
			}
		});
	}

	function showDetail() {
		setSuperAdminImpactManagementDetailPopUp(true);

		if (superAdminImpactManagementData) {
			setSuperAdminImpactManagementDetailData([
				{
					impactDetail: superAdminImpactManagementData,
				},
			]);
		}
	}

	const getData = (): SuperAdminImpactManagementProps[] => {
		try {
			const superAdminImpactData = localStorage.getItem(
				"superAdminImpactManagementData"
			);

			if (!superAdminImpactData || superAdminImpactData === "") {
				return [];
			}

			const parsedData = JSON.parse(superAdminImpactData);

			return Array.isArray(parsedData) ? parsedData : [];
		} catch {
			localStorage.removeItem("superAdminImpactManagementData");

			return [];
		}
	};

	const superAdminImpactData = getData();

	return (
		<>
			<section className="bg-black border border-[#404040] p-[20px] rounded-[12px] space-y-[24px]">
				<section className="flex justify-between items-center">
					<h1 className="text-lg lg:text-2xl font-semibold">
						Impact Management Panel
					</h1>
					<button
						onClick={() => setImpactPopUp(true)}
						className="cursor-pointer bg-primary text-sm lg:text-base p-[16px] rounded-[8px]">
						Add Impact +
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
				<div className="flex justify-between items-center">
					<h1 className="text-2xl font-semibold">Impact</h1>
					{superAdminImpactManagementData &&
						superAdminImpactManagementData.length > 0 && (
							<div className="flex p-[8px] rounded-[8px] gap-x-[16px]">
								<div
									onClick={() => showDetail()}
									className="cursor-pointer w-[34px] h-[34px] flex justify-center items-center border border-[#FF8800] p-[8px] rounded-[8px]">
									<PencilIcon width={18} height={18} color="#FF8800" />
								</div>
							</div>
						)}
				</div>
				{superAdminImpactData.length > 0 ? (
					<div className="border border-[#404040] p-[28px] rounded-[8px] overflow-x-auto">
						<table className="table-auto text-white text-base">
							<tbody>
								{superAdminImpactData.map(
									(data: SuperAdminImpactManagementProps, index) => (
										<tr key={index} className="align-top">
											<td className="text-neutral-500 py-2">{data.metric}</td>
											<td className="text-neutral-500 pl-5 pr-3 py-2">:</td>
											<td className="py-2 font-bold whitespace-nowrap">
												{data.metricValue.length > 4
													? data.metricValue[0] + "" + data.metricValue[1] + "K"
													: data.metricValue.length > 3
													? data.metricValue[0] + "K"
													: data.metricValue}
											</td>
										</tr>
									)
								)}
							</tbody>
						</table>
					</div>
				) : (
					<div className="h-full flex justify-center items-center">
						<h1 className="text-xl lg:text-3xl font-black">NO DATA</h1>
					</div>
				)}
			</section>

			<SuperAdminImpactManagementPopUp
				open={impactPopUp}
				close={() => setImpactPopUp(false)}
				save={handleSubmitImpact}
			/>

			{superAdminImpactManagementDetailData && (
				<SuperAdminImpactManagementDetailPopUp
					open={superAdminImpactManagementDetailPopUp}
					close={() => setSuperAdminImpactManagementDetailPopUp(false)}
					save={handleUpdateImpact}
					data={superAdminImpactManagementDetailData}
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
