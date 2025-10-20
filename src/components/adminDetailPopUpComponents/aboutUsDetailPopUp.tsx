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
import { DeleteAndSaveButtonForEdit } from "../adminComponents/deleteAndSaveButton";
import ToolTip from "../tooltip";
import ClockIcon from "../icons/clockIcon";

type AboutUsDataProps = {
  name: string;
  color: string;
  description: string;
  cardDescription: string;
  instagram: string;
  email: string;
  linkedin: string;
  tiktok: string;
  whatsapp: string;
  foundedDate: string;
  image: string;
};

type AddAboutUsPopUpProps = {
  open: boolean;
  close: () => void;
  save: (aboutUsData: AboutUsDataProps, index: number) => void;
  delete: (index: number) => void;
  data: AboutUsDataProps[];
  index: number;
};

export default function AboutUsDetailPopUp({
  open,
  close,
  save,
  delete: deleteData,
  data,
  index,
}: AddAboutUsPopUpProps) {
  const [name, setName] = useState<string>("");
  const [color, setColor] = useState<string>("#ffffff");
  const [colorPicker, setColorPicker] = useState<boolean>(false);
  const colorPickerRef = useRef<HTMLDivElement>(null);
  const [description, setDescription] = useState<string>("");
  const [cardDescription, setCardDescription] = useState<string>("");
  const [instagram, setInstagram] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [linkedin, setLinkedin] = useState<string>("");
  const [tiktok, setTiktok] = useState<string>("");
  const [whatsapp, setWhatsapp] = useState<string>("");
  const [foundedDate, setFoundedDate] = useState<string>("");
  const [preview, setPreview] = useState<string>("");
  const formComplete =
    name &&
    color &&
    description &&
    cardDescription &&
    instagram &&
    email &&
    linkedin &&
    tiktok &&
    whatsapp &&
    foundedDate &&
    preview;
  const [submited, setSubmited] = useState<string | null>(null);
  const [editName, setEditName] = useState<boolean>(true);
  const [editColor, setEditColor] = useState<boolean>(true);
  const [editDescription, setEditDescription] = useState<boolean>(true);
  const [editCardDescription, setEditCardDescription] = useState<boolean>(true);
  const [editInstagram, setEditInstagram] = useState<boolean>(true);
  const [editEmail, setEditEmail] = useState<boolean>(true);
  const [editLinkedin, setEditLinkedin] = useState<boolean>(true);
  const [editTiktok, setEditTiktok] = useState<boolean>(true);
  const [editWhatsapp, setEditWhatsapp] = useState<boolean>(true);
  const [editFoundedDate, setEditFoundedDate] = useState<boolean>(true);
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
      ["Card Description", "-", "115 Characters"],
      ["Logo", "1 Image", "1 Image"],
      ["Instagram", "1 Account", "1 Account"],
      ["Email", "1 Account", "1 Account"],
      ["Linkedin", "1 Account", "1 Account"],
      ["TikTok", "1 Account", "1 Account"],
      ["WhatsApp", "1 Number", "1 Number"],
      ["Founded Date", "1 Date", "1 Date"],
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
      setName(data[0].name);
      setColor(data[0].color);
      setHex(data[0].color);
      setDescription(data[0].description);
      setCardDescription(data[0].cardDescription || "");
      setInstagram(data[0].instagram);
      setEmail(data[0].email);
      setLinkedin(data[0].linkedin);
      setTiktok(data[0].tiktok || "");
      setWhatsapp(data[0].whatsapp || "");
      setFoundedDate(data[0].foundedDate || "");
      setPreview(data[0].image);
    }
  }, [data, open]);

  function resetState() {
    setEditName(true);
    setEditColor(true);
    setEditDescription(true);
    setEditCardDescription(true);
    setEditInstagram(true);
    setEditEmail(true);
    setEditLinkedin(true);
    setEditTiktok(true);
    setEditWhatsapp(true);
    setEditFoundedDate(true);
    setEditImage(true);
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

    const editAboutUsData: AboutUsDataProps = {
      name,
      color,
      description,
      cardDescription,
      instagram,
      email,
      linkedin,
      tiktok,
      whatsapp,
      foundedDate,
      image: preview || data[0].image,
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
    } else if (!validateUrl(tiktok)) {
      setWarningPopUp(true);
      setWarningPopUpDescription("Invalid TikTok URL");
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
        <div className="flex justify-between items-center border-b border-neutral-300 bg-black px-[24px] py-[10px] rounded-t-[6px]">
          <h1 className="text-sm sm:text-xl md:text-2xl font-semibold">
            About Us
          </h1>
          <button
            onClick={() => {
              resetState();
              close();
            }}
            className="cursor-pointer border border-white rounded-[4px] p-2"
          >
            <ExitIcon size={13} />
          </button>
        </div>
        <div className="bg-neutral-900 px-5 sm:px-[36px] py-[24px] space-y-[20px] sm:space-y-[32px]">
          <div className="flex justify-between items-start">
            <div
              className={`flex items-center border-[2px] ${
                submited !== "save" ? "border-lime-900" : "border-orange-400"
              } py-[10px] px-[16px] rounded-[20px] gap-x-[8px]`}
            >
              {submited !== "save" ? (
                <ApprovedIcon width={16} height={16} color="#84CC16" />
              ) : (
                <ClockIcon width={14} height={14} color="#FB923C" />
              )}
              <p
                className={`text-xs font-bold ${
                  submited !== "save" ? "text-lime-500" : "text-orange-400"
                }`}
              >
                {submited !== "save" ? "Approved" : "Waiting"}
              </p>
            </div>
            <div className="relative cursor-pointer">
              <InformationIcon width={20} height={20} color="white" />
              <ToolTip tooltipData={tooltipData} />
            </div>
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-end gap-y-[32px]"
          >
            <ul className="w-full border border-neutral-700 px-[20px] py-[24px] rounded-[8px] space-y-[40px]">
              <li className="grid grid-cols-12 gap-[20px] md:gap-[40px]">
                <div className="col-span-12 sm:col-span-8 md:col-span-9 flex flex-col gap-y-[6px]">
                  <InputField
                    inputLabel="Name"
                    inputPlaceholder="Enter Name"
                    setData={setName}
                    setEditData={setEditName}
                    editData={editName}
                    submited={null}
                    data={data[0].name}
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
                      style={{ backgroundColor: hex }}
                    ></div>
                    <div className="text-xs sm:text-base flex-1 overflow-hidden">
                      <input
                        value={hex}
                        onChange={(e) =>
                          !editColor && handleColorChange(e.target.value)
                        }
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
                        className="absolute z-10 top-full right-0 mt-2"
                      >
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
                        className="cursor-pointer absolute right-2 bottom-1 sm:bottom-2 flex items-center bg-neutral-700 gap-x-[10px] px-[8px] py-[5px] rounded-[8px]"
                      >
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
                    textAreaPlaceholder="Enter The Organization Description"
                    setData={setDescription}
                    setEditData={setEditDescription}
                    editData={editDescription}
                    submited={null}
                    data={data[0].description}
                  />
                </div>
              </li>
              <li className="w-full gap-x-[40px]">
                <div className="relative flex flex-col gap-y-[6px]">
                  <TextAreaField
                    textAreaLabel="Card Description"
                    textAreaPlaceholder="Enter card description (max 115 characters)"
                    setData={setCardDescription}
                    setEditData={setEditCardDescription}
                    editData={editCardDescription}
                    submited={null}
                    data={data[0].cardDescription || ""}
                  />
                  {cardDescription.length > 115 && (
                    <p className="text-red-500 text-xs">
                      Character limit exceeded ({cardDescription.length}/115)
                    </p>
                  )}
                </div>
              </li>
              <li className="grid grid-cols-12 gap-[20px]">
                <div className="relative col-span-12 lg:col-span-4 flex flex-col gap-y-[6px]">
                  <label className="text-xs sm:text-base font-bold" htmlFor="">
                    Instagram
                  </label>
                  <input
                    onChange={(e) => setInstagram(e.target.value)}
                    defaultValue={data[0].instagram}
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
                      className="cursor-pointer absolute right-2 bottom-1 sm:bottom-2 flex items-center bg-neutral-700 gap-x-[10px] px-[8px] py-[5px] rounded-[8px]"
                    >
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
                    defaultValue={data[0].email}
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
                      className="cursor-pointer absolute right-2 bottom-1 sm:bottom-2 flex items-center bg-neutral-700 gap-x-[10px] px-[8px] py-[5px] rounded-[8px]"
                    >
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
                    defaultValue={data[0].linkedin}
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
                      className="cursor-pointer absolute right-2 bottom-1 sm:bottom-2 flex items-center bg-neutral-700 gap-x-[10px] px-[8px] py-[5px] rounded-[8px]"
                    >
                      <p className="text-xs text-neutral-400">Edit</p>
                      <PencilIcon width={14} height={14} color="#A3A3A3" />
                    </div>
                  )}
                </div>
              </li>
              <li className="grid grid-cols-12 gap-[20px]">
                <div className="relative col-span-12 lg:col-span-4 flex flex-col gap-y-[6px]">
                  <label className="text-xs sm:text-base font-bold" htmlFor="">
                    TikTok
                  </label>
                  <input
                    onChange={(e) => setTiktok(e.target.value)}
                    defaultValue={data[0].tiktok || ""}
                    className={`text-xs sm:text-base font-normal border ${
                      editTiktok
                        ? "bg-neutral-800 border-transparent"
                        : "bg-transparent border-neutral-500"
                    } px-[12px] py-[8px] rounded-[4px] outline-none`}
                    type="text"
                    placeholder="TikTok"
                    disabled={editTiktok}
                  />
                  {submited == null && (
                    <div
                      onClick={() => setEditTiktok(!editTiktok)}
                      className="cursor-pointer absolute right-2 bottom-1 sm:bottom-2 flex items-center bg-neutral-700 gap-x-[10px] px-[8px] py-[5px] rounded-[8px]"
                    >
                      <p className="text-xs text-neutral-400">Edit</p>
                      <PencilIcon width={14} height={14} color="#A3A3A3" />
                    </div>
                  )}
                </div>
                <div className="relative col-span-12 lg:col-span-4 flex flex-col gap-y-[6px]">
                  <label className="text-xs sm:text-base font-bold" htmlFor="">
                    WhatsApp
                  </label>
                  <input
                    onChange={(e) => setWhatsapp(e.target.value)}
                    defaultValue={data[0].whatsapp || ""}
                    className={`text-xs sm:text-base font-normal border ${
                      editWhatsapp
                        ? "bg-neutral-800 border-transparent"
                        : "bg-transparent border-neutral-500"
                    } px-[12px] py-[8px] rounded-[4px] outline-none`}
                    type="text"
                    placeholder="WhatsApp"
                    disabled={editWhatsapp}
                  />
                  {submited == null && (
                    <div
                      onClick={() => setEditWhatsapp(!editWhatsapp)}
                      className="cursor-pointer absolute right-2 bottom-1 sm:bottom-2 flex items-center bg-neutral-700 gap-x-[10px] px-[8px] py-[5px] rounded-[8px]"
                    >
                      <p className="text-xs text-neutral-400">Edit</p>
                      <PencilIcon width={14} height={14} color="#A3A3A3" />
                    </div>
                  )}
                </div>
                <div className="relative col-span-12 lg:col-span-4 flex flex-col gap-y-[6px]">
                  <label className="text-xs sm:text-base font-bold" htmlFor="">
                    Founded Date
                  </label>
                  <input
                    onChange={(e) => setFoundedDate(e.target.value)}
                    defaultValue={data[0].foundedDate || ""}
                    className={`text-xs sm:text-base font-normal border ${
                      editFoundedDate
                        ? "bg-neutral-800 border-transparent"
                        : "bg-transparent border-neutral-500"
                    } px-[12px] py-[8px] rounded-[4px] outline-none`}
                    type="date"
                    disabled={editFoundedDate}
                  />
                  {submited == null && (
                    <div
                      onClick={() => setEditFoundedDate(!editFoundedDate)}
                      className="cursor-pointer absolute right-2 bottom-1 sm:bottom-2 flex items-center bg-neutral-700 gap-x-[10px] px-[8px] py-[5px] rounded-[8px]"
                    >
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
            <DeleteAndSaveButtonForEdit
              submited={submited}
              formComplete={formComplete}
              handleDangerPopUp={handleDangerPopUp}
              saveLabel="Save"
            />
          </form>
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
