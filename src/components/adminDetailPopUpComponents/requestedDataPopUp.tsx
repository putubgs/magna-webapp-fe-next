"use client";
import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { ApprovedIcon } from "../icons/approvedIcon";
import ExitIcon from "../icons/exitIcon";
import { InformationIcon } from "../icons/informationIcon";
import DangerPopUp from "../dialog/dangerPopUp";
import WarningPopUp from "../dialog/warningPopUp";
import TextAreaField from "../adminComponents/textAreaField";
import ToolTip from "../tooltip";
import ClockIcon from "../icons/clockIcon";

type RequestedDataProps = {
  organization_id: string;
  organization_name: string;
  admin_email?: string;
  created_at: string;
  admin_id?: string | null;
  has_pending_changes?: boolean;
  has_rejected_changes?: boolean;
};

type OrganizationData = {
  organization_id: string;
  organization_name: string;
  organization_description?: string;
  card_description?: string;
  instagram?: string;
  email?: string;
  linkedin?: string;
  tiktok?: string;
  whatsapp?: string;
  founded_date?: string;
  logo?: string;
};

type OrgDetailChanges = {
  change_id: string;
  organization_id: string;
  field_name: string;
  old_value: string;
  new_value: string;
  change_date: string;
  admin_id: string;
};

type RequestedDataPopUpProps = {
  open: boolean;
  close: () => void;
  approve: (organizationId: string) => void;
  reject: (organizationId: string, feedback: string) => void;
  data: RequestedDataProps | null;
};

export default function RequestedDataPopUp({
  open,
  close,
  approve,
  reject,
  data,
}: RequestedDataPopUpProps) {
  const [title, setTitle] = useState<string>("");
  const [color, setColor] = useState<string>("#ffffff");
  const [description, setDescription] = useState<string>("");
  const [cardDescription, setCardDescription] = useState<string>("");
  const [instagram, setInstagram] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [linkedin, setLinkedin] = useState<string>("");
  const [tiktok, setTiktok] = useState<string>("");
  const [whatsapp, setWhatsapp] = useState<string>("");
  const [foundedDate, setFoundedDate] = useState<string>("");
  const [preview, setPreview] = useState<string>("");
  const [organizationData, setOrganizationData] =
    useState<OrganizationData | null>(null);
  const [orgDetailChanges, setOrgDetailChanges] = useState<OrgDetailChanges[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<string>("");
  const [showFeedbackInput, setShowFeedbackInput] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const [warningPopUp, setWarningPopUp] = useState<boolean>(false);
  const [warningPopUpDescription, setWarningPopUpDescription] =
    useState<string>("");
  const [dangerPopUp, setDangerPopUp] = useState<boolean>(false);

  // State for toggling between previous and requested data
  const [showPreviousData, setShowPreviousData] = useState<boolean>(false);

  // Store both previous and requested data separately
  const [previousData, setPreviousData] = useState({
    title: "",
    description: "",
    cardDescription: "",
    instagram: "",
    email: "",
    linkedin: "",
    tiktok: "",
    whatsapp: "",
    foundedDate: "",
    preview: "",
  });
  const [requestedData, setRequestedData] = useState({
    title: "",
    description: "",
    cardDescription: "",
    instagram: "",
    email: "",
    linkedin: "",
    tiktok: "",
    whatsapp: "",
    foundedDate: "",
    preview: "",
  });

  const tooltipData = [
    ["Data", "Min", "Max"],
    [
      ["Organization Name", "1 Word", "50 Characters"],
      ["Organization Description", "-", "150 Characters"],
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

  const fetchData = useCallback(async () => {
    if (!data) return;

    try {
      const orgResponse = await fetch(
        `/api/organization/${data.organization_id}`
      );
      const orgResult = await orgResponse.json();

      if (orgResponse.ok && orgResult.data) {
        setOrganizationData(orgResult.data);

        const prevData = {
          title: orgResult.data.organization_name || "",
          description: orgResult.data.organization_description || "",
          cardDescription: orgResult.data.card_description || "",
          instagram: orgResult.data.instagram || "",
          email: orgResult.data.email || "",
          linkedin: orgResult.data.linkedin || "",
          tiktok: orgResult.data.tiktok || "",
          whatsapp: orgResult.data.whatsapp || "",
          foundedDate: orgResult.data.founded_date || "",
          preview: orgResult.data.logo || "",
        };
        setPreviousData(prevData);

        // Set as current display
        setTitle(prevData.title);
        setDescription(prevData.description);
        setCardDescription(prevData.cardDescription);
        setInstagram(prevData.instagram);
        setEmail(prevData.email);
        setLinkedin(prevData.linkedin);
        setTiktok(prevData.tiktok);
        setWhatsapp(prevData.whatsapp);
        setFoundedDate(prevData.foundedDate);
        setPreview(prevData.preview);
      }

      // Additionally, check for pending/rejected changes
      const changesResponse = await fetch(
        `/api/organization/${data.organization_id}/changes`
      );
      const changesResult = await changesResponse.json();

      if (
        changesResponse.ok &&
        changesResult.data &&
        changesResult.data.length > 0
      ) {
        setOrgDetailChanges(changesResult.data);

        // Get the latest change record
        const latestChange = changesResult.data[0];

        // Store requested data
        const reqData = {
          title: latestChange.organization_name || previousData.title,
          description: latestChange.short_desc || previousData.description,
          cardDescription:
            latestChange.card_description || previousData.cardDescription,
          instagram: latestChange.instagram_link || previousData.instagram,
          email: latestChange.email || previousData.email,
          linkedin: latestChange.linkedin_link || previousData.linkedin,
          tiktok: latestChange.tiktok_link || previousData.tiktok,
          whatsapp: latestChange.whatsapp || previousData.whatsapp,
          foundedDate: latestChange.founded_date || previousData.foundedDate,
          preview: latestChange.logo_url || previousData.preview,
        };
        setRequestedData(reqData);

        // Display requested data by default
        setTitle(reqData.title);
        setDescription(reqData.description);
        setCardDescription(reqData.cardDescription);
        setInstagram(reqData.instagram);
        setEmail(reqData.email);
        setLinkedin(reqData.linkedin);
        setTiktok(reqData.tiktok);
        setWhatsapp(reqData.whatsapp);
        setFoundedDate(reqData.foundedDate);
        setPreview(reqData.preview);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, [data]);

  useEffect(() => {
    if (open && data) {
      setLoading(true);
      fetchData();
    }
  }, [open, data, fetchData]);

  function resetState() {
    setFeedback("");
    setShowFeedbackInput(false);
    setError("");
  }

  function handleApprove() {
    if (!data) return;
    setLoading(true);
    approve(data.organization_id);
    setLoading(false);
    resetState();
    close();
  }

  function handleReject() {
    if (!data) return;

    if (showFeedbackInput) {
      if (!feedback.trim()) {
        setError("Feedback is required when rejecting");
        return;
      }
      setLoading(true);
      reject(data.organization_id, feedback);
      setLoading(false);
      resetState();
      close();
    } else {
      setShowFeedbackInput(true);
    }
  }

  function handleCancelReject() {
    setShowFeedbackInput(false);
    setFeedback("");
    setError("");
  }

  function handleDangerPopUp() {
    setDangerPopUp(true);
  }

  function handleDelete() {
    resetState();
    close();
  }

  function toggleDataView() {
    setShowPreviousData(!showPreviousData);

    if (!showPreviousData) {
      // Switch to previous data
      setTitle(previousData.title);
      setDescription(previousData.description);
      setCardDescription(previousData.cardDescription);
      setInstagram(previousData.instagram);
      setEmail(previousData.email);
      setLinkedin(previousData.linkedin);
      setTiktok(previousData.tiktok);
      setWhatsapp(previousData.whatsapp);
      setFoundedDate(previousData.foundedDate);
      setPreview(previousData.preview);
    } else {
      // Switch to requested data
      setTitle(requestedData.title);
      setDescription(requestedData.description);
      setCardDescription(requestedData.cardDescription);
      setInstagram(requestedData.instagram);
      setEmail(requestedData.email);
      setLinkedin(requestedData.linkedin);
      setTiktok(requestedData.tiktok);
      setWhatsapp(requestedData.whatsapp);
      setFoundedDate(requestedData.foundedDate);
      setPreview(requestedData.preview);
    }
  }

  if (!open || !data) return null;

  return (
    <section className="overflow-y-auto absolute top-0 left-0 w-full h-full grid grid-cols-12 items-center bg-white/20 backdrop-blur-[4px] py-10">
      <div className="col-span-12 xl:col-start-2 xl:col-end-12 2xl:col-start-3 2xl:col-end-11 rounded-t-[6px] px-2 sm:px-5 xl:px-16 2xl:px-20">
        <div className="flex justify-between items-center border-b border-neutral-300 bg-black px-[24px] py-[10px] rounded-t-[6px]">
          <h1 className="text-sm sm:text-xl md:text-2xl font-semibold">
            Requested Data
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
                  data.has_pending_changes
                    ? "border-orange-400"
                    : data.has_rejected_changes
                    ? "border-red-500"
                    : data.admin_id
                    ? "border-lime-900"
                    : "border-gray-500"
                } py-[10px] px-[16px] rounded-[20px] gap-x-[8px]`}
              >
                {data.has_pending_changes ? (
                  <ClockIcon width={14} height={14} color="#FB923C" />
                ) : data.has_rejected_changes ? (
                  <span className="text-red-500 text-lg">✗</span>
                ) : data.admin_id ? (
                  <ApprovedIcon width={16} height={16} color="#84CC16" />
                ) : (
                  <span className="text-gray-500 text-sm">-</span>
                )}
                <p
                  className={`text-xs font-bold ${
                    data.has_pending_changes
                      ? "text-orange-400"
                      : data.has_rejected_changes
                      ? "text-red-500"
                      : data.admin_id
                      ? "text-lime-500"
                      : "text-gray-500"
                  }`}
                >
                  {data.has_pending_changes
                    ? "Waiting for Approval"
                    : data.has_rejected_changes
                    ? "Rejected"
                    : data.admin_id
                    ? "Approved"
                    : "No Account"}
                </p>
              </div>

              {/* Toggle button - only show when changes exist */}
              {(data.has_pending_changes || data.has_rejected_changes) &&
                orgDetailChanges.length > 0 && (
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
            </div>
            <div className="relative cursor-pointer">
              <InformationIcon width={20} height={20} color="white" />
              <ToolTip tooltipData={tooltipData} />
            </div>
          </div>

          {error && (
            <div className="w-full text-red-500 text-sm p-3 bg-red-500/10 border border-red-500/20 rounded-md">
              {error}
            </div>
          )}

          {loading ? (
            <div className="flex justify-center items-center py-8">
              <h1 className="text-xl lg:text-3xl font-black text-white">
                Loading...
              </h1>
            </div>
          ) : (
            <div className="flex flex-col items-end gap-y-[32px]">
              <ul className="w-full border border-neutral-700 px-[20px] py-[24px] rounded-[8px] space-y-[40px]">
                <li className="grid grid-cols-12 gap-[20px] md:gap-[40px]">
                  <div className="col-span-12 sm:col-span-8 md:col-span-9 flex flex-col gap-y-[6px]">
                    <label className="text-xs sm:text-base font-bold">
                      Organization Name
                    </label>
                    <p className="text-sm sm:text-base text-gray-300 bg-neutral-800 px-3 py-2 rounded">
                      {title || "-"}
                    </p>
                  </div>
                </li>
                <li className="w-full gap-x-[40px]">
                  <div className="relative flex flex-col gap-y-[6px]">
                    <label className="text-xs sm:text-base font-bold">
                      Organization Description
                    </label>
                    <p className="text-sm sm:text-base text-gray-300 bg-neutral-800 px-3 py-2 rounded min-h-[80px]">
                      {description || "-"}
                    </p>
                  </div>
                </li>
                <li className="grid grid-cols-12 gap-[20px]">
                  <div className="col-span-12 lg:col-span-4 flex flex-col gap-y-[6px]">
                    <label className="text-xs sm:text-base font-bold">
                      Instagram
                    </label>
                    <p className="text-sm sm:text-base text-gray-300 bg-neutral-800 px-3 py-2 rounded">
                      {instagram || "-"}
                    </p>
                  </div>
                  <div className="col-span-12 lg:col-span-4 flex flex-col gap-y-[6px]">
                    <label className="text-xs sm:text-base font-bold">
                      Email
                    </label>
                    <p className="text-sm sm:text-base text-gray-300 bg-neutral-800 px-3 py-2 rounded">
                      {email || "-"}
                    </p>
                  </div>
                  <div className="col-span-12 lg:col-span-4 flex flex-col gap-y-[6px]">
                    <label className="text-xs sm:text-base font-bold">
                      Linkedin
                    </label>
                    <p className="text-sm sm:text-base text-gray-300 bg-neutral-800 px-3 py-2 rounded">
                      {linkedin || "-"}
                    </p>
                  </div>
                </li>
                <li className="grid grid-cols-12 gap-[20px]">
                  <div className="col-span-12 lg:col-span-4 flex flex-col gap-y-[6px]">
                    <label className="text-xs sm:text-base font-bold">
                      TikTok
                    </label>
                    <p className="text-sm sm:text-base text-gray-300 bg-neutral-800 px-3 py-2 rounded">
                      {tiktok || "-"}
                    </p>
                  </div>
                  <div className="col-span-12 lg:col-span-4 flex flex-col gap-y-[6px]">
                    <label className="text-xs sm:text-base font-bold">
                      WhatsApp
                    </label>
                    <p className="text-sm sm:text-base text-gray-300 bg-neutral-800 px-3 py-2 rounded">
                      {whatsapp || "-"}
                    </p>
                  </div>
                  <div className="col-span-12 lg:col-span-4 flex flex-col gap-y-[6px]">
                    <label className="text-xs sm:text-base font-bold">
                      Founded Date
                    </label>
                    <p className="text-sm sm:text-base text-gray-300 bg-neutral-800 px-3 py-2 rounded">
                      {foundedDate || "-"}
                    </p>
                  </div>
                </li>
                <li className="w-full gap-x-[40px]">
                  <div className="relative flex flex-col gap-y-[6px]">
                    <label className="text-xs sm:text-base font-bold">
                      Card Description
                    </label>
                    <p className="text-sm sm:text-base text-gray-300 bg-neutral-800 px-3 py-2 rounded min-h-[80px]">
                      {cardDescription || "-"}
                    </p>
                  </div>
                </li>
                <li className="grid grid-cols-12 gap-[20px]">
                  <div className="col-span-12 flex flex-col gap-y-[6px]">
                    <label className="text-xs sm:text-base font-bold">
                      Logo
                    </label>
                    <div className="bg-neutral-800 px-3 py-2 rounded min-h-[100px] flex items-center justify-center">
                      {preview ? (
                        <Image
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
                </li>
              </ul>

              {/* Show feedback input if rejecting */}
              {showFeedbackInput && (
                <div className="w-full border border-neutral-700 px-[20px] py-[24px] rounded-[8px]">
                  <TextAreaField
                    textAreaLabel="Rejection Feedback"
                    textAreaPlaceholder="Please provide feedback for the rejection..."
                    setData={setFeedback}
                    setEditData={() => {}}
                    editData={false}
                    submited={null}
                    data=""
                  />
                </div>
              )}

              {/* Action buttons */}
              <div className="flex gap-x-[20px] justify-end">
                <button
                  onClick={() => {
                    resetState();
                    close();
                  }}
                  className="w-[100px] sm:w-[150px] h-[40px] sm:h-[50px] flex justify-center items-center text-xs sm:text-base text-gray-400 border border-gray-700 px-[24px] py-[14px] rounded-full"
                >
                  Cancel
                </button>

                {showFeedbackInput ? (
                  <>
                    <button
                      onClick={handleCancelReject}
                      disabled={loading}
                      className="w-[100px] sm:w-[150px] h-[40px] sm:h-[50px] flex justify-center items-center text-xs sm:text-base text-gray-400 border border-gray-700 px-[24px] py-[14px] rounded-full"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleReject}
                      disabled={loading || !feedback.trim()}
                      className={`w-[100px] sm:w-[150px] h-[40px] sm:h-[50px] flex justify-center items-center text-xs sm:text-base ${
                        feedback.trim() && !loading
                          ? "cursor-pointer border border-red-500 text-red-500"
                          : "cursor-not-allowed border border-gray-700 text-gray-700"
                      } px-[24px] py-[14px] rounded-full`}
                    >
                      {loading ? "Rejecting..." : "Confirm Reject"}
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={handleReject}
                      disabled={loading || !data.has_pending_changes}
                      className={`w-[100px] sm:w-[150px] h-[40px] sm:h-[50px] flex justify-center items-center text-xs sm:text-base ${
                        data.has_pending_changes && !loading
                          ? "cursor-pointer border border-red-500 text-red-500"
                          : "cursor-not-allowed border border-gray-700 text-gray-700"
                      } px-[24px] py-[14px] rounded-full`}
                    >
                      Reject
                    </button>
                    <button
                      onClick={handleApprove}
                      disabled={loading || !data.has_pending_changes}
                      className={`w-[100px] sm:w-[150px] h-[40px] sm:h-[50px] flex justify-center items-center text-xs sm:text-base ${
                        data.has_pending_changes && !loading
                          ? "cursor-pointer border border-green-500 text-green-500"
                          : "cursor-not-allowed border border-gray-700 text-gray-700"
                      } px-[24px] py-[14px] rounded-full`}
                    >
                      {loading ? "Processing..." : "Approve"}
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
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
