import { useEffect, useState } from "react";
import { LeftChevronIcon } from "../icons/leftChevronIcon";
import { PencilIcon } from "../icons/pencilIcon";
import DangerPopUp from "../dialog/dangerPopUp";
import SuccessPopUp from "../dialog/sucessPopUp";
import { AdminCalendarIcon } from "../icons/adminCalendarIcon";
import { ChevronDown, Search } from "lucide-react";
import SuperAdminTestimoniPopUp from "../superAdminManagementPopUpComponents/superAdminTestimoniPopup";
import SuperAdminTestimoniDetailPopUp from "../superAdminManagementDetailPopUpComponents/superAdminTestimoniDetailPopUp";

type TestimoniProps = {
  testimony_id?: string;
  participant_name: string;
  position: string;
  message: string;
  organization_id?: string;
  testimony_date?: string;
};

type SuccessPopUpProps = {
  title: string;
  message: string;
};

export default function SuperAdminTestimoniManagement() {
  const [testimoniPopUp, setTestimoniPopUp] = useState<boolean>(false);
  const [testimoniDetailPopUp, setTestimoniDetailPopUp] =
    useState<boolean>(false);
  const [index, setIndex] = useState<number>(-1);
  const [testimoniDetailData, setTestimoniDetailData] = useState<
    TestimoniProps[] | null
  >(null);
  const [superAdminTestimoniData, setTestimoniData] = useState<
    TestimoniProps[] | null
  >(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [dangerPopUp, setDangerPopUp] = useState<boolean>(false);
  const [successPopUp, setSuccessPopUp] = useState<boolean>(false);
  const [successPopUpComponent, setSuccessPopUpComponent] =
    useState<SuccessPopUpProps | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`/api/testimony`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        setTestimoniData(json.data || null);
      } catch (err: any) {
        setError(err.message || "Failed to load testimonies");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  async function handleSubmitTestimoni(testimoniPayload: TestimoniProps) {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`/api/testimony`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(testimoniPayload),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const json = await res.json();

      setTestimoniData((prev) => (prev ? [...prev, json.data] : [json.data]));

      setSuccessPopUpComponent({
        title: "Testimoni Added!",
        message: "You've successfully added a new testimoni to the panel",
      });
      setSuccessPopUp(true);
    } catch (err: any) {
      setError(err.message || "Failed to create testimony");
    } finally {
      setLoading(false);
    }
  }

  async function handleUpdateTestimoni(updatedData: TestimoniProps, index: number) {
    try {
      setLoading(true);
      setError(null);

      const id = updatedData.testimony_id;
      if (!id) throw new Error("Missing testimony id");
      console.log(id);

      const res = await fetch(`/api/testimony/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const json = await res.json();

      setTestimoniData((prev) => {
        if (!prev) return prev;
        const newData = [...prev];
        newData[index] = json.data;
        return newData;
      });

      setSuccessPopUpComponent({
        title: "Testimoni Updated!",
        message: "The testimoni have been successfully updated",
      });
      setSuccessPopUp(true);
    } catch (err: any) {
      setError(err.message || "Failed to update testimony");
    } finally {
      setLoading(false);
    }
  }

  async function handleDeleteTestimoni() {
    try {
      setLoading(true);
      setError(null);

      const item = superAdminTestimoniData && superAdminTestimoniData[index];
      const id = item?.testimony_id;
      if (!id) throw new Error("Missing testimony id");

      const res = await fetch(`/api/testimony/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      setTestimoniData((prev) => {
        if (!prev) return null;
        const result = prev.filter((_, i) => i !== index);
        return result.length > 0 ? result : null;
      });

      setSuccessPopUpComponent({
        title: "Testimoni Deleted!",
        message: "The testimoni has been successfully deleted",
      });
      setSuccessPopUp(true);
    } catch (err: any) {
      setError(err.message || "Failed to delete testimony");
    } finally {
      setLoading(false);
    }
  }

  function showDetail(index: number) {
    setIndex(index);
    setTestimoniDetailPopUp(true);

    if (superAdminTestimoniData && superAdminTestimoniData[index]) {
      setTestimoniDetailData([
        {
          testimony_id: superAdminTestimoniData[index].testimony_id,
          participant_name: superAdminTestimoniData[index].participant_name,
          position: superAdminTestimoniData[index].position,
          message: superAdminTestimoniData[index].message,
          organization_id: superAdminTestimoniData[index].organization_id,
          testimony_date: superAdminTestimoniData[index].testimony_date,
        },
      ]);
    }
  }

  return (
    <>
      <section className="bg-black border border-[#404040] p-[20px] rounded-[12px] space-y-[24px]">
        <section className="flex justify-between items-center bg-black">
          <h1 className="text-lg lg:text-2xl font-semibold">
            Testimonial Management Panel
          </h1>
          <button
            onClick={() => {
              setTestimoniPopUp(true);
            }}
            className="cursor-pointer bg-primary text-sm lg:text-base p-[16px] rounded-[8px] disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Loading..." : "Add Testimoni +"}
          </button>
        </section>
        <section className="grid grid-cols-12 gap-x-[20px]">
          <div className="col-span-9 flex items-center bg-neutral-800 gap-[10px] p-[12px] rounded-[8px]">
            <Search />
            <input
              className="w-full h-full text-white placeholder-white outline-none"
              type="text"
              placeholder="Search"
            />
          </div>
          <div className="col-span-1 bg-neutral-800 flex justify-center items-center gap-x-[10px] rounded-[8px]">
            <p>Date</p>
            <AdminCalendarIcon className="w-5 h-5" color="#fff" />
          </div>
          <div className="col-span-2 bg-neutral-800 flex justify-center items-center gap-x-[10px] rounded-[8px]">
            <p>Organization</p>
            <ChevronDown />
          </div>
        </section>
        {error && (
          <div className="bg-red-900/20 border border-red-500 text-red-300 p-3 rounded-lg">
            <p className="text-sm">Error: {error}</p>
            <button
              onClick={() => setError(null)}
              className="mt-1 text-xs underline hover:no-underline"
            >
              Dismiss
            </button>
          </div>
        )}
      </section>
      <section className="overflow-scroll xl:overflow-auto h-[500px] bg-black flex flex-col justify-start border border-[#404040] rounded-[20px] p-4">
        <table className="table-fixed w-full text-white">
          <thead>
            <tr className="border-b border-[#D4D4D4] text-left">
              <th className="text-base lg:text-lg font-bold py-3 px-4 w-[100px]">
                No
              </th>
              <th className="text-base lg:text-lg font-bold py-3 px-4 w-[200px]">
                Date
              </th>
              <th className="text-base lg:text-lg font-bold py-3 px-4 w-[260px]">
                BU Name
              </th>
              <th className="text-base lg:text-lg font-bold py-3 px-4 w-[350px]">
                Event Name
              </th>
              <th className="text-base text-center lg:text-lg font-bold py-3 px-4 w-[200px]">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="relative">
            {superAdminTestimoniData && superAdminTestimoniData.length > 0 ? (
              superAdminTestimoniData.map((data, index) => (
                <tr key={index} className="align-top border-b border-[#D4D4D4]">
                  <td className="py-6 px-4 text-sm font-medium">{index + 1}</td>
                  <td className="py-6 px-4 text-sm font-medium">{data.testimony_date || 'N/A'}</td>
                  <td className="py-6 px-4 text-base font-normal">
                    {data.organization_id || 'N/A'}
                  </td>
                  <td className="py-6 px-4 text-base font-normal">
                    {data.participant_name}
                  </td>
                  <td className="py-6 px-4">
                    <div className="flex w-full justify-center gap-4">
                      <div
                        onClick={() => showDetail(index)}
                        className="cursor-pointer w-[36px] h-[36px] flex justify-center items-center border border-[#FF8800] rounded-md"
                      >
                        <PencilIcon width={18} height={18} color="#FF8800" />
                      </div>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="h-[250px]">
                <td colSpan={5}>
                  <div className="flex flex-col justify-center items-center text-white">
                    <h1 className="text-xl lg:text-3xl font-black">NO DATA</h1>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div
          className={`mt-3 w-[1000px] xl:w-full ${
            superAdminTestimoniData && superAdminTestimoniData.length > 0
              ? "flex"
              : "hidden"
          } justify-end items-center gap-2`}
        >
          <button className="h-full bg-[#1c1c1c] text-white px-3 py-1 rounded-md border border-white/20">
            <LeftChevronIcon width={23} height={23} color="white" />
          </button>
          <div className="bg-[#1c1c1c] text-white px-3 py-1 rounded-md border border-white/20 appearance-none">
            <select className="bg-none p-0">
              <option className="bg-none p-0">1</option>
            </select>
          </div>
          <p className="text-white">of 1</p>
          <button className="h-full bg-[#1c1c1c] text-white px-3 py-1 rounded-md border border-white/20 rotate-180">
            <LeftChevronIcon width={23} height={23} color="white" />
          </button>
        </div>
      </section>

      <SuperAdminTestimoniPopUp
        open={testimoniPopUp}
        close={() => setTestimoniPopUp(false)}
        save={handleSubmitTestimoni}
      />

      {testimoniDetailData && (
        <SuperAdminTestimoniDetailPopUp
          open={testimoniDetailPopUp}
          close={() => setTestimoniDetailPopUp(false)}
          save={handleUpdateTestimoni}
          delete={handleDeleteTestimoni}
          data={testimoniDetailData}
          index={index}
        />
      )}

      <DangerPopUp
        open={dangerPopUp}
        close={() => setDangerPopUp(false)}
        onConfirm={handleDeleteTestimoni}
        title="Delete"
        message="Are you sure you want to delete this?"
      />

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
