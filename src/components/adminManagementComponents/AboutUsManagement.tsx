"use client";
import { useEffect, useState } from "react";
import { ApprovedIcon } from "../icons/approvedIcon";
import { EyeIcon } from "../icons/eyeIcon";
import InstaIcon from "../icons/instaIcon";
import LinkedinIcon from "../icons/linkedinIcon";
import MailIcon from "../icons/mailIcon";
import TikTokIcon from "../icons/tiktokIcon";
import WhatsappIcon from "../icons/whatsappIcon";
import AddAboutUsPopUp from "../adminPopUpComponents/aboutUsPopUp";
import AboutUsDetailPopUp from "../adminDetailPopUpComponents/aboutUsDetailPopUp";
import SuccessPopUp from "../dialog/sucessPopUp";
import ClockIcon from "../icons/clockIcon";
import { X } from "lucide-react";
import Image from "next/image";
import { useAuthStore } from "@/stores/authStore";

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

type SuccessPopUpProps = {
  title: string;
  message: string;
};

export default function AboutUsManagement() {
  const { user } = useAuthStore();
  const [addAboutUsPopUp, setAddAboutUsPopUp] = useState<boolean>(false);
  const [aboutUsDetailPopUp, setAboutUsDetailPopUp] = useState<boolean>(false);
  const [aboutUsData, setAboutUsData] = useState<AboutUsDataProps | null>(null);
  const [orgDetailChanges, setOrgDetailChanges] =
    useState<OrgDetailChanges | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [status, setStatus] = useState<"approved" | "waiting" | "rejected">(
    "approved"
  );

  const [successPopUp, setSuccessPopUp] = useState<boolean>(false);
  const [successPopUpComponent, setSuccessPopUpComponent] =
    useState<SuccessPopUpProps | null>(null);

  // Fetch organization data
  const fetchOrganizationData = async () => {
    try {
      setLoading(true);
      console.log("🔍 Fetching organization data...");

      // Fetch current organization data
      const orgResponse = await fetch("/api/organization/admin-organization", {
        method: "GET",
        credentials: "include",
      });

      if (!orgResponse.ok) {
        throw new Error("Failed to fetch organization data");
      }

      const orgResult = await orgResponse.json();
      console.log("📊 Organization data:", orgResult);

      if (orgResult.data) {
        const org = orgResult.data;
        setAboutUsData({
          organization_id: org.organization_id,
          name: org.organization_name || "",
          color: org.color || "#ffffff",
          description: org.full_desc || "",
          cardDescription: org.short_desc || "",
          instagram: org.instagram_link || "",
          email: org.email || "",
          linkedin: org.linkedin_link || "",
          tiktok: org.tiktok_link || "",
          whatsapp: org.whatsapp || "",
          foundedDate: org.founded_date || "",
          image: org.logo_url || "",
        });

        // Fetch pending/rejected changes
        const changesResponse = await fetch(
          `/api/organization/${org.organization_id}/changes`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (changesResponse.ok) {
          const changesResult = await changesResponse.json();
          console.log("📋 Changes data:", changesResult);
          console.log("📋 Changes data length:", changesResult.data?.length);

          if (changesResult.data && changesResult.data.length > 0) {
            const latestChange = changesResult.data[0];
            console.log("📋 Latest change:", latestChange);
            console.log("📋 Request status:", latestChange.request_status);
            setOrgDetailChanges(latestChange);

            // Set status based on request_status - prioritize PENDING over REJECTED
            if (latestChange.request_status === "PENDING") {
              console.log("🟠 Setting status to WAITING");
              setStatus("waiting");
            } else if (latestChange.request_status === "REJECTED") {
              console.log("🔴 Setting status to REJECTED");
              setStatus("rejected");
            } else {
              console.log("✅ Setting status to APPROVED (unknown status)");
              setStatus("approved");
            }
          } else {
            // No orgDetailChanges data found - status should be "approved"
            console.log(
              "✅ No changes data found - setting status to APPROVED"
            );
            setOrgDetailChanges(null);
            setStatus("approved");
          }
        } else {
          // If changes API fails, default to approved
          console.log("❌ Changes API failed - setting status to APPROVED");
          setOrgDetailChanges(null);
          setStatus("approved");
        }
      } else {
        setAboutUsData(null);
      }
    } catch (error) {
      console.error("❌ Error fetching organization data:", error);
      setAboutUsData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.role === "admin") {
      fetchOrganizationData();
    }
  }, [user]);

  const handleSubmitAboutUs = async (submittedData: AboutUsDataProps) => {
    try {
      // Submit to API
      const response = await fetch("/api/organization/update-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          organization_name: submittedData.name,
          color: submittedData.color,
          logo_url: submittedData.image,
          short_desc: submittedData.cardDescription,
          full_desc: submittedData.description,
          instagram_link: submittedData.instagram,
          tiktok_link: submittedData.tiktok,
          linkedin_link: submittedData.linkedin,
          email: submittedData.email,
          whatsapp: submittedData.whatsapp,
          founded_date: submittedData.foundedDate,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit update request");
      }

      setSuccessPopUpComponent({
        title: "Update Request Submitted!",
        message:
          "Your organization update request has been submitted for approval",
      });
      setSuccessPopUp(true);

      // Refresh data
      fetchOrganizationData();
    } catch (error) {
      console.error("❌ Error submitting update request:", error);
      alert("Failed to submit update request. Please try again.");
    }
  };

  const handleCancelRequest = async () => {
    try {
      const response = await fetch("/api/organization/cancel-request", {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to cancel request");
      }

      setSuccessPopUpComponent({
        title: "Request Canceled!",
        message: "Your pending update request has been canceled",
      });
      setSuccessPopUp(true);

      // Refresh data
      fetchOrganizationData();
    } catch (error) {
      console.error("❌ Error canceling request:", error);
      alert("Failed to cancel request. Please try again.");
    }
  };

  const showDetail = () => {
    setAboutUsDetailPopUp(true);
  };

  return (
    <>
      {user?.role === "admin" && (
        <>
          <section className="flex justify-between items-center bg-black border border-[#404040] p-[20px] rounded-[12px]">
            <h1 className="text-lg lg:text-2xl font-semibold">
              About Us Management Panel
            </h1>
            <button
              onClick={() => {
                showDetail();
              }}
              disabled={!aboutUsData || loading}
              className={`text-sm lg:text-base p-[16px] rounded-[8px] ${
                !aboutUsData || loading
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-primary cursor-pointer hover:bg-primary-light"
              }`}
            >
              {aboutUsData ? "Edit About Us" : "No Data"}
            </button>
          </section>
          {loading ? (
            <section className="h-full flex justify-center items-center bg-black border border-[#404040] rounded-[20px] py-20">
              <h1 className="text-xl lg:text-2xl font-semibold">Loading...</h1>
            </section>
          ) : aboutUsData ? (
            <section className="h-fit flex flex-col bg-black border border-[#404040] p-[28px] rounded-[20px] space-y-[20px]">
              <div className="flex justify-between items-center">
                <div
                  className={`flex items-center border-[2px] ${
                    status === "approved"
                      ? "border-lime-900"
                      : status === "waiting"
                      ? "border-orange-400"
                      : "border-red-900"
                  } gap-x-[8px] px-[16px] py-[10px] rounded-full`}
                >
                  {status === "approved" ? (
                    <ApprovedIcon width={16} height={16} color="#84CC16" />
                  ) : status === "waiting" ? (
                    <ClockIcon width={14} height={14} color="#FB923C" />
                  ) : (
                    <X size={16} className="text-red-500" />
                  )}
                  <p
                    className={`text-xs font-bold ${
                      status === "approved"
                        ? "text-[#84CC16]"
                        : status === "waiting"
                        ? "text-orange-400"
                        : "text-red-500"
                    }`}
                  >
                    {status === "approved"
                      ? "Approved"
                      : status === "waiting"
                      ? "Waiting for Approval"
                      : "Rejected"}
                  </p>
                </div>
                <div
                  onClick={showDetail}
                  className="cursor-pointer border border-violet-700 p-[8px] rounded-[8px] hover:bg-violet-700/20"
                >
                  <EyeIcon width={24} height={24} color="#6D28D9" />
                </div>
              </div>
              <div className="border border-[#404040] p-[28px] rounded-[8px] space-y-[60px]">
                <div className="space-y-[30px]">
                  {aboutUsData.image && (
                    <Image
                      className="w-[56px] h-[56px] object-contain"
                      src={aboutUsData.image}
                      alt={aboutUsData.name}
                      width={56}
                      height={56}
                    />
                  )}
                  <div>
                    <h3 className="text-xs font-medium text-neutral-500">
                      Organization Name
                    </h3>
                    <p className="text-sm font-bold">{aboutUsData.name}</p>
                  </div>
                  <div>
                    <h3 className="text-xs font-medium text-neutral-500">
                      Description
                    </h3>
                    <p className="text-sm font-normal">
                      {aboutUsData.description}
                    </p>
                  </div>
                  {aboutUsData.cardDescription && (
                    <div>
                      <h3 className="text-xs font-medium text-neutral-500">
                        Card Description
                      </h3>
                      <p className="text-sm font-normal">
                        {aboutUsData.cardDescription}
                      </p>
                    </div>
                  )}
                </div>
                <div className="flex flex-wrap gap-6">
                  {aboutUsData.instagram && (
                    <a
                      className="flex items-center gap-3"
                      href={aboutUsData.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="flex items-center justify-center rounded-full border border-white/20 w-[50px] h-[50px]">
                        <InstaIcon size={25} color="white" />
                      </div>
                      <span className="text-sm">Instagram</span>
                    </a>
                  )}
                  {aboutUsData.email && (
                    <a
                      className="flex items-center gap-3"
                      href={`mailto:${aboutUsData.email}`}
                    >
                      <div className="flex items-center justify-center rounded-full border border-white/20 w-[50px] h-[50px]">
                        <MailIcon size={25} color="white" />
                      </div>
                      <span className="text-sm">{aboutUsData.email}</span>
                    </a>
                  )}
                  {aboutUsData.linkedin && (
                    <a
                      className="flex items-center gap-3"
                      href={aboutUsData.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="flex items-center justify-center rounded-full border border-white/20 w-[50px] h-[50px]">
                        <LinkedinIcon size={25} color="white" />
                      </div>
                      <span className="text-sm">LinkedIn</span>
                    </a>
                  )}
                  {aboutUsData.tiktok && (
                    <a
                      className="flex items-center gap-3"
                      href={aboutUsData.tiktok}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="flex items-center justify-center rounded-full border border-white/20 w-[50px] h-[50px]">
                        <TikTokIcon size={25} color="white" />
                      </div>
                      <span className="text-sm">TikTok</span>
                    </a>
                  )}
                  {aboutUsData.whatsapp && (
                    <a
                      className="flex items-center gap-3"
                      href={`https://wa.me/${aboutUsData.whatsapp.replace(
                        /\D/g,
                        ""
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="flex items-center justify-center rounded-full border border-white/20 w-[50px] h-[50px]">
                        <WhatsappIcon size={25} color="white" />
                      </div>
                      <span className="text-sm">WhatsApp</span>
                    </a>
                  )}
                </div>
              </div>
            </section>
          ) : (
            <section className="h-full flex justify-center items-center bg-black border border-[#404040] rounded-[20px]">
              <h1 className="text-xl lg:text-3xl font-black">NO DATA</h1>
            </section>
          )}
        </>
      )}

      {aboutUsData && (
        <AboutUsDetailPopUp
          open={aboutUsDetailPopUp}
          close={() => setAboutUsDetailPopUp(false)}
          save={handleSubmitAboutUs}
          data={[aboutUsData]}
          index={0}
          hasPendingChanges={status === "waiting" || status === "rejected"}
          cancelRequest={handleCancelRequest}
          orgDetailChanges={orgDetailChanges}
          status={status}
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
