"use client";

import { useState, Fragment } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import XIcon from "./icons/xIcon";

export default function PreviousEventCard() {
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <div
        className="overflow-hidden cursor-pointer select-none flex items-end z-0 relative rounded-lg aspect-square"
        onClick={openModal}
      >
        <div className="absolute -z-10 w-full aspect-square">
          <Image
            src={"/assets/img/prev-event-dummy.png"}
            alt="Event Photo"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 90vw"
          />
        </div>
        <div className="p-6 text-start space-y-3">
          <div className="backdrop-blur-[20px] bg-gradient-to-r from-white/10 to-[#EBEBEB1A] py-1 px-3 rounded-lg">
            <span className="text-transparent text-xs md:text-sm bg-clip-text bg-gradient-to-r from-[#0076C0] to-[#B2EBFF] ">
              March 03, 2024
            </span>
          </div>
          <h3 className="text-xs md:text-2xl font-bold line-clamp-1">
            Judul Event
          </h3>
        </div>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="fixed z-50" onClose={closeModal}>
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50" />
          </TransitionChild>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel className="w-full h-[90dvh] md:w-4/5 md:aspect-video min-h-full">
                  <div className="overflow-hidden select-none flex flex-col justify-between  relative rounded-lg w-full h-full">
                    <div className="absolute -z-10 w-full h-full">
                      <Image
                        src={"/assets/img/prev-event-dummy.png"}
                        alt="Event Photo"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 90vw"
                      />
                    </div>
                    <div className="p-6 z-[52] flex justify-end">
                      <button onClick={closeModal}>
                        <XIcon className="size-10" />
                      </button>
                    </div>
                    <div className="p-6 text-start space-y-3">
                      <div className="backdrop-blur-[20px] w-fit bg-gradient-to-r from-white/10 to-[#EBEBEB1A] py-1 px-3 rounded-lg">
                        <span className="text-transparent text-xs md:text-sm bg-clip-text bg-gradient-to-r from-[#0076C0] to-[#B2EBFF] ">
                          March 03, 2024
                        </span>
                      </div>
                      <h3 className="text-xs md:text-2xl font-bold line-clamp-1">
                        Judul Event
                      </h3>
                    </div>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
