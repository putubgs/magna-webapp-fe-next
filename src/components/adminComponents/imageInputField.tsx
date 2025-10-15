import { PencilIcon, UploadIcon } from "lucide-react";
import Dropzone from "react-dropzone";
import ExitIcon from "../icons/exitIcon";
import Image from "next/image";

type ImageInputFieldProps = {
	type?: string;
	setPreview: (value: string) => void;
	preview: string;
	handleImage: (file: File[]) => void;
	imageFileName?: string;
	setEditImage: (value: boolean) => void;
	editImage: boolean;
	submited: string | null;
};

export default function ImageInputField({
	type,
	setPreview,
	preview,
	handleImage,
	imageFileName,
	setEditImage,
	editImage,
	submited,
}: ImageInputFieldProps) {
	return (
		<>
			{!editImage && (
				<div className="col-span-12 sm:col-span-8 md:col-span-6 lg:col-span-7 flex flex-col gap-y-[6px]">
					<label className="text-xs sm:text-base font-bold" htmlFor="">
						Upload Poster
					</label>
					<div className="flex items-center justify-center w-full">
						<Dropzone onDrop={(file) => handleImage(file)}>
							{({ getRootProps, getInputProps }) => (
								<label
									{...getRootProps()}
									htmlFor="dropzone-file"
									className="flex flex-col items-center justify-center w-full h-40 border-2 border-neutral-400 border-dashed rounded-lg cursor-pointer">
									<div className="flex flex-col items-center justify-center pt-5 pb-6">
										<UploadIcon color="white" />
										<p className="mb-2 text-xs sm:text-sm text-white">
											Drag & drop <span className="font-semibold">or browse</span>
										</p>
										<p className="text-xs text-gray-500 dark:text-gray-400">
											JPG, PNG, or SVG | MAX 10 mb
										</p>
									</div>
									<input {...getInputProps()} className="hidden" />
								</label>
							)}
						</Dropzone>
					</div>
				</div>
			)}
			<div
				className={`${
					submited == "submit"
						? "col-span-12 sm:col-span-4 md:col-span-3 2xl:col-span-2"
						: "col-span-12 sm:col-span-4 md:col-span-3 lg:col-span-2"
				} flex flex-col gap-y-[6px]`}>
				<label className="text-xs sm:text-base font-bold" htmlFor="">
					Image Preview
				</label>
				<div
					className={`relative h-40 flex justify-center items-center ${
						!preview && "border-2 border-neutral-400 border-dashed"
					} rounded-lg`}>
					{preview ? (
						<Image
							className="w-full h-full object-cover rounded-[8px]"
							src={preview}
							alt=""
              width={200}
              height={200}
						/>
					) : (
						<p className="text-xs text-center px-7">No Image To Preview</p>
					)}
					{editImage && (
						<div
							onClick={() => setEditImage(!editImage)}
							className="cursor-pointer absolute right-1 sm:right-2 bottom-1 sm:bottom-2 flex items-center bg-neutral-700 gap-x-[5px] sm:gap-x-[10px] px-[8px] py-[5px] rounded-[8px]">
							<p className="text-xs text-neutral-400">Edit</p>
							<PencilIcon width={14} height={14} color="#A3A3A3" />
						</div>
					)}
				</div>
			</div>
			{type == "add" && preview && (
				<div className="col-span-12 md:col-span-3 lg:col-span-3 xl:col-span-3 2xl:col-span-3 flex flex-col gap-y-[6px]">
					<label className="hidden md:block text-transparent" htmlFor="">
						lorem
					</label>
					{!submited && (
						<div className="flex justify-between items-center bg-primary px-[15px] py-[6px] rounded-[8px]">
							<p className="text-xs">{imageFileName}</p>
							<ExitIcon onClick={() => setPreview("")} size={10} />
						</div>
					)}
				</div>
			)}
		</>
	);
}
