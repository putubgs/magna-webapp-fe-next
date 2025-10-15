"use client";
import { FormEvent, useState } from "react";
import ExitIcon from "../icons/exitIcon";
import { InformationIcon } from "../icons/informationIcon";
import DangerPopUp from "../dialog/dangerPopUp";
import InputField from "../adminComponents/inputField";
import { ChevronDown } from "lucide-react";

type SuperAdminProps = {
	organizationName: string;
	emailAdmin: string;
};

type SuperAdminPopUpProps = {
	open: boolean;
	close: () => void;
	save: (superAdminData: SuperAdminProps) => void;
};

export default function SuperAdminPopUp({
	open,
	close,
	save,
}: SuperAdminPopUpProps) {
	const [organizationName, setOrganization] = useState<string>("");
	const [emailAdmin, setEmailAdmin] = useState<string>("");
	const formComplete = organizationName && emailAdmin;
	const [submited, setSubmited] = useState<string | null>(null);
	// const [editOrganization, setEditOrganization] = useState<boolean>(false);
	const [editEmailAdmin, setEditEmailAdmin] = useState<boolean>(false);

	const [dangerPopUp, setDangerPopUp] = useState<boolean>(false);

	function resetForm() {
		setOrganization("");
		setEmailAdmin("");
		setSubmited(null);
		// setEditOrganization(false);
		setEditEmailAdmin(false);
	}

	function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		if (submited == null) {
			setSubmited("submit");
			// setEditOrganization(true);
			setEditEmailAdmin(true);
		} else if (submited == "submit") {
			const superAdminData: SuperAdminProps = {
				organizationName,
				emailAdmin,
			};

			save(superAdminData);
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
			<div className="col-span-12 xl:col-start-2 xl:col-end-12 2xl:col-start-4 2xl:col-end-10 rounded-t-[6px] px-2 sm:px-5 xl:px-28">
				<div className="flex justify-between items-center border-b border-neutral-300 bg-black px-[24px] py-[10px] rounded-t-[6px]">
					<h1 className="text-xs sm:text-xl md:text-2xl font-semibold">
						Manage Admin
					</h1>
					<div
						onClick={() =>
							organizationName && emailAdmin ? setDangerPopUp(true) : close()
						}
						className="cursor-pointer border border-white rounded-[4px] p-2">
						<ExitIcon size={13} />
					</div>
				</div>
				<div className="bg-neutral-900 flex flex-col items-end px-5 sm:px-[36px] py-[24px] space-y-[20px] sm:space-y-[32px]">
					<InformationIcon width={20} height={20} color="white" />
					<form
						onSubmit={handleSubmit}
						className="w-full flex flex-col items-end gap-y-[32px]">
						<ul className="w-full border border-neutral-700 px-[20px] py-[24px] rounded-[8px] space-y-[20px] sm:space-y-[20px]">
							<li className="w-full flex flex-col sm:flex-row gap-[20px] sm:gap-[40px]">
								<ul className="cursor-pointer flex items-center border border-white gap-[10px] rounded-[8px] py-[8px] px-[10px]">
									<p>Select Organization</p>
									<ChevronDown />
								</ul>
							</li>
							<li className="gap-x-[40px]">
								<div className="relative w-full flex flex-col gap-y-[6px]">
									<InputField
										inputLabel="Email Admin"
										inputPlaceholder="Email Admin"
										setData={setEmailAdmin}
										setEditData={setEditEmailAdmin}
										editData={editEmailAdmin}
										submited={`${submited}`}
									/>
								</div>
							</li>
						</ul>
						<div className="flex gap-x-[20px]">
							<div
								onClick={() => submited == "submit" && setDangerPopUp(!dangerPopUp)}
								className={`w-[80px] sm:w-[150px] h-[40px] sm:h-[50px] flex justify-center items-center text-xs sm:text-base text-rose-800 ${
									submited == "submit" && "cursor-pointer border border-rose-800"
								} px-[24px] py-[14px] rounded-full`}>
								{submited == "submit" && "Delete"}
							</div>
							<button
								type={`${formComplete ? "submit" : "button"}`}
								className={`w-[100px] sm:w-[150px] h-[40px] sm:h-[50px] flex justify-center items-center text-xs sm:text-base ${
									formComplete
										? "cursor-pointer border border-white text-white"
										: "cursor-not-allowed border border-gray-700 text-gray-700"
								} px-[24px] py-[14px] rounded-full`}>
								Save
							</button>
						</div>
					</form>
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
