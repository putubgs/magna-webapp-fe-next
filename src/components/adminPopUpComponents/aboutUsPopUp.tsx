"use client";
import { FormEvent, useEffect, useRef, useState } from "react";
import { ApprovedIcon } from "../icons/approvedIcon";
import ExitIcon from "../icons/exitIcon";
import { InformationIcon } from "../icons/informationIcon";
import { PencilIcon } from "../icons/pencilIcon";
import { Sketch } from "@uiw/react-color";
import DangerPopUp from "../dialog/dangerPopUp";
import WarningPopUp from "../dialog/warningPopUp";
import InputField from "../adminComponents/inputField";
import TextAreaField from "../adminComponents/textAreaField";
import ImageInputField from "../adminComponents/imageInputField";
import DeleteAndSaveButtonForAdd from "../adminComponents/deleteAndSaveButton";
import ClockIcon from "../icons/clockIcon";
import { Backdrop } from "../backdrop";
import ToolTip from "../tooltip";

type AboutUsDataProps = {
	title: string;
	color: string;
	description: string;
	instagram: string;
	email: string;
	linkedin: string;
	image: string;
};

type AboutUsPopUpProps = {
	open: boolean;
	close: () => void;
	save: (aboutUsData: AboutUsDataProps) => void;
};

export default function AboutUsPopUp({ open, close, save }: AboutUsPopUpProps) {
	const [title, setTitle] = useState<string>("");
	const [color, setColor] = useState<string>("#ffffff");
	const [colorPicker, setColorPicker] = useState<boolean>(false);
	const colorPickerRef = useRef<HTMLDivElement>(null);
	const [description, setDescription] = useState<string>("");
	const [instagram, setInstagram] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [linkedin, setLinkedin] = useState<string>("");
	const [imageFileName, setImageFileName] = useState<string>("");
	const [preview, setPreview] = useState<string>("");
	const formComplete =
		title && color && description && instagram && email && linkedin && preview;
	const [submited, setSubmited] = useState<string | null>(null);
	const [editTitle, setEditTitle] = useState<boolean>(false);
	const [editColor, setEditColor] = useState<boolean>(false);
	const [editDescription, setEditDescription] = useState<boolean>(false);
	const [editInstagram, setEditInstagram] = useState<boolean>(false);
	const [editEmail, setEditEmail] = useState<boolean>(false);
	const [editLinkedin, setEditLinkedin] = useState<boolean>(false);
	const [editImage, setEditImage] = useState<boolean>(false);
	const [hex, setHex] = useState("#ffffff");

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

	function resetForm() {
		setTitle("");
		setColor("#ffffff");
		setHex("#ffffff");
		setDescription("");
		setInstagram("");
		setEmail("");
		setLinkedin("");
		setPreview("");
		setSubmited(null);
		setEditTitle(false);
		setEditColor(false);
		setEditDescription(false);
		setEditInstagram(false);
		setEditEmail(false);
		setEditLinkedin(false);
		setEditImage(false);
	}

	function handleColorChange(newHex: string) {
		setHex(newHex);
		setColor(newHex);
	}

	function handleImage(file: File[]) {
		const image = file[0];

		setImageFileName(image.name);
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

		if (submited == null) {
			setSubmited("submit");
			setEditTitle(true);
			setEditColor(true);
			setEditDescription(true);
			setEditInstagram(true);
			setEditEmail(true);
			setEditLinkedin(true);
			setEditImage(true);
		} else if (submited == "submit") {
			const aboutUsData: AboutUsDataProps = {
				title,
				color,
				description,
				instagram,
				email,
				linkedin,
				image: preview,
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
				save(aboutUsData);
				resetForm();
				close();
			}
		}
	}

	function handleDelete() {
		resetForm();
		close();
	}

	if (!open) return null;

	return (
		<section className="overflow-y-auto absolute top-0 left-0 w-full h-full grid grid-cols-12 items-center bg-white/20 backdrop-blur-[4px] py-10">
			<div className="col-span-12 xl:col-start-2 xl:col-end-12 2xl:col-start-3 2xl:col-end-11 rounded-t-[6px] px-2 sm:px-5 xl:px-16 2xl:px-20">
				<div className="relative">
					<div className="flex justify-between items-center border-b border-neutral-300 bg-black px-[24px] py-[10px] rounded-t-[6px]">
						<h1 className="text-sm sm:text-xl md:text-2xl font-semibold">About Us</h1>
						<div
							onClick={() =>
								title || description || instagram || email || linkedin || preview
									? setDangerPopUp(true)
									: close()
							}
							className="cursor-pointer border border-white rounded-[4px] p-2">
							<ExitIcon size={13} />
						</div>
					</div>
					<div className="bg-neutral-900 px-5 sm:px-[36px] py-[24px] space-y-[20px] sm:space-y-[32px]">
						<div className="flex justify-between items-start">
							<div
								className={`flex items-center border-[2px] ${
									submited == "save" ? "border-lime-900" : "border-orange-400"
								} py-[10px] px-[16px] rounded-[20px] gap-x-[8px]`}>
								{submited == "save" ? (
									<ApprovedIcon width={16} height={16} color="#84CC16" />
								) : (
									<ClockIcon width={14} height={14} color="#FB923C" />
								)}
								<p
									className={`text-xs font-bold ${
										submited == "save" ? "text-lime-500" : "text-orange-400"
									}`}>
									{submited == "save" ? "Approved" : "Waiting"}
								</p>
							</div>
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
								<li className="grid grid-cols-12 gap-[20px] md:gap-[40px]">
									<div className="col-span-12 sm:col-span-8 md:col-span-9 flex flex-col gap-y-[6px]">
										<InputField
											inputLabel="Title"
											inputPlaceholder="Enter Title"
											setData={setTitle}
											setEditData={setEditTitle}
											editData={editTitle}
											submited={`${submited}`}
										/>
									</div>
									<div className="col-span-12 sm:col-span-4 md:col-span-3 flex flex-col gap-y-[6px]">
										<label className="text-xs sm:text-base font-bold" htmlFor="">
											Color
										</label>
										<div className="flex items-center gap-x-[10px] relative">
											<div
												onClick={() => setColorPicker(!colorPicker)}
												className="w-[30px] h-[25px] cursor-pointer border border-neutral-700"
												style={{ backgroundColor: hex }}></div>
											<input
												value={hex}
												onChange={(e) => handleColorChange(e.target.value)}
												className={`w-full text-xs sm:text-base font-normal border ${
													editColor
														? "bg-neutral-800 border-transparent"
														: "bg-transparent border-neutral-500"
												} px-[12px] py-[8px] rounded-[4px] outline-none`}
												type="text"
												placeholder="Hex code"
												disabled={editColor}
											/>
											{colorPicker && !editColor && (
												<div
													ref={colorPickerRef}
													className="absolute z-10 top-full left-0 mt-2">
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
											{submited == "submit" && (
												<div
													onClick={() => setEditColor(!editColor)}
													className="cursor-pointer absolute right-1 sm:right-2 bottom-1 sm:bottom-2 flex items-center bg-neutral-700 gap-x-[5px] sm:gap-x-[10px] px-[8px] py-[5px] rounded-[8px]">
													<p className="text-xs text-neutral-400">Edit</p>
													<PencilIcon width={14} height={14} color="#A3A3A3" />
												</div>
											)}
										</div>
									</div>
								</li>
								<li className="w-full gap-x-[40px]">
									<div className="relative flex flex-col gap-y-[6px]">
										<TextAreaField
											textAreaLabel="Organization Description"
											textAreaPlaceholder="Event Description"
											setData={setDescription}
											setEditData={setEditDescription}
											editData={editDescription}
											submited={`${submited}`}
										/>
									</div>
								</li>
								<li className="grid grid-cols-12 gap-[20px]">
									<div className="relative col-span-12 lg:col-span-4 flex flex-col gap-y-[6px]">
										<label className="text-xs sm:text-base font-bold" htmlFor="">
											Instagram
										</label>
										<div className="flex items-center">
											<input
												onChange={(e) => setInstagram(e.target.value)}
												className={`w-full text-xs sm:text-base font-normal border ${
													editInstagram
														? "bg-neutral-800 border-transparent"
														: "bg-transparent border-neutral-500"
												} px-[12px] py-[8px] rounded-[4px] outline-none`}
												type="text"
												placeholder="https://instagram.com/example"
												disabled={editInstagram}
											/>
											{submited == "submit" && (
												<div
													onClick={() => setEditInstagram(!editInstagram)}
													className="cursor-pointer absolute right-1 sm:right-2 bottom-1 sm:bottom-2 flex items-center bg-neutral-700 gap-x-[5px] sm:gap-x-[10px] px-[8px] py-[5px] rounded-[8px]">
													<p className="text-xs text-neutral-400">Edit</p>
													<PencilIcon width={14} height={14} color="#A3A3A3" />
												</div>
											)}
										</div>
									</div>
									<div className="relative col-span-12 lg:col-span-4 flex flex-col gap-y-[6px]">
										<label className="text-xs sm:text-base font-bold" htmlFor="">
											Email
										</label>
										<div className="flex items-center">
											<input
												onChange={(e) => setEmail(e.target.value)}
												className={`w-full text-xs sm:text-base font-normal border ${
													editEmail
														? "bg-neutral-800 border-transparent"
														: "bg-transparent border-neutral-500"
												} px-[12px] py-[8px] rounded-[4px] outline-none`}
												type="text"
												placeholder="example@gmail.com"
												disabled={editEmail}
											/>
											{submited == "submit" && (
												<div
													onClick={() => setEditEmail(!editEmail)}
													className="cursor-pointer absolute right-1 sm:right-2 bottom-1 sm:bottom-2 flex items-center bg-neutral-700 gap-x-[5px] sm:gap-x-[10px] px-[8px] py-[5px] rounded-[8px]">
													<p className="text-xs text-neutral-400">Edit</p>
													<PencilIcon width={14} height={14} color="#A3A3A3" />
												</div>
											)}
										</div>
									</div>
									<div className="relative col-span-12 lg:col-span-4 flex flex-col gap-y-[6px]">
										<label className="text-xs sm:text-base font-bold" htmlFor="">
											Linkedin
										</label>
										<div className="flex items-center">
											<input
												onChange={(e) => setLinkedin(e.target.value)}
												className={`w-full text-xs sm:text-base font-normal border ${
													editLinkedin
														? "bg-neutral-800 border-transparent"
														: "bg-transparent border-neutral-500"
												} px-[12px] py-[8px] rounded-[4px] outline-none`}
												type="text"
												placeholder="https://linkedin.com/in/example"
												disabled={editLinkedin}
											/>
											{submited == "submit" && (
												<div
													onClick={() => setEditLinkedin(!editLinkedin)}
													className="cursor-pointer absolute right-1 sm:right-2 bottom-1 sm:bottom-2 flex items-center bg-neutral-700 gap-x-[5px] sm:gap-x-[10px] px-[8px] py-[5px] rounded-[8px]">
													<p className="text-xs text-neutral-400">Edit</p>
													<PencilIcon width={14} height={14} color="#A3A3A3" />
												</div>
											)}
										</div>
									</div>
								</li>
								<li className="grid grid-cols-12 gap-[20px]">
									<ImageInputField
										type="add"
										setPreview={setPreview}
										preview={preview}
										handleImage={handleImage}
										imageFileName={imageFileName}
										setEditImage={setEditImage}
										editImage={editImage}
										submited={submited}
									/>
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

			<WarningPopUp
				open={warningPopUp}
				close={() => setWarningPopUp(false)}
				title="Warning!"
				message={warningPopUpDescription}
				onConfirm={() => setWarningPopUp(false)}
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
