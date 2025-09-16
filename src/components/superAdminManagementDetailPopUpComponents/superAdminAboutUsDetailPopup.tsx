"use client";
import { FormEvent, useEffect, useRef, useState } from "react";
import { DeleteAndSaveButtonForEdit } from "../adminComponents/deleteAndSaveButton";
import ImageInputField from "../adminComponents/imageInputField";
import DangerPopUp from "../dialog/dangerPopUp";
import WarningPopUp from "../dialog/warningPopUp";
import { PencilIcon } from "../icons/pencilIcon";
import { SuperAdminAboutUsManagementProps } from "../superAdminManagementComponents/SuperAdminAboutUsManagement";
import ExitIcon from "../icons/exitIcon";
import { InformationIcon } from "../icons/informationIcon";
import InputField from "../adminComponents/inputField";
import { Sketch } from "@uiw/react-color";
import TextAreaField from "../adminComponents/textAreaField";
import { Backdrop } from "../backdrop";
import ToolTip from "../tooltip";
import OrganizationDropdown from "../organizationDropdown";
import StatusChange from "../statusChange";

type AboutUsDetailPopUpProps = {
	open: boolean;
	close: () => void;
	save: (
		superAdminEventManagementData: SuperAdminAboutUsManagementProps,
		index: number
	) => void;
	delete: (index: number) => void;
	data: SuperAdminAboutUsManagementProps[];
	index: number;
};

export default function SuperAdminAboutUsDetailPopup({
	open,
	close,
	save,
	delete: deleteData,
	data,
	index,
}: AboutUsDetailPopUpProps) {
	const [title, setTitle] = useState<string>("");
	const [color, setColor] = useState<string>("#ffffff");
	const [colorPicker, setColorPicker] = useState<boolean>(false);
	const colorPickerRef = useRef<HTMLDivElement>(null);
	const [description, setDescription] = useState<string>("");
	const [instagram, setInstagram] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [linkedin, setLinkedin] = useState<string>("");
	const [preview, setPreview] = useState<string>("");
	const [status, setStatus] = useState<"waiting" | "approved" | "rejected">(
		data[0]?.status
	);
	const [organization, setOrganization] = useState<string>("");
	const [slogan, setSlogan] = useState<string>("");

	const formComplete =
		organization &&
		title &&
		color &&
		description &&
		instagram &&
		email &&
		linkedin &&
		preview &&
		status &&
		slogan;
	const [editOrganization, setEditOrganization] = useState<boolean>(true);
	const [editSlogan, setEditSlogan] = useState<boolean>(true);
	const [submited, setSubmited] = useState<string | null>(null);
	const [editTitle, setEditTitle] = useState<boolean>(true);
	const [editColor, setEditColor] = useState<boolean>(true);
	const [editDescription, setEditDescription] = useState<boolean>(true);
	const [editInstagram, setEditInstagram] = useState<boolean>(true);
	const [editEmail, setEditEmail] = useState<boolean>(true);
	const [editLinkedin, setEditLinkedin] = useState<boolean>(true);
	const [editImage, setEditImage] = useState<boolean>(true);
	const [hex, setHex] = useState<string>("#ffffff");

	const [warningPopUp, setWarningPopUp] = useState<boolean>(false);
	const [warningPopUpDescription, setWarningPopUpDescription] =
		useState<string>("");

	const [dangerPopUp, setDangerPopUp] = useState<boolean>(false);

	const tooltipData = [
		["Data", "Min", "Max"],
		[
			["Slogan", "1 Word", "1 Word"],
			["Organization Description", "-", "150 Character"],
			["Logo", "1 Image", "1 Image"],
			["Instagram", "1 Account", "1 Account"],
			["Email", "1 Account", "1 Account"],
			["Linkedin", "1 Account", "1 Account"],
		],
	];

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				colorPickerRef.current &&
				!colorPickerRef.current.contains(event.target as Node)
			) {
				setColorPicker(false);
			}
		}

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	useEffect(() => {
		setColor(hex);
	}, [hex]);

	useEffect(() => {
		if (data && data.length > 0) {
			setOrganization(data[0]?.organization);
			setTitle(data[0]?.title);
			setColor(data[0]?.color);
			setHex(data[0]?.color);
			setDescription(data[0]?.description);
			setInstagram(data[0]?.instagram);
			setEmail(data[0]?.email);
			setLinkedin(data[0]?.linkedin);
			setPreview(data[0]?.image);
			setStatus(data[0]?.status);
			setSlogan(data[0]?.slogan);
		}
	}, [data, open]);

	function resetState() {
		setEditTitle(true);
		setEditColor(true);
		setEditDescription(true);
		setEditInstagram(true);
		setEditEmail(true);
		setEditLinkedin(true);
		setEditImage(true);
		setEditSlogan(true);
		setEditOrganization(true);
		setSubmited(null);
	}

	function handleColorChange(newHex: string) {
		setHex(newHex);
		setColor(newHex);
	}

	function handleImage(file: File[]) {
		const image = file[0];

		setPreview(URL.createObjectURL(image));
	}

	function validateUrl(url: string) {
		const pattern = new RegExp(
			"^(https?:\\/\\/)?" +
				"((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
				"((\\d{1,3}\\.){3}\\d{1,3}))" +
				"(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
				"(\\?[;&a-z\\d%_.~+=-]*)?" +
				"(\\#[-a-z\\d_]*)?$",
			"i"
		);
		return !!pattern.test(url);
	}

	function validateEmail(email: string) {
		return String(email).match(
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		);
	}

	function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		const editAboutUsData: SuperAdminAboutUsManagementProps = {
			organization,
			title,
			color,
			slogan,
			description,
			instagram,
			email,
			linkedin,
			image: preview,
			date: data[0]?.date,
			status,
		};

		if (!validateUrl(instagram)) {
			setWarningPopUp(true);
			setWarningPopUpDescription("Invalid Instagram URL");
		} else if (!validateEmail(email)) {
			setWarningPopUp(true);
			setWarningPopUpDescription("Invalid Email Format");
		} else if (!validateUrl(linkedin)) {
			setWarningPopUp(true);
			setWarningPopUpDescription("Invalid Linkedin URL");
		} else {
			save(editAboutUsData, index);
			setSubmited("save");

			resetState();
			close();
		}
	}

	function handleDangerPopUp() {
		setDangerPopUp(true);
	}

	function handleDelete() {
		deleteData(index);
		resetState();
		close();
	}

	if (!open) return null;

	return (
		<section className="overflow-y-auto absolute top-0 left-0 w-full h-full grid grid-cols-12 items-center bg-white/20 backdrop-blur-[4px] py-10">
			<div className="col-span-12 xl:col-start-2 xl:col-end-12 2xl:col-start-3 2xl:col-end-11 rounded-t-[6px] px-2 sm:px-5 xl:px-16 2xl:px-20">
				<div className="relative">
					<div className="flex justify-between items-center border-b border-neutral-300 bg-black px-[24px] py-[10px] rounded-t-[6px]">
						<h1 className="text-sm sm:text-xl md:text-2xl font-semibold">About Us</h1>
						<button
							onClick={() => {
								resetState();
								close();
							}}
							className="cursor-pointer border border-white rounded-[4px] p-2">
							<ExitIcon size={13} />
						</button>
					</div>
					<div className="bg-neutral-900 px-5 sm:px-[36px] py-[24px] space-y-[20px] sm:space-y-[32px]">
						<div className="flex justify-end items-start">
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
						</div>
						<form
							onSubmit={handleSubmit}
							className="flex flex-col items-end gap-y-[32px]">
							<ul className="w-full border border-neutral-700 px-[20px] py-[24px] rounded-[8px] space-y-[40px]">
								<li className="gap-x-[40px]">
									<div className="relative w-full flex flex-col gap-y-[6px]">
										<OrganizationDropdown
											setEditData={setEditOrganization}
											editData={editOrganization}
											submited={null}
											organization={organization}
											setOrganization={setOrganization}
										/>
									</div>
								</li>
								<li className="grid grid-cols-12 gap-[20px] md:gap-[40px]">
									<div className="col-span-12 sm:col-span-8 md:col-span-9 flex flex-col gap-y-[6px]">
										<InputField
											inputLabel="Title"
											inputPlaceholder="Enter Title"
											setData={setTitle}
											setEditData={setEditTitle}
											editData={editTitle}
											submited={null}
											data={data[0]?.title}
										/>
									</div>
									<div className="col-span-12 sm:col-span-4 md:col-span-3 flex flex-col gap-y-[6px]">
										<label className="text-xs sm:text-base font-bold" htmlFor="">
											Color
										</label>
										<div className="flex items-center gap-x-[10px] relative">
											<div
												onClick={() => !editColor && setColorPicker(!colorPicker)}
												className={`w-[32px] h-[32px] border border-neutral-700 ${
													!editColor ? "cursor-pointer" : ""
												}`}
												style={{ backgroundColor: hex }}></div>
											<div className="text-xs sm:text-base flex-1 overflow-hidden">
												<input
													value={hex}
													onChange={(e) => !editColor && handleColorChange(e.target.value)}
													className={`w-full text-xs sm:text-base font-normal border ${
														editColor
															? "bg-neutral-800 border-transparent"
															: "bg-transparent border-neutral-500"
													} px-[12px] py-[8px] rounded-[4px] outline-none`}
													type="text"
													placeholder="Hex code"
													disabled={editColor}
												/>
											</div>
											{colorPicker && !editColor && (
												<div
													ref={colorPickerRef}
													className="absolute z-10 top-full right-0 mt-2">
													<Sketch
														color={hex}
														onChange={(color) => {
															handleColorChange(color.hex);
														}}
														disableAlpha={true}
														presetColors={[]}
													/>
												</div>
											)}
											{submited == null && (
												<div
													onClick={() => setEditColor(!editColor)}
													className="cursor-pointer absolute right-2 bottom-1 sm:bottom-2 flex items-center bg-neutral-700 gap-x-[10px] px-[8px] py-[5px] rounded-[8px]">
													<p className="text-xs text-neutral-400">Edit</p>
													<PencilIcon width={14} height={14} color="#A3A3A3" />
												</div>
											)}
										</div>
									</div>
								</li>
								<li className="w-full gap-x-[40px]">
									<InputField
										inputLabel="Slogan"
										editData={editSlogan}
										inputPlaceholder={data[0]?.slogan}
										setData={setSlogan}
										setEditData={setEditSlogan}
										submited={null}
										data={data[0]?.slogan}
									/>
								</li>
								<li className="w-full gap-x-[40px]">
									<div className="relative flex flex-col gap-y-[6px]">
										<TextAreaField
											textAreaLabel="Organization Description"
											textAreaPlaceholder="Enter The Organization Description"
											setData={setDescription}
											setEditData={setEditDescription}
											editData={editDescription}
											submited={null}
											data={data[0]?.description}
										/>
									</div>
								</li>
								<li className="grid grid-cols-12 gap-[20px]">
									<div className="relative col-span-12 lg:col-span-4 flex flex-col gap-y-[6px]">
										<label className="text-xs sm:text-base font-bold" htmlFor="">
											Instagram
										</label>
										<input
											onChange={(e) => setInstagram(e.target.value)}
											defaultValue={data[0]?.instagram}
											className={`text-xs sm:text-base font-normal border ${
												editInstagram
													? "bg-neutral-800 border-transparent"
													: "bg-transparent border-neutral-500"
											} px-[12px] py-[8px] rounded-[4px] outline-none`}
											type="text"
											placeholder="Instagram"
											disabled={editInstagram}
										/>
										{submited == null && (
											<div
												onClick={() => setEditInstagram(!editInstagram)}
												className="cursor-pointer absolute right-2 bottom-1 sm:bottom-2 flex items-center bg-neutral-700 gap-x-[10px] px-[8px] py-[5px] rounded-[8px]">
												<p className="text-xs text-neutral-400">Edit</p>
												<PencilIcon width={14} height={14} color="#A3A3A3" />
											</div>
										)}
									</div>
									<div className="relative col-span-12 lg:col-span-4 flex flex-col gap-y-[6px]">
										<label className="text-xs sm:text-base font-bold" htmlFor="">
											Email
										</label>
										<input
											onChange={(e) => setEmail(e.target.value)}
											defaultValue={data[0]?.email}
											className={`text-xs sm:text-base font-normal border ${
												editEmail
													? "bg-neutral-800 border-transparent"
													: "bg-transparent border-neutral-500"
											} px-[12px] py-[8px] rounded-[4px] outline-none`}
											type="text"
											placeholder="Email"
											disabled={editEmail}
										/>
										{submited == null && (
											<div
												onClick={() => setEditEmail(!editEmail)}
												className="cursor-pointer absolute right-2 bottom-1 sm:bottom-2 flex items-center bg-neutral-700 gap-x-[10px] px-[8px] py-[5px] rounded-[8px]">
												<p className="text-xs text-neutral-400">Edit</p>
												<PencilIcon width={14} height={14} color="#A3A3A3" />
											</div>
										)}
									</div>
									<div className="relative col-span-12 lg:col-span-4 flex flex-col gap-y-[6px]">
										<label className="text-xs sm:text-base font-bold" htmlFor="">
											Linkedin
										</label>
										<input
											onChange={(e) => setLinkedin(e.target.value)}
											defaultValue={data[0]?.linkedin}
											className={`text-xs sm:text-base font-normal border ${
												editLinkedin
													? "bg-neutral-800 border-transparent"
													: "bg-transparent border-neutral-500"
											} px-[12px] py-[8px] rounded-[4px] outline-none`}
											type="text"
											placeholder="Linkedin"
											disabled={editLinkedin}
										/>
										{submited == null && (
											<div
												onClick={() => setEditLinkedin(!editLinkedin)}
												className="cursor-pointer absolute right-2 bottom-1 sm:bottom-2 flex items-center bg-neutral-700 gap-x-[10px] px-[8px] py-[5px] rounded-[8px]">
												<p className="text-xs text-neutral-400">Edit</p>
												<PencilIcon width={14} height={14} color="#A3A3A3" />
											</div>
										)}
									</div>
								</li>
								<li className="grid grid-cols-12 gap-[20px]">
									<ImageInputField
										setPreview={setPreview}
										preview={preview}
										handleImage={handleImage}
										setEditImage={setEditImage}
										editImage={editImage}
										submited={submited}
									/>
								</li>
							</ul>
							<div className="flex flex-row items-center gap-3 w-full">
								<p className="text-white text-xl font-bold">Status: </p>
								<StatusChange status={status} onClick={setStatus} />
							</div>
							<DeleteAndSaveButtonForEdit
								submited={submited}
								formComplete={formComplete}
								handleDangerPopUp={handleDangerPopUp}
								saveLabel="Save"
							/>
						</form>
					</div>
				</div>
			</div>

			<WarningPopUp
				open={warningPopUp}
				close={() => setWarningPopUp(false)}
				onConfirm={() => setWarningPopUp(false)}
				title="Warning!"
				message={warningPopUpDescription}
			/>

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
