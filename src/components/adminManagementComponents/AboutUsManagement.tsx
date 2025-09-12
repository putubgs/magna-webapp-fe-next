"use client";
import { useEffect, useState } from "react";
import { ApprovedIcon } from "../icons/approvedIcon";
import { EyeIcon } from "../icons/eyeIcon";
import InstaIcon from "../icons/instaIcon";
import LinkedinIcon from "../icons/linkedinIcon";
import MailIcon from "../icons/mailIcon";
import AddAboutUsPopUp from "../adminPopUpComponents/aboutUsPopUp";
import AboutUsDetailPopUp from "../adminDetailPopUpComponents/aboutUsDetailPopUp";
import SuccessPopUp from "../dialog/sucessPopUp";
import Image from "next/image";

type AboutUsDataProps = {
	title: string;
	color: string;
	description: string;
	instagram: string;
	email: string;
	linkedin: string;
	image: string;
};

type SuccessPopUpProps = {
	title: string;
	message: string;
};

export default function AboutUsManagement() {
	const [addAboutUsPopUp, setAddAboutUsPopUp] = useState<boolean>(false);
	const [aboutUsDetailPopUp, setAboutUsDetailPopUp] =
		useState<boolean>(false);
	const [index, setIndex] = useState<number>(-1);
	const [aboutUsDetailData, setAboutUsDetailData] = useState<
		AboutUsDataProps[] | null
	>(null);
	const [aboutUsData, setAboutUsData] = useState<AboutUsDataProps[] | null>(
		null
	);

	useEffect(() => {
		try {
			const getData = localStorage.getItem("aboutUsData");

			if (!getData || getData == null || getData == "") {
				setAboutUsData(null);
				return;
			}

			const parsedData = JSON.parse(getData);

			setAboutUsData(parsedData.length > 0 ? parsedData : null);
		} catch {
			localStorage.removeItem("aboutUsData");
			setAboutUsData(null);
		}
	}, []);

	const [successPopUp, setSuccessPopUp] = useState<boolean>(false);
	const [successPopUpComponent, setSuccessPopUpComponent] =
		useState<SuccessPopUpProps | null>(null);

	useEffect(() => {
		if (aboutUsData == null) {
			localStorage.removeItem("aboutUsData");
		} else {
			localStorage.setItem("aboutUsData", JSON.stringify(aboutUsData));
		}
	}, [aboutUsData]);

	function handleSubmitAboutUs(aboutUsData: AboutUsDataProps) {
		setSuccessPopUpComponent({
			title: "Business Unit Page Added!",
			message:
				"You've successfully added a new business unit page to the panel",
		});
		setSuccessPopUp(true);

		setAboutUsData((prev) =>
			prev ? [...prev, aboutUsData] : [aboutUsData]
		);
	}

	function handleUpdateAboutUs(updatedData: AboutUsDataProps, index: number) {
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
				currentData.image !== updatedData.image;

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
					title: aboutUsData[index].title,
					color: aboutUsData[index].color,
					description: aboutUsData[index].description,
					instagram: aboutUsData[index].instagram,
					email: aboutUsData[index].email,
					linkedin: aboutUsData[index].linkedin,
					image: aboutUsData[index].image,
				},
			]);
		}
	}

	const [userRole, setUserRole] = useState<string | null>(null);

	useEffect(() => {
		setUserRole(localStorage.getItem("userRole"));
	}, []);

	return (
		<>
			{userRole == "admin" && (
				<>
					<section className="flex justify-between items-center bg-black border border-[#404040] p-[20px] rounded-[12px]">
						<h1 className="text-lg lg:text-2xl font-semibold">
							About Us Management Panel
						</h1>
						<button
							onClick={() => {
								setAddAboutUsPopUp(true);
							}}
							className="cursor-pointer bg-primary text-sm lg:text-base p-[16px] rounded-[8px]"
						>
							Add About Us +
						</button>
					</section>
					{aboutUsData && aboutUsData.length > 0 ? (
						aboutUsData.map((data, index) => (
							<section
								key={index}
								className="h-fit flex flex-col bg-black border border-[#404040] p-[28px] rounded-[20px] space-y-[20px]"
							>
								<div className="flex justify-between items-center">
									<div className="flex items-center border-[2px] border-lime-900 gap-x-[8px] px-[16px] py-[10px] rounded-full">
										<ApprovedIcon
											width={16}
											height={16}
											color="#84CC16"
										/>
										<p className="text-xs font-bold text-[#84CC16]">
											Approved
										</p>
									</div>
									<div
										onClick={() => showDetail(index)}
										className="cursor-pointer border border-violet-700 p-[8px] rounded-[8px]"
									>
										<EyeIcon
											width={24}
											height={24}
											color="#6D28D9"
										/>
									</div>
								</div>
								<div className="border border-[#404040] p-[28px] rounded-[8px] space-y-[60px]">
									<div className="space-y-[30px]">
										<Image
											className="w-[56px]"
											src={data.image}
											alt=""
											width={200}
											height={200}
										/>
										<div>
											<h3 className="text-xs font-medium text-neutral-500">
												Title
											</h3>
											<p className="text-sm font-bold">
												{data.title}
											</p>
										</div>
										<div>
											<h3 className="text-xs font-medium text-neutral-500">
												Description
											</h3>
											<p className="text-sm font-normal">
												{data.description}
											</p>
										</div>
									</div>
									<div className="flex gap-y-6 md:gap-x-[60px] gap-x-[25px]">
										<a
											className="flex md:space-x-3 space-x-0 items-center"
											href="https://www.instagram.com/magna.partners/"
											target="_blank"
											rel="noopener noreferrer"
										>
											<div className="md:flex hidden items-center justify-center rounded-full border border-white/20 w-[50px] h-[50px]">
												<InstaIcon
													size={25}
													color="white"
												/>
											</div>
											<div
												className="flex md:hidden items-center justify-center rounded-full border border-white w-[50px] h-[50px]"
												aria-label="Magna Partners Instagram"
											>
												<InstaIcon
													size={25}
													color="white"
												/>
											</div>
											<div className="md:flex hidden">
												{data.instagram}
											</div>
										</a>
										<a
											className="flex md:space-x-3 space-x-0 items-center"
											href="mailto:magnainitiatives.id@gmail.com"
										>
											<div className="md:flex hidden items-center justify-center rounded-full border border-white/20 w-[50px] h-[50px]">
												<MailIcon
													size={25}
													color="white"
												/>
											</div>
											<div
												className="flex md:hidden items-center justify-center rounded-full border border-white w-[50px] h-[50px]"
												aria-label="Magna Partners Email"
											>
												<MailIcon
													size={25}
													color="white"
												/>
											</div>
											<div className="md:flex hidden">
												{data.email}
											</div>
										</a>
										<a
											className="flex md:space-x-3 space-x-0 items-center"
											href="https://www.linkedin.com/company/magna-id/"
											target="_blank"
											rel="noopener noreferrer"
										>
											<div className="md:flex hidden items-center justify-center rounded-full border border-white/20 w-[50px] h-[50px]">
												<LinkedinIcon
													size={25}
													color="white"
												/>
											</div>
											<div
												className="flex md:hidden items-center justify-center rounded-full border border-white w-[50px] h-[50px]"
												aria-label="Magna Partners LinkedIn"
											>
												<LinkedinIcon
													size={25}
													color="white"
												/>
											</div>
											<div className="md:flex hidden">
												{data.linkedin}
											</div>
										</a>
									</div>
								</div>
							</section>
						))
					) : (
						<section className="h-full flex justify-center items-center bg-black border border-[#404040] rounded-[20px]">
							<h1 className="text-xl lg:text-3xl font-black">
								NO DATA
							</h1>
						</section>
					)}
				</>
			)}

			<AddAboutUsPopUp
				open={addAboutUsPopUp}
				close={() => setAddAboutUsPopUp(false)}
				save={handleSubmitAboutUs}
			/>

			{aboutUsDetailData && (
				<AboutUsDetailPopUp
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
