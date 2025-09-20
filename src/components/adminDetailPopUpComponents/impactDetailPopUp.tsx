"use client";
import { FormEvent, useState, useEffect } from "react";
import ExitIcon from "../icons/exitIcon";
import { InformationIcon } from "../icons/informationIcon";
import InputField from "../adminComponents/inputField";
import WarningPopUp from "../dialog/warningPopUp";
import ToolTip from "../tooltip";

type ImpactProps = {
	displayed?: boolean;
	metric: string;
	metricValue: string;
};

type ImpactDetailProps = {
	impactDetail: ImpactProps[];
};

type ImpactPopUpProps = {
	open: boolean;
	close: () => void;
	save: (impactData: ImpactProps[]) => void;
	data: ImpactDetailProps[];
};

type WarningPopUpProps = {
	title: string;
	message: string;
};

export default function ImpactDetailPopUp({
	open,
	close,
	save,
	data,
}: ImpactPopUpProps) {
	const [editData, setEditData] = useState<ImpactProps[]>([]);
	const [submited, setSubmited] = useState<string>("submit");
	const [editState, setEditState] = useState<{ [key: string]: boolean }>({});

	const [warningPopUp, setWarningPopUp] = useState<boolean>(false);
	const [warningPopUpComponent, setWarningPopUpComponent] =
		useState<WarningPopUpProps | null>(null);

	const tooltipData = [
		["Data", "Min", "Max"],
		[["Displayed Impact", "3 impacts", "5 impacts"]],
	];

	useEffect(() => {
		if (open && data && data.length > 0) {
			setEditData([...data[0].impactDetail]);

			const dataFormat: { [key: string]: boolean } = {};

			data[0].impactDetail.forEach((_, index) => {
				dataFormat[`metric_${index}`] = true;
				dataFormat[`metricValue_${index}`] = true;
			});

			setEditState(dataFormat);
		}
	}, [open, data]);

	function resetState() {
		setSubmited("submit");
		setEditData([]);
		setEditState({});
	}

	function handleInputChange(
		index: number,
		field: "metric" | "metricValue",
		value: string
	) {
		if (value == "") {
			setWarningPopUpComponent({
				title: "Warning!",
				message: "Metric and metric value must be filled",
			});

			setWarningPopUp(true);
			return;
		}

		setEditData((prev) => {
			const newData = [...prev];

			newData[index] = {
				...newData[index],
				[field]: value,
			};

			return newData;
		});
	}

	function handleEditDataChange(
		index: number,
		field: "metric" | "metricValue",
		editState: boolean
	) {
		setEditState((prev) => ({
			...prev,
			// [`${field}${index}`]: editState,
			[`${field}_${index}`]: editState,
		}));
	}

	function handleCheck(index: number, checked: boolean) {
		setEditData((prev) => {
			const newData = [...prev];

			newData[index] = {
				...newData[index],
				displayed: checked,
			};

			return newData;
		});
	}

	function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		save(editData);
		setSubmited("save");

		resetState();
		close();
	}

	if (!open) return null;

	return (
		<>
			<section className="overflow-y-auto absolute top-0 left-0 w-full h-full grid grid-cols-12 items-center bg-white/20 backdrop-blur-[4px] py-10">
				<div className="col-start-4 col-end-10 rounded-t-[6px]">
					<div className="flex justify-between items-center border-b border-neutral-300 bg-black px-[24px] py-[10px] rounded-t-[6px]">
						<h1 className="text-2xl font-semibold">Impact</h1>
						<button
							onClick={() => {
								resetState();
								close();
							}}
							className="cursor-pointer border border-white rounded-[4px] p-2">
							<ExitIcon size={13} />
						</button>
					</div>
					<div className="bg-neutral-900 flex flex-col items-end px-[36px] py-[24px] space-y-[32px]">
						<div className="relative cursor-pointer">
							<InformationIcon width={20} height={20} color="white" />
							<ToolTip tooltipData={tooltipData} />
						</div>
						<form
							onSubmit={handleSubmit}
							className="w-full flex flex-col items-end gap-y-[32px]">
							<ul className="w-full border border-neutral-700 px-[20px] py-[24px] rounded-[8px] space-y-[40px]">
								<table className="w-full">
									<thead>
										<tr>
											<th className="px-4 text-left">Displayed?</th>
											<th className="px-4 text-center">Impact Category</th>
											<th className="px-4 text-center">Value</th>
										</tr>
									</thead>
									<tbody className="space-y-4">
										{editData.map((impactCategory, index) => (
											<tr key={index}>
												<td className="px-10 py-3">
													<input
														onChange={(e) => handleCheck(index, e.target.checked)}
														checked={impactCategory.displayed || false}
														className="cursor-pointer w-[40px] h-[40px] appearance-none border-2 border-white bg-transparent rounded-md checked:bg-transparent checked:border-white relative before:content-[''] before:absolute before:top-4 before:left-1/2 before:transform before:-translate-x-1/2 before:-translate-y-1/2 before:w-4 before:h-2 before:border-l-2 before:border-b-2 before:border-white before:rotate-[-45deg] before:opacity-0 checked:before:opacity-100"
														type="checkbox"
													/>
												</td>
												<td className="px-4 py-3 rounded-[4px]">
													<InputField
														inputPlaceholder="Enter the metric"
														setData={(value) => handleInputChange(index, "metric", value)}
														setEditData={(editState) =>
															handleEditDataChange(index, "metric", editState)
														}
														editData={editState[`metric_${index}`] || false}
														submited={submited}
														data={impactCategory.metric}
													/>
												</td>
												<td className="px-4 py-3">
													<input
														type="text"
														placeholder="Value of The Content"
														className="w-full bg-transparent border border-neutral-700 px-[12px] py-[8px] rounded-[4px] outline-none text-white"
														value={impactCategory.metricValue}
														onChange={(e) =>
															handleInputChange(index, "metricValue", e.target.value)
														}
													/>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</ul>
							<div className="flex gap-x-[20px]">
								<button
									type="submit"
									className={`cursor-pointer w-[150px] h-[50px] border border-white text-white px-[24px] py-[14px] rounded-full`}>
									Save
								</button>
							</div>
						</form>
					</div>
				</div>
			</section>

			{warningPopUpComponent && (
				<WarningPopUp
					open={warningPopUp}
					close={() => setWarningPopUp(false)}
					onConfirm={() => setWarningPopUp(false)}
					title={warningPopUpComponent.title}
					message={warningPopUpComponent.message}
				/>
			)}
		</>
	);
}
