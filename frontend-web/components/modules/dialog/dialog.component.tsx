import { faClose } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Fragment } from "react";
import { WithForcedChildren } from "../../../global/types";
import { Dialog as HeadlessDialog, Transition } from "@headlessui/react";

type Props = WithForcedChildren<{
  onClose: () => void;
  withClose?: boolean;
  open?: boolean;
}>;

export function Dialog({
  onClose,
  children,
  withClose = true,
  open = false,
}: Props): JSX.Element {
  return (
    <Transition appear show={open} as={Fragment}>
      <HeadlessDialog open={open} onClose={onClose}>
        <div className="fixed inset-0 pb-24 overflow-auto flex">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <HeadlessDialog.Overlay className="w-full h-full fixed inset-0 bg-black bg-opacity-50" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="relative p-8 bg-white w-full shadow-md max-w-md m-auto flex-col flex rounded-lg">
              <div>{children}</div>
              {withClose && (
                <span className="absolute top-0 right-0 p-4">
                  <button
                    className="p-2 hover:text-red-500"
                    onClick={() => onClose()}
                  >
                    <FontAwesomeIcon icon={faClose} />
                  </button>
                </span>
              )}
            </div>
          </Transition.Child>
        </div>
      </HeadlessDialog>
    </Transition>
  );
}
