"use client";
import { FormEvent, useEffect, useRef, useState } from "react";
import NextImage from "next/image";
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
import { X } from "lucide-react";

type AboutUsDataProps = {
  organization_id?: string;
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

type OrgDetailChanges = {
  org_detail_changes_id: string;
  organization_id: string;
  organization_name: string;
  color: string | null;
  logo_url: string | null;
  short_desc: string | null;
  full_desc: string | null;
  instagram_link: string | null;
  tiktok_link: string | null;
  linkedin_link: string | null;
  email: string | null;
  whatsapp: string | null;
  founded_date: string | null;
  request_status: "PENDING" | "REJECTED";
  request_feedback: string | null;
  created_at: string;
};

type AddAboutUsPopUpProps = {
  open: boolean;
  close: () => void;
  save: (aboutUsData: AboutUsDataProps) => void;
  data: AboutUsDataProps[];
  index: number;
  hasPendingChanges?: boolean;
  cancelRequest?: () => void;
  orgDetailChanges?: OrgDetailChanges | null;
  status?: "approved" | "waiting" | "rejected";
};

export default function AboutUsDetailPopUp({
  open,
  close,
  save,
  data,
  index,
  hasPendingChanges,
  cancelRequest,
  orgDetailChanges,
  status = "approved",
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
  const [imageFileName, setImageFileName] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploadingImage, setUploadingImage] = useState<boolean>(false);
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

  // Check if at least one field is being edited (any field can be saved independently)
  const isAnyFieldBeingEdited =
    !editName ||
    !editColor ||
    !editDescription ||
    !editCardDescription ||
    !editInstagram ||
    !editEmail ||
    !editLinkedin ||
    !editTiktok ||
    !editWhatsapp ||
    !editFoundedDate ||
    !editImage;

  const formComplete = isAnyFieldBeingEdited;
  const [hex, setHex] = useState<string>("#ffffff");

  const [warningPopUp, setWarningPopUp] = useState<boolean>(false);
  const [warningPopUpDescription, setWarningPopUpDescription] =
    useState<string>("");

  // Function to edit specific field - disables all other fields and enables only the selected one
  const editField = (fieldName: string) => {
    // Disable all fields first
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

    // Enable only the selected field
    switch (fieldName) {
      case "name":
        setEditName(false);
        break;
      case "color":
        setEditColor(false);
        break;
      case "description":
        setEditDescription(false);
        break;
      case "cardDescription":
        setEditCardDescription(false);
        break;
      case "instagram":
        setEditInstagram(false);
        break;
      case "email":
        setEditEmail(false);
        break;
      case "linkedin":
        setEditLinkedin(false);
        break;
      case "tiktok":
        setEditTiktok(false);
        break;
      case "whatsapp":
        setEditWhatsapp(false);
        break;
      case "foundedDate":
        setEditFoundedDate(false);
        break;
      case "image":
        setEditImage(false);
        break;
    }
  };

  const [dangerPopUp, setDangerPopUp] = useState<boolean>(false);
  const [showPreviousData, setShowPreviousData] = useState<boolean>(false);
  const [previousData, setPreviousData] = useState<AboutUsDataProps | null>(
    null
  );

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
    if (data && data.length > 0 && open) {
      // Store previous data (current approved data)
      setPreviousData(data[0]);

      // If there are pending/rejected changes, show those
      if ((status === "waiting" || status === "rejected") && orgDetailChanges) {
        setName(orgDetailChanges.organization_name || data[0].name);
        setColor(orgDetailChanges.color || data[0].color);
        setHex(orgDetailChanges.color || data[0].color);
        setDescription(orgDetailChanges.full_desc || data[0].description);
        setCardDescription(
          orgDetailChanges.short_desc || data[0].cardDescription || ""
        );
        setInstagram(orgDetailChanges.instagram_link || data[0].instagram);
        setEmail(orgDetailChanges.email || data[0].email);
        setLinkedin(orgDetailChanges.linkedin_link || data[0].linkedin);
        setTiktok(orgDetailChanges.tiktok_link || data[0].tiktok || "");
        setWhatsapp(orgDetailChanges.whatsapp || data[0].whatsapp || "");
        setFoundedDate(
          orgDetailChanges.founded_date || data[0].foundedDate || ""
        );
        setPreview(orgDetailChanges.logo_url || data[0].image);
      } else {
        // Show current approved data
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

      // Reset show previous data state
      setShowPreviousData(false);
    }
  }, [data, open, status, orgDetailChanges]);

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

    setImageFileName(image.name);
    setImageFile(image);

    // Create object URL safely
    try {
      const objectURL = URL.createObjectURL(image);
      setPreview(objectURL);
    } catch (error) {
      console.error("Error creating object URL:", error);
      setPreview("");
    }
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

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Validate URLs first
    if (instagram.trim() !== "" && !validateUrl(instagram)) {
      setWarningPopUp(true);
      setWarningPopUpDescription("Invalid Instagram URL");
      return;
    }
    if (email.trim() !== "" && !validateEmail(email)) {
      setWarningPopUp(true);
      setWarningPopUpDescription("Invalid Email Format");
      return;
    }
    if (linkedin.trim() !== "" && !validateUrl(linkedin)) {
      setWarningPopUp(true);
      setWarningPopUpDescription("Invalid Linkedin URL");
      return;
    }
    if (tiktok.trim() !== "" && !validateUrl(tiktok)) {
      setWarningPopUp(true);
      setWarningPopUpDescription("Invalid TikTok URL");
      return;
    }

    let imageUrl = preview || data[0].image;

    // Upload image to Supabase if a new file was selected
    if (imageFile) {
      setUploadingImage(true);
      try {
        const formData = new FormData();
        formData.append("file", imageFile);
        formData.append("bucket", "Magna Images");
        formData.append("folder", "eya2mq_0");

        const uploadResponse = await fetch("/api/upload-image", {
          method: "POST",
          body: formData,
          credentials: "include",
        });

        if (!uploadResponse.ok) {
          const error = await uploadResponse.json();
          setWarningPopUp(true);
          setWarningPopUpDescription(
            error.error || "Failed to upload image. Please try again."
          );
          setUploadingImage(false);
          return;
        }

        const uploadData = await uploadResponse.json();
        imageUrl = uploadData.url;
        console.log("✅ Image uploaded to:", imageUrl);
      } catch (error) {
        console.error("❌ Error uploading image:", error);
        setWarningPopUp(true);
        setWarningPopUpDescription("Failed to upload image. Please try again.");
        setUploadingImage(false);
        return;
      } finally {
        setUploadingImage(false);
      }
    }

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
      image: imageUrl,
    };

    save(editAboutUsData);
    setSubmited("save");

    resetState();
    close();
  }

  function handleDangerPopUp() {
    setDangerPopUp(true);
  }

  function toggleDataView() {
    if (previousData && hasPendingChanges) {
      setShowPreviousData(!showPreviousData);

      if (!showPreviousData) {
        // Switch to previous data (approved)
        setName(previousData.name);
        setColor(previousData.color);
        setHex(previousData.color);
        setDescription(previousData.description);
        setCardDescription(previousData.cardDescription || "");
        setInstagram(previousData.instagram);
        setEmail(previousData.email);
        setLinkedin(previousData.linkedin);
        setTiktok(previousData.tiktok || "");
        setWhatsapp(previousData.whatsapp || "");
        setFoundedDate(previousData.foundedDate || "");
        setPreview(previousData.image);
      } else {
        // Switch back to pending/rejected data
        if (orgDetailChanges) {
          setName(orgDetailChanges.organization_name || previousData.name);
          setColor(orgDetailChanges.color || previousData.color);
          setHex(orgDetailChanges.color || previousData.color);
          setDescription(
            orgDetailChanges.full_desc || previousData.description
          );
          setCardDescription(
            orgDetailChanges.short_desc || previousData.cardDescription || ""
          );
          setInstagram(
            orgDetailChanges.instagram_link || previousData.instagram
          );
          setEmail(orgDetailChanges.email || previousData.email);
          setLinkedin(orgDetailChanges.linkedin_link || previousData.linkedin);
          setTiktok(orgDetailChanges.tiktok_link || previousData.tiktok || "");
          setWhatsapp(orgDetailChanges.whatsapp || previousData.whatsapp || "");
          setFoundedDate(
            orgDetailChanges.founded_date || previousData.foundedDate || ""
          );
          setPreview(orgDetailChanges.logo_url || previousData.image);
        }
      }
    }
  }

  function handleCancelRequest() {
    if (cancelRequest) {
      cancelRequest();
      close();
    }
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
            <div className="flex items-center gap-4">
              <div
                className={`flex items-center border-[2px] ${
                  status === "waiting"
                    ? "border-orange-400"
                    : status === "rejected"
                    ? "border-red-500"
                    : "border-lime-900"
                } py-[10px] px-[16px] rounded-[20px] gap-x-[8px]`}
              >
                {status === "waiting" ? (
                  <ClockIcon width={14} height={14} color="#FB923C" />
                ) : status === "rejected" ? (
                  <X size={16} className="text-red-500" />
                ) : (
                  <ApprovedIcon width={16} height={16} color="#84CC16" />
                )}
                <p
                  className={`text-xs font-bold ${
                    status === "waiting"
                      ? "text-orange-400"
                      : status === "rejected"
                      ? "text-red-500"
                      : "text-lime-500"
                  }`}
                >
                  {status === "waiting"
                    ? "Waiting"
                    : status === "rejected"
                    ? "Rejected"
                    : "Approved"}
                </p>
              </div>

              {/* Toggle button - only show when changes exist */}
              {hasPendingChanges && orgDetailChanges && (
                <button
                  onClick={toggleDataView}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full border-2 transition-all ${
                    !showPreviousData
                      ? "border-blue-500 bg-blue-500/10 text-blue-500"
                      : "border-purple-500 bg-purple-500/10 text-purple-500"
                  }`}
                >
                  <span className="text-lg">
                    {!showPreviousData ? "📋" : "🔄"}
                  </span>
                  <span className="text-xs font-bold whitespace-nowrap">
                    {!showPreviousData
                      ? "Show Previous Data"
                      : "Show Requested Data"}
                  </span>
                </button>
              )}
              {/* Cancel request button - only show when there are pending changes */}
              {hasPendingChanges && cancelRequest && (
                <button
                  onClick={handleCancelRequest}
                  className="flex items-center gap-2 px-4 py-2 rounded-full border-2 border-red-500 bg-red-500/10 text-red-500 transition-all hover:bg-red-500/20"
                >
                  <span className="text-lg">❌</span>
                  <span className="text-xs font-bold whitespace-nowrap">
                    Cancel Request
                  </span>
                </button>
              )}
            </div>

            {/* Rejection feedback - only show when status is rejected */}
            <div className="relative cursor-pointer">
              <InformationIcon width={20} height={20} color="white" />
              <ToolTip tooltipData={tooltipData} />
            </div>
          </div>
          {status === "rejected" && orgDetailChanges?.request_feedback && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                {/* <span className="text-red-500 text-lg"></span> */}
                <h3 className="text-red-500 font-bold text-sm">
                  This Action Is Rejected.
                </h3>
              </div>
              <p className="text-sm text-red-300">
                {orgDetailChanges.request_feedback}
              </p>
            </div>
          )}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-end gap-y-[32px]"
          >
            <ul className="w-full border border-neutral-700 px-[20px] py-[24px] rounded-[8px] space-y-[40px]">
              <li className="grid grid-cols-12 gap-[20px] md:gap-[40px]">
                <div className="relative col-span-12 sm:col-span-8 md:col-span-9 flex flex-col gap-y-[6px]">
                  <label className="text-xs sm:text-base font-bold" htmlFor="">
                    Name
                  </label>
                  {showPreviousData ? (
                    <p className="text-sm sm:text-base text-gray-300 bg-neutral-800 px-3 py-2 rounded">
                      {name || "-"}
                    </p>
                  ) : (
                    <>
                      <input
                        onChange={(e) => setName(e.target.value)}
                        defaultValue={data[0].name}
                        className={`text-xs sm:text-base font-normal border ${
                          editName
                            ? "bg-neutral-800 border-transparent"
                            : "bg-transparent border-neutral-500"
                        } px-[12px] py-[8px] rounded-[4px] outline-none`}
                        type="text"
                        placeholder="Enter Name"
                        disabled={editName}
                      />
                      {submited == null && editName && (
                        <div
                          onClick={() => editField("name")}
                          className="cursor-pointer absolute right-2 bottom-1 sm:bottom-2 flex items-center bg-neutral-700 gap-x-[10px] px-[8px] py-[5px] rounded-[8px]"
                        >
                          <p className="text-xs text-neutral-400">Edit</p>
                          <PencilIcon width={14} height={14} color="#A3A3A3" />
                        </div>
                      )}
                    </>
                  )}
                </div>
                <div className="col-span-12 sm:col-span-4 md:col-span-3 flex flex-col gap-y-[6px]">
                  <label className="text-xs sm:text-base font-bold" htmlFor="">
                    Color
                  </label>
                  {showPreviousData ? (
                    <div className="flex items-center gap-x-[10px] bg-neutral-800 px-3 py-2 rounded">
                      <div
                        className="w-[30px] h-[25px] border border-neutral-700 rounded"
                        style={{ backgroundColor: hex }}
                      ></div>
                      <p className="text-sm sm:text-base text-gray-300">
                        {hex || "#ffffff"}
                      </p>
                    </div>
                  ) : (
                    <div className="flex items-center gap-x-[10px] relative">
                      <div
                        onClick={() =>
                          !editColor && setColorPicker(!colorPicker)
                        }
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
                      {submited == null && editColor && (
                        <div
                          onClick={() => editField("color")}
                          className="cursor-pointer absolute right-2 bottom-1 sm:bottom-2 flex items-center bg-neutral-700 gap-x-[10px] px-[8px] py-[5px] rounded-[8px]"
                        >
                          <p className="text-xs text-neutral-400">Edit</p>
                          <PencilIcon width={14} height={14} color="#A3A3A3" />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </li>
              <li className="w-full gap-x-[40px]">
                <div className="relative flex flex-col gap-y-[6px]">
                  <label className="text-xs sm:text-base font-bold">
                    Organization Description
                  </label>
                  {showPreviousData ? (
                    <p className="text-sm sm:text-base text-gray-300 bg-neutral-800 px-3 py-2 rounded min-h-[80px]">
                      {description || "-"}
                    </p>
                  ) : (
                    <div className="relative">
                      <textarea
                        onChange={(e) => setDescription(e.target.value)}
                        className={`w-full h-28 md:h-20 text-xs sm:text-base font-normal border ${
                          editDescription
                            ? "bg-neutral-800 border-transparent"
                            : "bg-transparent border-neutral-500"
                        } px-[12px] py-[8px] ${
                          editDescription ? "pb-[40px]" : ""
                        } rounded-[4px] outline-none resize-none`}
                        placeholder="Enter The Organization Description"
                        disabled={editDescription}
                        defaultValue={data[0].description}
                      />
                      {submited == null && editDescription && (
                        <div
                          onClick={() => editField("description")}
                          className="cursor-pointer absolute right-2 bottom-3 flex items-center bg-neutral-700 gap-x-[5px] sm:gap-x-[10px] px-[8px] py-[5px] rounded-[8px]"
                        >
                          <p className="text-xs text-neutral-400">Edit</p>
                          <PencilIcon width={14} height={14} color="#A3A3A3" />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </li>
              <li className="w-full gap-x-[40px]">
                <div className="flex flex-col gap-y-[6px]">
                  <label className="text-xs sm:text-base font-bold">
                    Card Description
                  </label>
                  {showPreviousData ? (
                    <p className="text-sm sm:text-base text-gray-300 bg-neutral-800 px-3 py-2 rounded min-h-[80px]">
                      {cardDescription || "-"}
                    </p>
                  ) : (
                    <>
                      <div className="relative">
                        <textarea
                          onChange={(e) => setCardDescription(e.target.value)}
                          className={`w-full h-28 md:h-20 text-xs sm:text-base font-normal border ${
                            editCardDescription
                              ? "bg-neutral-800 border-transparent"
                              : "bg-transparent border-neutral-500"
                          } px-[12px] py-[8px] ${
                            editCardDescription ? "pb-[40px]" : ""
                          } rounded-[4px] outline-none resize-none`}
                          placeholder="Enter card description (max 115 characters)"
                          disabled={editCardDescription}
                          value={cardDescription}
                        />
                        {submited == null && editCardDescription && (
                          <div
                            onClick={() => editField("cardDescription")}
                            className="cursor-pointer absolute right-2 bottom-3 flex items-center bg-neutral-700 gap-x-[5px] sm:gap-x-[10px] px-[8px] py-[5px] rounded-[8px]"
                          >
                            <p className="text-xs text-neutral-400">Edit</p>
                            <PencilIcon
                              width={14}
                              height={14}
                              color="#A3A3A3"
                            />
                          </div>
                        )}
                      </div>
                      <div className="flex justify-end">
                        <p
                          className={`text-xs ${
                            cardDescription.length > 115
                              ? "text-red-500"
                              : cardDescription.length > 100
                              ? "text-orange-400"
                              : "text-gray-400"
                          }`}
                        >
                          {cardDescription.length}/115 characters
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </li>
              <li className="grid grid-cols-12 gap-[20px]">
                <div className="relative col-span-12 lg:col-span-4 flex flex-col gap-y-[6px]">
                  <label className="text-xs sm:text-base font-bold" htmlFor="">
                    Instagram
                  </label>
                  {showPreviousData ? (
                    <p className="text-sm sm:text-base text-gray-300 bg-neutral-800 px-3 py-2 rounded">
                      {instagram || "-"}
                    </p>
                  ) : (
                    <>
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
                      {submited == null && editInstagram && (
                        <div
                          onClick={() => editField("instagram")}
                          className="cursor-pointer absolute right-2 bottom-1 sm:bottom-2 flex items-center bg-neutral-700 gap-x-[10px] px-[8px] py-[5px] rounded-[8px]"
                        >
                          <p className="text-xs text-neutral-400">Edit</p>
                          <PencilIcon width={14} height={14} color="#A3A3A3" />
                        </div>
                      )}
                    </>
                  )}
                </div>
                <div className="relative col-span-12 lg:col-span-4 flex flex-col gap-y-[6px]">
                  <label className="text-xs sm:text-base font-bold" htmlFor="">
                    Email
                  </label>
                  {showPreviousData ? (
                    <p className="text-sm sm:text-base text-gray-300 bg-neutral-800 px-3 py-2 rounded">
                      {email || "-"}
                    </p>
                  ) : (
                    <>
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
                      {submited == null && editEmail && (
                        <div
                          onClick={() => editField("email")}
                          className="cursor-pointer absolute right-2 bottom-1 sm:bottom-2 flex items-center bg-neutral-700 gap-x-[10px] px-[8px] py-[5px] rounded-[8px]"
                        >
                          <p className="text-xs text-neutral-400">Edit</p>
                          <PencilIcon width={14} height={14} color="#A3A3A3" />
                        </div>
                      )}
                    </>
                  )}
                </div>
                <div className="relative col-span-12 lg:col-span-4 flex flex-col gap-y-[6px]">
                  <label className="text-xs sm:text-base font-bold" htmlFor="">
                    Linkedin
                  </label>
                  {showPreviousData ? (
                    <p className="text-sm sm:text-base text-gray-300 bg-neutral-800 px-3 py-2 rounded">
                      {linkedin || "-"}
                    </p>
                  ) : (
                    <>
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
                      {submited == null && editLinkedin && (
                        <div
                          onClick={() => editField("linkedin")}
                          className="cursor-pointer absolute right-2 bottom-1 sm:bottom-2 flex items-center bg-neutral-700 gap-x-[10px] px-[8px] py-[5px] rounded-[8px]"
                        >
                          <p className="text-xs text-neutral-400">Edit</p>
                          <PencilIcon width={14} height={14} color="#A3A3A3" />
                        </div>
                      )}
                    </>
                  )}
                </div>
              </li>
              <li className="grid grid-cols-12 gap-[20px]">
                <div className="relative col-span-12 lg:col-span-4 flex flex-col gap-y-[6px]">
                  <label className="text-xs sm:text-base font-bold" htmlFor="">
                    TikTok
                  </label>
                  {showPreviousData ? (
                    <p className="text-sm sm:text-base text-gray-300 bg-neutral-800 px-3 py-2 rounded">
                      {tiktok || "-"}
                    </p>
                  ) : (
                    <>
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
                      {submited == null && editTiktok && (
                        <div
                          onClick={() => editField("tiktok")}
                          className="cursor-pointer absolute right-2 bottom-1 sm:bottom-2 flex items-center bg-neutral-700 gap-x-[10px] px-[8px] py-[5px] rounded-[8px]"
                        >
                          <p className="text-xs text-neutral-400">Edit</p>
                          <PencilIcon width={14} height={14} color="#A3A3A3" />
                        </div>
                      )}
                    </>
                  )}
                </div>
                <div className="relative col-span-12 lg:col-span-4 flex flex-col gap-y-[6px]">
                  <label className="text-xs sm:text-base font-bold" htmlFor="">
                    WhatsApp
                  </label>
                  {showPreviousData ? (
                    <p className="text-sm sm:text-base text-gray-300 bg-neutral-800 px-3 py-2 rounded">
                      {whatsapp || "-"}
                    </p>
                  ) : (
                    <>
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
                      {submited == null && editWhatsapp && (
                        <div
                          onClick={() => editField("whatsapp")}
                          className="cursor-pointer absolute right-2 bottom-1 sm:bottom-2 flex items-center bg-neutral-700 gap-x-[10px] px-[8px] py-[5px] rounded-[8px]"
                        >
                          <p className="text-xs text-neutral-400">Edit</p>
                          <PencilIcon width={14} height={14} color="#A3A3A3" />
                        </div>
                      )}
                    </>
                  )}
                </div>
                <div className="relative col-span-12 lg:col-span-4 flex flex-col gap-y-[6px]">
                  <label className="text-xs sm:text-base font-bold" htmlFor="">
                    Founded Date
                  </label>
                  {showPreviousData ? (
                    <p className="text-sm sm:text-base text-gray-300 bg-neutral-800 px-3 py-2 rounded">
                      {foundedDate || "-"}
                    </p>
                  ) : (
                    <div className="relative">
                      <input
                        onChange={(e) => setFoundedDate(e.target.value)}
                        value={foundedDate}
                        className={`w-full text-xs sm:text-base font-normal border ${
                          editFoundedDate
                            ? "bg-neutral-800 border-transparent"
                            : "bg-transparent border-neutral-500"
                        } px-[12px] py-[8px] rounded-[4px] outline-none [color-scheme:dark] accent-primary`}
                        type="date"
                        disabled={editFoundedDate}
                      />
                      {submited == null && (
                        <div
                          onClick={() => editField("foundedDate")}
                          className="cursor-pointer absolute right-2 bottom-1 sm:bottom-2 flex items-center bg-neutral-700 gap-x-[10px] px-[8px] py-[5px] rounded-[8px]"
                        >
                          <p className="text-xs text-neutral-400">Edit</p>
                          <PencilIcon width={14} height={14} color="#A3A3A3" />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </li>
              <li className="grid grid-cols-12 gap-[20px]">
                {showPreviousData ? (
                  <div className="col-span-12 flex flex-col gap-y-[6px]">
                    <label className="text-xs sm:text-base font-bold">
                      Logo
                    </label>
                    <div className="bg-neutral-800 px-3 py-2 rounded min-h-[100px] flex items-center justify-center">
                      {preview ? (
                        <NextImage
                          src={preview}
                          alt="Organization Logo"
                          width={200}
                          height={100}
                          className="max-w-[200px] max-h-[100px] object-contain"
                        />
                      ) : (
                        <span className="text-gray-500">No logo available</span>
                      )}
                    </div>
                  </div>
                ) : (
                  <ImageInputField
                    setPreview={setPreview}
                    preview={preview}
                    handleImage={handleImage}
                    imageFileName={imageFileName}
                    setEditImage={() => editField("image")}
                    editImage={editImage}
                    submited={submited}
                  />
                )}
              </li>
            </ul>
            {isAnyFieldBeingEdited && (
              <DeleteAndSaveButtonForEdit
                submited={submited}
                formComplete={formComplete && !uploadingImage}
                handleDangerPopUp={handleDangerPopUp}
                saveLabel={uploadingImage ? "Uploading..." : "Save"}
              />
            )}
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

      {hasPendingChanges && cancelRequest && (
        <DangerPopUp
          open={dangerPopUp}
          close={() => setDangerPopUp(false)}
          onConfirm={handleCancelRequest}
          title="Cancel Request"
          message="Are you sure you want to cancel your pending update request?"
        />
      )}
    </section>
  );
}
