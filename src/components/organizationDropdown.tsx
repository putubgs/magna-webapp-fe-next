import { ChevronDown, PencilIcon } from "lucide-react";
import { useState } from "react";

const organizations = [
  "Career Compas",
  "Tech Fusion",
  "Competition Realms",
  "Link to Work",
  "SisuLab",
  "VirtualXplore",
  "College Copilot",
];

type OrganizationDropdownProps = {
  organization: string;
  setOrganization: (value: string) => void;
  setEditData: (value: boolean) => void;
  editData: boolean;
  submited: string | null;
  data?: string;
};

export default function OrganizationDropdown({
  organization,
  setOrganization,
  setEditData,
  editData,
  submited,
  data,
}: OrganizationDropdownProps) {
  const [open, setOpen] = useState(false);

  const handleSelect = (org: string) => {
    setOrganization(org);
    setOpen(false);
  };

  return (
    <div className="relative block w-full text-white">
      <p className="text-xs sm:text-base font-bold">Organization</p>
      <div className="relative flex justify-end items-center">
        <button
          type="button"
          disabled={editData}
          onClick={() => !editData && setOpen(!open)}
          className={`w-full mt-1 border text-left px-4 py-2 rounded-md flex justify-between items-center ${
            editData ? "bg-neutral-800 border-transparent" : "bg-transparent border-neutral-500"
          } ${organization ? "text-white" : "text-neutral-500"}`}
        >
          {organization || data || "Select Organization"}
          <ChevronDown
            className={`w-5 h-5 transition-transform duration-200 ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>

        {(submited == null || submited === "submit") && (
          <div
            onClick={() => setEditData(!editData)}
            className="cursor-pointer absolute right-1 sm:right-2 bottom-1 sm:bottom-2 flex items-center bg-neutral-700 gap-x-[5px] sm:gap-x-[10px] px-[8px] py-[5px] rounded-[8px]"
          >
            <p className="text-xs text-neutral-400">Edit</p>
            <PencilIcon width={14} height={14} color="#A3A3A3" />
          </div>
        )}
      </div>

      {open && !editData && (
        <ul className="absolute z-10 mt-1 w-full bg-neutral-900 border border-neutral-500 rounded-md shadow-lg max-h-60 overflow-auto">
          {organizations.map((org, index) => (
            <li
              key={index}
              onClick={() => handleSelect(org)}
              className="cursor-pointer px-4 py-2 hover:bg-white hover:text-black"
            >
              {org}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
