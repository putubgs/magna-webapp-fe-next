"use client";
import { ChevronDown, PencilIcon, Search } from "lucide-react";
import { AdminCalendarIcon } from "../icons/adminCalendarIcon";
import { useEffect, useState } from "react";
import SuccessPopUp from "../dialog/sucessPopUp";
import SuperAdminImpactManagementPopUp from "../superAdminManagementPopUpComponents/superAdminImpactManagementPopUp";
import SuperAdminImpactManagementDetailPopUp from "../superAdminManagementDetailPopUpComponents/superAdminImpactManagementDetailPopUp";

type SuperAdminImpactManagementProps = {
  metric_id?: string;
  metric_type_id?: string;
  metric_name: string;
  metric_value: number;
  display_status?: boolean;
  organization_id?: string;
};

type ImpactDetailProps = {
  impactDetail: SuperAdminImpactManagementProps[];
};

type SuccessPopUpProps = {
  title: string;
  message: string;
};

export default function SuperAdminImpactManagement() {
  const [impactPopUp, setImpactPopUp] = useState<boolean>(false);
  const [
    superAdminImpactManagementDetailPopUp,
    setSuperAdminImpactManagementDetailPopUp,
  ] = useState<boolean>(false);
  const [
    superAdminImpactManagementDetailData,
    setSuperAdminImpactManagementDetailData,
  ] = useState<ImpactDetailProps[] | null>(null);
  const [impactData, setImpactData] = useState<
    SuperAdminImpactManagementProps[] | null
  >(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [successPopUp, setSuccessPopUp] = useState<boolean>(false);
  const [successPopUpComponent, setSuccessPopUpComponent] =
    useState<SuccessPopUpProps | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const metricsRes = await fetch("/api/metricdetails", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!metricsRes.ok) throw new Error(`HTTP ${metricsRes.status}`);
        const metricsJson = await metricsRes.json();
        setImpactData(metricsJson.data || []);
      } catch (err: any) {
        setError(err.message || "Failed to load impact data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  async function handleSubmitImpact(
    metricPayload: SuperAdminImpactManagementProps,
    organization_name: string
  ) {
    try {
      setLoading(true);
      setError(null);
      const { metric_name, ...metricDetailPayload } = metricPayload;

      const metricTypeRes = await fetch("/api/metrictype", {
        method: "POST",
        body: JSON.stringify({ metric_name: metric_name }),
        headers: { "Content-Type": "application/json" },
      });

      if (!metricTypeRes.ok) throw new Error(`HTTP ${metricTypeRes.status}`);
      const metricTypeData = await metricTypeRes.json();
      const newMetricTypeId = metricTypeData.data.metric_type_id;

      const metricDetailRes = await fetch("/api/metricdetails", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...metricDetailPayload,
          metric_type_id: newMetricTypeId,
          organization_name: organization_name,
        }),
      });

      if (!metricDetailRes.ok)
        throw new Error(`HTTP ${metricDetailRes.status}`);
      const metricJson = await metricDetailRes.json();

      setImpactData((prev) =>
        prev ? [...prev, metricJson.data] : [metricJson.data]
      );

      setSuccessPopUpComponent({
        title: "Metric Added!",
        message: "You've successfully added a new metric to the panel",
      });
      setSuccessPopUp(true);
    } catch (err: any) {
      setError(err.message || "Failed to create metric");
    } finally {
      setLoading(false);
    }
  }

  async function handleUpdateImpact(
    updatedDataArray: SuperAdminImpactManagementProps[]
  ) {
    try {
      setLoading(true);
      setError(null);

      const updatePromises = updatedDataArray.map(async (metric) => {
        const { metric_name, ...updatePayload } = metric;
        if (metric.metric_id) {
          const metricTypeRes = await fetch("/api/metrictype", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ metric_name }),
          });
          if (!metricTypeRes.ok)
            throw new Error(`MetricType HTTP ${metricTypeRes.status}`);

          const metricTypeData = await metricTypeRes.json();
          const newMetricTypeId = metricTypeData.data.metric_type_id;

          updatePayload.metric_type_id = newMetricTypeId;
          const res = await fetch(
            `/api/metricdetails/${metric.metric_id}`,
            {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(updatePayload),
            }
          );
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          return res.json();
        }
        return null;
      });

      await Promise.all(updatePromises);
      setImpactData(updatedDataArray);

      setSuccessPopUpComponent({
        title: "Impact Updated!",
        message: "The impact metrics have been successfully updated",
      });
      setSuccessPopUp(true);
    } catch (err: any) {
      setError(err.message || "Failed to update metrics");
    } finally {
      setLoading(false);
    }
  }

  function showDetail() {
    setSuperAdminImpactManagementDetailPopUp(true);

    if (impactData) {
      setSuperAdminImpactManagementDetailData([
        {
          impactDetail: impactData,
        },
      ]);
    }
  }

  return (
    <>
      <section className="bg-black border border-[#404040] p-[20px] rounded-[12px] space-y-[24px]">
        <section className="flex justify-between items-center">
          <h1 className="text-lg lg:text-2xl font-semibold">
            Impact Management Panel
          </h1>
          <button
            onClick={() => setImpactPopUp(true)}
            className="cursor-pointer bg-primary text-sm lg:text-base p-[16px] rounded-[8px]"
          >
            Add Impact +
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
      </section>
      <section className="overflow-scroll xl:overflow-auto h-full bg-black flex flex-col border border-[#404040] p-[28px] rounded-[20px] gap-[28px]">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Impact</h1>
          {impactData && impactData.length > 0 && (
            <div className="flex p-[8px] rounded-[8px] gap-x-[16px]">
              <div
                onClick={() => showDetail()}
                className="cursor-pointer w-[34px] h-[34px] flex justify-center items-center border border-[#FF8800] p-[8px] rounded-[8px]"
              >
                <PencilIcon width={18} height={18} color="#FF8800" />
              </div>
            </div>
          )}
        </div>
        {impactData && impactData.length > 0 ? (
          <div className="border border-[#404040] p-[28px] rounded-[8px] overflow-x-auto">
            <table className="table-auto text-white text-base">
              <tbody>
                {impactData.map(
                  (data, index) =>
                    data.display_status && (
                      <tr key={index} className="align-top">
                        <td className="text-neutral-500 py-2">
                          {data.metric_name}
                        </td>
                        <td className="text-neutral-500 pl-5 pr-3 py-2">:</td>
                        <td className="py-2 font-bold whitespace-nowrap">
                          {data.metric_value > 9999
                            ? Math.floor(data.metric_value / 1000) + "K"
                            : data.metric_value > 999
                            ? (data.metric_value / 1000).toFixed(1) + "K"
                            : data.metric_value}
                        </td>
                      </tr>
                    )
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="h-full flex justify-center items-center">
            <h1 className="text-xl lg:text-3xl font-black">NO DATA</h1>
          </div>
        )}
      </section>

      <SuperAdminImpactManagementPopUp
        open={impactPopUp}
        close={() => setImpactPopUp(false)}
        save={handleSubmitImpact}
      />

      {superAdminImpactManagementDetailData && (
        <SuperAdminImpactManagementDetailPopUp
          open={superAdminImpactManagementDetailPopUp}
          close={() => setSuperAdminImpactManagementDetailPopUp(false)}
          save={handleUpdateImpact}
          data={superAdminImpactManagementDetailData}
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
