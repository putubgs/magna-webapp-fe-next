"use client";
import { useSearchParams, useRouter } from "next/navigation";
import AdminSideBar from "@/components/adminSidebar";
import EventManagement from "@/components/adminManagementComponents/EventManagement";
import AboutUsManagement from "@/components/adminManagementComponents/AboutUsManagement";
import ImpactManagement from "@/components/adminManagementComponents/ImpactManagement";
import PartnershipManagement from "@/components/adminManagementComponents/PartnershipManagement";
import TestimoniManagement from "@/components/adminManagementComponents/TestimoniManagement";
import GalleryManagement from "@/components/adminManagementComponents/GalleryManagement";
import { DoubleArrowIcon } from "@/components/icons/doubleArrowIcon";
import { RightArrowIcon } from "@/components/icons/rightArrowIcon";
import { useEffect, useState, Suspense, useRef } from "react";
import { HelpCircle } from "lucide-react";
import SuperAdmin from "@/components/superAdminManagementComponents/SuperAdmin";
import SuperAdminPartnershipManagement from "@/components/superAdminManagementComponents/SuperAdminPartnershipManagement";
import SuperAdminGalleryManagement from "@/components/superAdminManagementComponents/SuperAdminGalleryManagement";
import Image from "next/image";
import { useAuthStore } from "@/stores/authStore";
import ChangePasswordPopUp from "@/components/dialog/changePasswordPopUp";

function AdminContent() {
  const searchParams = useSearchParams();
  const panel = searchParams.get("panel");
  const router = useRouter();

  const {
    user,
    isLoading,
    signOut,
    initialize,
    verifyAuthWithServer,
    updateIsNewAccount,
  } = useAuthStore();

  const [responsiveSidebar, setResponsiveSidebar] = useState<boolean>(false);
  const [showChangePasswordPopup, setShowChangePasswordPopup] =
    useState<boolean>(false);
  const [showLogoutText, setShowLogoutText] = useState<boolean>(
    !responsiveSidebar
  );
  const [showMinimizeText, setShowMinimizeText] = useState<boolean>(
    !responsiveSidebar
  );
  const [organizationName, setOrganizationName] = useState<string>("");
  const [organizationLogo, setOrganizationLogo] = useState<string>("");
  const [adminEmail, setAdminEmail] = useState<string>("");
  const [isLoadingOrg, setIsLoadingOrg] = useState<boolean>(false);
  const hasLoadedOrg = useRef<boolean>(false);

  const hasCheckedNewAccount = useRef<boolean>(false);

  function handleMobileResponsive() {
    return responsiveSidebar
      ? setResponsiveSidebar(false)
      : setResponsiveSidebar(true);
  }

  useEffect(() => {
    let delay: ReturnType<typeof setTimeout>;

    if (responsiveSidebar) {
      setShowLogoutText(false);
      setShowMinimizeText(false);
    } else {
      delay = setTimeout(() => {
        setShowLogoutText(true);
        setShowMinimizeText(true);
      }, 100);
    }

    return () => clearTimeout(delay);
  }, [responsiveSidebar]);

  useEffect(() => {
    // Initialize auth state with routing protection
    initialize(true, router);

    // Verify authentication with server immediately on mount
    verifyAuthWithServer(router);

    // Set up periodic authentication check (every 5 minutes)
    const authCheckInterval = setInterval(() => {
      verifyAuthWithServer(router);
    }, 5 * 60 * 1000); // 5 minutes

    // Listen for API errors that might indicate expired token
    const handleUnauthorized = (event: Event) => {
      const customEvent = event as CustomEvent;
      if (customEvent.detail?.status === 401) {
        signOut(router);
      }
    };

    window.addEventListener("api-unauthorized", handleUnauthorized);

    return () => {
      clearInterval(authCheckInterval);
      window.removeEventListener("api-unauthorized", handleUnauthorized);
    };
  }, [router, initialize, verifyAuthWithServer, signOut]);

  // Fetch organization data for the admin (before mounting)
  useEffect(() => {
    async function fetchOrganizationData() {
      if (!user?.id || hasLoadedOrg.current) {
        if (!user?.id) {
          console.log("Waiting for user data...");
        }
        return;
      }

      setIsLoadingOrg(true);
      hasLoadedOrg.current = true;

      try {
        // Set admin email from auth store immediately
        setAdminEmail(user.email || "");

        // Fetch organization for the current admin
        const orgResponse = await fetch(`/api/organization/admin-organization`);

        if (!orgResponse.ok) {
          console.error(`Failed to fetch organization: ${orgResponse.status}`);
          setOrganizationName("Anonymous Organization");
          setOrganizationLogo("");
          return;
        }

        const orgData = await orgResponse.json();

        if (orgData.data) {
          setOrganizationName(
            orgData.data.organization_name || "Anonymous Organization"
          );
          setOrganizationLogo(orgData.data.logo || "");
        } else {
          setOrganizationName("Anonymous Organization");
          setOrganizationLogo("");
        }
      } catch (error) {
        console.error("Error fetching organization data:", error);
        setOrganizationName("Anonymous Organization");
        setOrganizationLogo("");
      } finally {
        setIsLoadingOrg(false);
      }
    }

    fetchOrganizationData();
  }, [user?.id, user?.email]);

  // Check if user is new and show change password popup (only once per session)
  useEffect(() => {
    async function checkNewAccountStatus() {
      // Only check once when user is available and we haven't checked yet
      if (!user?.id || hasCheckedNewAccount.current) return;

      // Mark as checked to prevent multiple calls
      hasCheckedNewAccount.current = true;

      try {
        // Fetch fresh is_new_account status from database
        const response = await fetch("/api/auth/check-new-account");
        const data = await response.json();

        if (response.ok) {
          updateIsNewAccount(data.is_new_account);

          if (data.is_new_account) {
            setShowChangePasswordPopup(true);
          } else {
            setShowChangePasswordPopup(false);
          }
        }
      } catch (error) {
        console.error("Error checking new account status:", error);
        hasCheckedNewAccount.current = false;
      }
    }

    checkNewAccountStatus();
  }, [user?.id, updateIsNewAccount]);

  if (
    isLoading ||
    (user?.id && isLoadingOrg) ||
    (user?.id && !organizationName && !hasLoadedOrg.current)
  ) {
    return <LoadingAdmin />;
  }

  return (
    <section className="h-screen flex flex-col overflow-hidden">
      <header className="fixed w-full bg-black flex justify-between items-center p-[20px] px-[40px]">
        <section>
          <a className="flex items-center space-x-4 cursor-pointer" href="/">
            <Image
              src="/assets/logo/business-units/Magna.png"
              alt="Magna Logo"
              width={30}
              height={56}
            />
            <div className="text-base lg:text-[24px] font-extrabold">
              Magna Partners
            </div>
          </a>
        </section>
        <section className="flex items-center gap-[15px] md:gap-[30px]">
          <div className="space-y-[6px] text-end">
            <h3 className="text-base lg:text-xl font-semibold">
              {organizationName || "Checking..."}
            </h3>
            <p className="text-sm">{adminEmail || user?.email || ""}</p>
          </div>
          {organizationLogo ? (
            <Image
              className="w-[56px] h-[56px] object-contain rounded-lg"
              src={organizationLogo}
              alt={organizationName}
              width={200}
              height={200}
            />
          ) : (
            <div className="relative w-[56px] h-[56px] bg-black hover:bg-gray-900 border border-gray-700 rounded-lg flex items-center justify-center transition-colors group">
              <HelpCircle
                size={28}
                className="text-gray-500 group-hover:text-gray-400 transition-colors"
              />
            </div>
          )}
        </section>
      </header>
      <section className={`h-full flex bg-[#0B0D12]`}>
        <aside
          className={`transition-all ease-in-out duration-300 ${
            responsiveSidebar ? "w-[100px]" : "w-[400px]"
          } py-[40px] h-full bg-black flex flex-col justify-between p-[20px]`}
        >
          <div className="flex flex-col justify-between gap-20">
            <div></div>
            <ul className="space-y-[20px]">
              <li
                onClick={handleMobileResponsive}
                className="flex justify-center items-center text-[#737373] text-sm md:text-base gap-[10px] md:gap-[20px] py-[10px] cursor-pointer"
              >
                {showMinimizeText && "Minimize Sidebar"}
                {!responsiveSidebar ? (
                  <DoubleArrowIcon className="w-6 lg:w-7" />
                ) : (
                  <div className="rotate-180">
                    <DoubleArrowIcon className="w-6 lg:w-7" />
                  </div>
                )}
              </li>
              <AdminSideBar responsiveSidebar={responsiveSidebar} />
            </ul>
          </div>
          <div className="flex justify-center">
            <button
              onClick={() => signOut(router)}
              className={`flex items-center text-base lg:text-xl font-normal ${
                !responsiveSidebar && "border-[2px] border-[#404040]"
              }  rounded-full px-[30px] lg:px-[60px] py-[8px] lg:py-[12px] gap-[10px] cursor-pointer hover:bg-gray-800 transition-colors`}
            >
              {showLogoutText && "Logout"}
              <div className="flex justify-center items-center border border-full rounded-full w-[36px] h-[36px]">
                <RightArrowIcon className="w-3 lg:w-5" fill="white" />
              </div>
            </button>
          </div>
        </aside>
        <main
          className={`w-full overflow-y-auto ${
            responsiveSidebar ? "col-span-11 w-full" : "col-span-10"
          } flex flex-col gap-[20px] px-[20px] pt-28 pb-5`}
        >
          {panel == "admin-manage" && user?.role === "super-admin" && (
            <SuperAdmin />
          )}
          {panel == "about-us" && <AboutUsManagement />}
          {panel == "event" && <EventManagement />}
          {panel == "impact" && <ImpactManagement />}
          {panel == "partnership" &&
            (user?.role === "super-admin" ? (
              <SuperAdminPartnershipManagement />
            ) : user?.role === "admin" ? (
              <PartnershipManagement />
            ) : null)}
          {panel == "testimoni" && <TestimoniManagement />}
          {panel == "gallery" &&
            (user?.role === "super-admin" ? (
              <SuperAdminGalleryManagement />
            ) : user?.role === "admin" ? (
              <GalleryManagement />
            ) : null)}
        </main>
      </section>

      <ChangePasswordPopUp
        open={showChangePasswordPopup}
        close={() => {
          setShowChangePasswordPopup(false);
          updateIsNewAccount(false);
        }}
        isNewAccount={user?.is_new_account || false}
      />
    </section>
  );
}

function LoadingAdmin() {
  return (
    <div className="h-screen flex items-center justify-center bg-[#0B0D12]">
      <div className="text-white text-xl">Loading...</div>
    </div>
  );
}

export default function Admin() {
  return (
    <Suspense fallback={<LoadingAdmin />}>
      <AdminContent />
    </Suspense>
  );
}
