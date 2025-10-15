"use client";
import { useEffect, useState } from "react";
import ImpactPopUp from "../adminPopUpComponents/impactPopUp";
import SuccessPopUp from "../dialog/sucessPopUp";
import { PencilIcon } from "lucide-react";
import ImpactDetailPopUp from "../adminDetailPopUpComponents/impactDetailPopUp";
import SuperAdminImpactManagement from "../superAdminManagementComponents/SuperAdminImpactManagement";

type ImpactProps = {
	displayed?: boolean;
	metric: string;
	metricValue: string;
};

type ImpactDetailProps = {
	impactDetail: ImpactProps[];
};

type SuccessPopUpProps = {
	title: string;
	message: string;
};

export default function ImpactManagement() {
	const [impactPopUp, setImpactPopUp] = useState<boolean>(false);
	const [impactDetailPopUp, setImpactDetailPopUp] = useState<boolean>(false);
	const [impactDetailData, setImpactDetailData] = useState<
		ImpactDetailProps[] | null
	>(null);
	const [impactData, setImpactData] = useState<ImpactProps[] | null>(() => {
		try {
			const getData = localStorage.getItem("impactData");

			if (getData == null || getData == "") {
				return null;
			}

			const parsedData = JSON.parse(getData);

			return parsedData.length > 0 ? parsedData : null;
		} catch {
			localStorage.removeItem("impactData");
		}
	});

	const [successPopUp, setSuccessPopUp] = useState<boolean>(false);
	const [successPopUpComponent, setSuccessPopUpComponent] =
		useState<SuccessPopUpProps | null>(null);

	useEffect(() => {
		if (impactData == null) {
			localStorage.removeItem("impactData");
		} else {
			localStorage.setItem("impactData", JSON.stringify(impactData));
		}
	});

	function handleSubmitImpact(impactData: ImpactProps) {
		setSuccessPopUpComponent({
			title: " Metric Added!",
			message: "You’ve successfully added a new metric to the panel",
		});
		setSuccessPopUp(true);

		setImpactData((prev) => (prev ? [...prev, impactData] : [impactData]));
	}

	function handleUpdateImpact(updatedDataArray: ImpactProps[]) {
		setImpactData(updatedDataArray);

		setSuccessPopUpComponent({
			title: "Impact Updated!",
			message: "The impact metrics have been successfully updated",
		});
		setSuccessPopUp(true);
	}

	function showDetail() {
		setImpactDetailPopUp(true);

		if (impactData) {
			setImpactDetailData([
				{
					impactDetail: impactData,
				},
			]);
		}
	}

	const userRole = localStorage.getItem("userRole");

	return (
		<>
			{userRole == "admin" ? (
				<>
					<section className="flex justify-between items-center bg-black border border-[#404040] p-[20px] rounded-[12px]">
						<h1 className="text-lg md:text-2xl font-semibold">
							Impact Management Panel
						</h1>
						<button
							onClick={() => setImpactPopUp(true)}
							className="cursor-pointer bg-primary text-sm md:text-base p-[16px] rounded-[8px]">
							Add Impact +
						</button>
					</section>
					{impactData && impactData.length > 0 ? (
						<section className="flex flex-col bg-black border border-[#404040] p-[28px] rounded-[20px] space-y-[20px]">
							<div className="flex justify-between items-center">
								<h1 className="text-xl font-semibold italic text-neutral-400">
									The effect created by your organization!
								</h1>
								<div className="flex p-[8px] rounded-[8px] gap-x-[16px]">
									<div
										onClick={() => showDetail()}
										className="cursor-pointer w-[34px] h-[34px] flex justify-center items-center border border-[#FF8800] p-[8px] rounded-[8px]">
										<PencilIcon width={18} height={18} color="#FF8800" />
									</div>
								</div>
							</div>
							<div className="border border-[#404040] p-[28px] rounded-[8px] overflow-x-auto">
								<table className="table-auto text-white text-base">
									<tbody>
										{impactData.map((data, index) => (
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
										))}
									</tbody>
								</table>
							</div>
						</section>
					) : (
						<section className="h-full flex justify-center items-center bg-black border border-[#404040] rounded-[20px]">
							<h1 className="text-3xl font-black">NO DATA</h1>
						</section>
					)}
				</>
			) : (
				<SuperAdminImpactManagement />
			)}

			<ImpactPopUp
				open={impactPopUp}
				close={() => setImpactPopUp(false)}
				save={handleSubmitImpact}
			/>

			{impactDetailData && (
				<ImpactDetailPopUp
					open={impactDetailPopUp}
					close={() => setImpactDetailPopUp(false)}
					save={handleUpdateImpact}
					data={impactDetailData}
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
