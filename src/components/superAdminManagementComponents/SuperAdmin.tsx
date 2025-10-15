"use client";
import { ChevronDown, PencilIcon, Search } from "lucide-react";
import { AdminCalendarIcon } from "../icons/adminCalendarIcon";
import { LeftChevronIcon } from "../icons/leftChevronIcon";
import { useState } from "react";
import SuperAdminPopUp from "../adminPopUpComponents/superAdminPopUp";

type SuperAdminProps = {
	organizationName: string;
	emailAdmin: string;
};

export default function SuperAdmin() {
	const [superAdminPopUp, setSuperAdminPopUp] = useState<boolean>(false);
	const [superAdminData, setSuperAdminData] = useState<SuperAdminProps[] | null>(
		null
	);

	function handleSuperAdmin(superAdminData: SuperAdminProps) {
		setSuperAdminData((prev) =>
			prev ? [...prev, superAdminData] : [superAdminData]
		);
	}

	return (
		<>
			<section className="bg-black border border-[#404040] p-[20px] rounded-[12px] space-y-[24px]">
				<section className="flex justify-between items-center">
					<h1 className="text-lg lg:text-2xl font-semibold">
						Admin Management Panel
					</h1>
					<button
						onClick={() => setSuperAdminPopUp(true)}
						className="cursor-pointer bg-primary text-sm lg:text-base p-[16px] rounded-[8px]">
						Add Admin +
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
				<h1 className="text-2xl font-semibold">Admin Database</h1>
				<table className="table-auto w-[1000px] xl:w-full text-white">
					<thead>
						<tr className="border-b border-[#D4D4D4] text-left">
							<th className="text-base lg:text-lg font-bold py-3 px-4">No</th>
							<th className="text-base lg:text-lg font-bold py-3 px-4">
								Organization Name
							</th>
							<th className="text-base lg:text-lg font-bold py-3 px-10">Email</th>
							<th className="text-base lg:text-lg font-bold py-3 px-0">
								Date Created
							</th>
							<th className="text-base lg:text-lg font-bold py-3 px-4">Actions</th>
						</tr>
					</thead>
					<tbody className="relative">
						{superAdminData && superAdminData.length > 0 ? (
							superAdminData.map((data, index) => (
								<tr key={index} className="border-b border-[#D4D4D4]">
									<td className="py-4 px-4 align-top text-sm font-medium">
										{index + 1}
									</td>
									<td className="py-4 px-4 align-top text-sm font-medium">
										{data.organizationName}
									</td>
									<td className="py-4 px-10 align-top">
										<p className="text-base font-medium leading-tight">
											{data.emailAdmin}
										</p>
									</td>
									<td className="py-4 px-0 align-top text-base font-normal whitespace-nowrap">
										24 November 2025
									</td>
									<td className="py-4 px-4 align-top">
										<div className="flex items-center gap-x-[16px]">
											<div className="cursor-pointer w-[34px] h-[34px] flex justify-center items-center border border-[#FF8800] p-[8px] rounded-[8px]">
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
				<section
					className={`absolute right-3 -bottom-20 ${
						superAdminData && superAdminData.length > 0 ? "flex" : "hidden"
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
				</section>
			</section>

			<SuperAdminPopUp
				open={superAdminPopUp}
				close={() => setSuperAdminPopUp(false)}
				save={handleSuperAdmin}
			/>
		</>
	);
}
