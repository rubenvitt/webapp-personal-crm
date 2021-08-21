import { faSpinner } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Transition } from "@headlessui/react";
import React, { Fragment, useRef, useState } from "react";
import { ActionType } from "../../../../global/interfaces";
import { MaybeAsyncAction, WithForcedChildren } from "../../../../global/types";
import { classNames } from "../../../../global/utils";
import { Button } from "../../../elements/common/button.component";

type Props = WithForcedChildren<{
  cancel?: {
    label?: string;
    action: MaybeAsyncAction;
  };
  save?: {
    label?: string;
    action: MaybeAsyncAction;
  };
  className?: string;
}>;

export function FormLayout({
  children,
  cancel,
  save,
  className,
}: Props): JSX.Element {
  const [isLoading, setLoading] = useState(false);
  const form = useRef<HTMLFormElement>();
  return (
    <form
      ref={form}
      className={classNames(className, "space-y-6")}
      onSubmit={async (event) => {
        event.preventDefault();
        if (!isLoading && form.current.checkValidity()) {
          if (save?.action) {
            await Promise.resolve(save.action?.()).then(() =>
              setLoading(false)
            );
          }
        }
      }}
    >
      {children}

      <div className="flex justify-end">
        {cancel && (
          <Button action={cancel.action} actionType={ActionType.DEFAULT}>
            {cancel.label ?? "Abbrechen"}
          </Button>
        )}
        <Button
          actionType={ActionType.PRIMARY}
          isDisabled={isLoading}
          className={classNames(
            isLoading
              ? "bg-primary-400"
              : "bg-primary-600 hover:bg-primary-700",
            "ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          )}
          type="submit"
        >
          {save?.label ?? "Speichern"}
          <Transition
            as={Fragment}
            show={isLoading}
            enter="transform transition duration-300"
            enterFrom="opacity-0 scale-50"
            enterTo="opacity-100 scale-100"
            leave="transform duration-300 transition ease-in-out"
            leaveFrom="opacity-100 scale-100 "
            leaveTo="opacity-0 scale-95 "
          >
            <div className="w-full h-full ">
              <FontAwesomeIcon
                className="self-center ml-2"
                spin
                icon={faSpinner}
              />
            </div>
          </Transition>
        </Button>
      </div>
    </form>
  );
}
