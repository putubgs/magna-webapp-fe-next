import React from "react";
import { Icon } from "@iconify/react";

interface ForgotPassPopUpProps {
  title: string;
  description: string;
  isSuccess: boolean;
  closePopUp: () => void;
}

function ForgotPassPopUp({
  title,
  description,
  isSuccess,
  closePopUp,
}: ForgotPassPopUpProps) {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-white/20 z-50">
      <div className="rounded-2xl bg-neutral-800 flex flex-col py-4 gap-4">
        <div className="flex flex-row px-4 gap-4">
          <div
            className={`flex justify-center items-center ${
              isSuccess ? "bg-green-100" : "bg-red-100"
            } p-2 rounded-full h-fit`}
          >
            {isSuccess ? (
              <Icon
                icon="material-symbols:check"
                color="green"
                width={"24px"}
                height={"24px"}
              />
            ) : (
              <Icon
                width={"24px"}
                height={"24px"}
                icon="material-symbols:close"
                color="red"
              />
            )}
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex flex-row justify-between">
              <h2 className="font-bold text-2xl text-white">{title}</h2>
              <Icon
                className="cursor-pointer"
                icon="material-symbols:close"
                color="#999CA0"
                onClick={closePopUp}
                width={"24px"}
                height={"24px"}
              />
            </div>
            <p className="text-white font-normal text-base max-w-[450px]">
              {description}
            </p>
          </div>
        </div>
        <span className="w-full h-[1px] bg-[#EBEBEB] mt-4"></span>
        <div className="flex flex-row justify-end px-4">
          <button
            className="bg-[#270081] p-2 rounded-lg text-white text-sm font-medium"
            onClick={closePopUp}
          >
            Ok
          </button>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassPopUp;
