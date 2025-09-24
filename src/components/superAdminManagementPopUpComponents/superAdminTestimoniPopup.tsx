import { FormEvent, useState } from "react";
import ExitIcon from "../icons/exitIcon";
import { InformationIcon } from "../icons/informationIcon";
import DangerPopUp from "../dialog/dangerPopUp";
import InputField from "../adminComponents/inputField";
import TextAreaField from "../adminComponents/textAreaField";
import DeleteAndSaveButtonForAdd from "../adminComponents/deleteAndSaveButton";
import Tooltip from "../tooltip";
import { Backdrop } from "../backdrop";
import OrganizationDropdown from "../organizationDropdown";

type TestimoniProps = {
  name: string;
  position: string;
  testimoni: string;
  organization: string;
  date: string;
};

type TestimoniPopUpProps = {
  open: boolean;
  close: () => void;
  save: (testimoniData: TestimoniProps) => void;
};

export default function SuperAdminTestimoniPopUp({
  open,
  close,
  save,
}: TestimoniPopUpProps) {
  const date = new Date();
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  };
  const formattedDate = date.toLocaleDateString("en-GB", options);
  const [name, setName] = useState<string>("");
  const [position, setPosition] = useState<string>("");
  const [testimoni, setTestimoni] = useState<string>("");
  const formComplete = name && position && testimoni;
  const [submited, setSubmited] = useState<string | null>(null);
  const [editName, setEditName] = useState<boolean>(false);
  const [editPosition, setEditPosition] = useState<boolean>(false);
  const [editTestimoni, setEditTestimoni] = useState<boolean>(false);
  const [organization, setOrganization] = useState<string>("");
  const [editOrganization, setEditOrganization] = useState<boolean>(false);

  const [dangerPopUp, setDangerPopUp] = useState<boolean>(false);

  const tooltipData = [
    ["Data", "Min", "Max"],
    [
      ["Name", "-", "-"],
      ["Position/instution", "-", "-"],
      ["Testimoni", "-", "300 characters"],
    ],
  ];

  const tooltipGuide = [
    "Each organization must display a minimum of 3 and maximum of 6 testimonials.",
  ];

  function resetForm() {
    setName("");
    setPosition("");
    setTestimoni("");
    setSubmited(null);
    setEditName(false);
    setEditPosition(false);
    setEditTestimoni(false);
    setOrganization("");
    setEditOrganization(false);
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (submited == null) {
      setSubmited("submit");
      setEditName(true);
      setEditPosition(true);
      setEditTestimoni(true);
      setEditOrganization(true);
    } else if (submited == "submit") {
      const testimoniData: TestimoniProps = {
        name,
        position,
        testimoni,
        organization,
        date: formattedDate,
      };

      save(testimoniData);
      resetForm();
      close();
    }
  }

  function handleDelete() {
    resetForm();
    close();
  }

  if (!open) return null;

  return (
    <section className="overflow-y-auto absolute top-0 left-0 w-full h-full grid grid-cols-12 items-center bg-white/20 backdrop-blur-[4px] py-10">
      <div className="col-span-12 xl:col-start-2 xl:col-end-12 2xl:col-start-3 2xl:col-end-11 rounded-t-[6px] px-2 sm:px-5 xl:px-28">
        <div className="relative">
          <div className="flex justify-between items-center border-b border-neutral-300 bg-black px-[24px] py-[10px] rounded-t-[6px]">
            <h1 className="text-xs sm:text-xl md:text-2xl font-semibold">
              Testimoni
            </h1>
            <div
              onClick={() =>
                name || position || testimoni || organization
                  ? setDangerPopUp(true)
                  : close()
              }
              className="cursor-pointer border border-white rounded-[4px] p-2"
            >
              <ExitIcon size={13} />
            </div>
          </div>
          <div className="bg-neutral-900 flex flex-col items-end px-5 sm:px-[36px] py-[24px] space-y-[20px] sm:space-y-[32px]">
            <div className="cursor-pointer group">
              <Backdrop className="z-1 bg-white/10 group-hover:opacity-95 duration-300" />
              <div className="relative z-2">
                <InformationIcon width={20} height={20} color="white" />
                <Tooltip
                  tooltipGuide={tooltipGuide}
                  tooltipData={tooltipData}
                  className="group-hover:opacity-100 duration-300 pointer-events-none"
                />
              </div>
            </div>
            <form
              onSubmit={handleSubmit}
              className="w-full flex flex-col items-end gap-y-[32px]"
            >
              <ul className="w-full border border-neutral-700 px-[20px] py-[24px] rounded-[8px] space-y-[20px] sm:space-y-[40px]">
                <li className="gap-x-[40px]">
                  <div className="relative w-full flex flex-col gap-y-[6px]">
                    <OrganizationDropdown
                      setEditData={setEditOrganization}
                      editData={editOrganization}
                      submited={`${submited}`}
                      organization={organization}
                      setOrganization={setOrganization}
                    />
                  </div>
                </li>
                <li className="w-full flex flex-col sm:flex-row gap-[20px] sm:gap-[40px]">
                  <div className="relative w-full sm:w-[50%] flex flex-col gap-y-[6px]">
                    <InputField
                      inputLabel="Name"
                      inputPlaceholder="Nama Event"
                      setData={setName}
                      setEditData={setEditName}
                      editData={editName}
                      submited={`${submited}`}
                    />
                  </div>
                  <div className="relative w-full sm:w-[50%] flex flex-col gap-y-[6px]">
                    <InputField
                      inputLabel="Origin"
                      inputPlaceholder="Origin"
                      setData={setPosition}
                      setEditData={setEditPosition}
                      editData={editPosition}
                      submited={`${submited}`}
                    />
                  </div>
                </li>
                <li className="gap-x-[40px]">
                  <div className="relative flex flex-col gap-y-[6px]">
                    <TextAreaField
                      textAreaLabel="Testimoni"
                      textAreaPlaceholder="Testimoni"
                      setData={setTestimoni}
                      setEditData={setEditTestimoni}
                      editData={editTestimoni}
                      submited={`${submited}`}
                    />
                  </div>
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
