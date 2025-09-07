"use client";
import { FormEvent, useState } from "react";
import InputField from "../adminComponents/inputField";
import ExitIcon from "../icons/exitIcon";
import { InformationIcon } from "../icons/informationIcon";
import DangerPopUp from "../dialog/dangerPopUp";
import DeleteAndSaveButtonForAdd from "../adminComponents/deleteAndSaveButton";
import { Backdrop } from "../backdrop";
import ToolTip from "../tooltip";

type ImpactProps = {
	displayed?: boolean;
	metric: string;
	metricValue: string;
};

type ImpactPopUpProps = {
	open: boolean;
	close: () => void;
	save: (impactData: ImpactProps) => void;
};

export default function ImpactPopUp({ open, close, save }: ImpactPopUpProps) {
	const [metric, setMetric] = useState<string>("");
	const [metricValue, setMetricValue] = useState<string>("");
	const formComplete = metric && metricValue;
	const [submited, setSubmited] = useState<string | null>(null);
	const [editMetric, setEditMetric] = useState<boolean>(false);
	const [editMetricValue, setEditMetricValue] = useState<boolean>(false);

	const [dangerPopUp, setDangerPopUp] = useState<boolean>(false);

	const tooltipData = [
		["Data", "Min", "Max"],
		[["Displayed Impact", "3 impacts", "5 impacts"]],
	];

	function resetForm() {
		setMetric("");
		setMetricValue("");
		setSubmited(null);
		setEditMetric(false);
		setEditMetricValue(false);
	}

	function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		if (submited == null) {
			setSubmited("submit");
			setEditMetric(true);
			setEditMetricValue(true);
		} else if (submited == "submit") {
			const impactData: ImpactProps = {
				displayed: false,
				metric,
				metricValue,
			};

			save(impactData);
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
			<div className="col-start-4 col-end-10 rounded-t-[6px]">
				<div className="relative">
					<div className="flex justify-between items-center border-b border-neutral-300 bg-black px-[24px] py-[10px] rounded-t-[6px]">
						<h1 className="text-2xl font-semibold">Add Impact</h1>
						<div
							onClick={() => (metric || metricValue ? setDangerPopUp(true) : close())}
							className="cursor-pointer border border-white rounded-[4px] p-2">
							<ExitIcon size={13} />
						</div>
					</div>
					<div className="bg-neutral-900 flex flex-col items-end px-[36px] py-[24px] space-y-[32px]">
						<div className="cursor-pointer group">
							<Backdrop className="z-1 bg-white/10 group-hover:opacity-95 duration-300" />
							<div className="relative z-2">
								<InformationIcon width={20} height={20} color="white" />
								<ToolTip
									tooltipData={tooltipData}
									className="group-hover:opacity-100 duration-300 pointer-events-none"
								/>
							</div>
						</div>
						<form
							onSubmit={handleSubmit}
							className="w-full flex flex-col items-end gap-y-[32px]">
							<ul className="w-full border border-neutral-700 px-[20px] py-[24px] rounded-[8px] space-y-[40px]">
								<li className="grid grid-cols-12 gap-[20px] md:gap-[40px]">
									<div className="col-span-12 flex flex-col gap-y-[6px]">
										<InputField
											inputLabel="Select Impact Metric"
											inputPlaceholder="Enter the impact metric"
											setData={setMetric}
											setEditData={setEditMetric}
											editData={editMetric}
											submited={`${submited}`}
										/>
									</div>
								</li>
								<li className="grid grid-cols-12 gap-[20px] md:gap-[40px]">
									<div className="col-span-12 flex flex-col gap-y-[6px]">
										<InputField
											inputLabel="Enter Metric Value"
											inputPlaceholder="e.g. 250, 1,000, etc"
											setData={setMetricValue}
											setEditData={setEditMetricValue}
											editData={editMetricValue}
											submited={`${submited}`}
											numberOnly={true}
										/>
									</div>
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
