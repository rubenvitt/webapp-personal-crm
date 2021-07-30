import { faCheck, faPen } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import _uniqueId from "lodash/uniqueId";
import React, { useState } from "react";
import { isMobile } from "react-device-detect";
import UseKey from "react-use/lib/component/UseKey";
import { ActionType } from "../../../globals/interfaces";
import { MaybeAsyncAction, WithForcedChildren } from "../../../globals/types";
import { classNames } from "../../../globals/utils";
import { Button } from "../../elements/common/button.component";

type Props = WithForcedChildren<{
  title?: string | JSX.Element;
  subTitle?: string | JSX.Element;
  footer?: {
    action?: () => void;
    content: string | JSX.Element;
  };
  edit?: {
    onEdit: MaybeAsyncAction;
    onSubmit: MaybeAsyncAction;
    onCancel: MaybeAsyncAction;
    editContent?: string | JSX.Element;
    submitContent?: string | JSX.Element;
  };
}>;

export function ContentBox({
  children,
  title,
  subTitle,
  footer,
  edit,
}: Props): JSX.Element {
  const [isHover, setHover] = useState(false);
  const [isEdit, setEdit] = useState(false);
  const [id] = useState(_uniqueId("text-input"));

  const submit = () => {
    if (edit) {
      return Promise.resolve(edit.onSubmit()).finally(() => setEdit(false));
    }
  };

  const cancel = () => {
    if (edit) {
      Promise.resolve(edit.onCancel()).finally(() => setEdit(false));
    }
  };

  return (
    <section
      onMouseEnter={() => !isMobile && setHover(true)}
      onMouseLeave={() => !isMobile && setHover(false)}
      aria-labelledby={id}
    >
      {isEdit && <UseKey filter="Escape" fn={cancel} />}
      <div className="bg-white shadow sm:rounded-lg">
        {(title || subTitle) && (
          <header className="px-4 py-5 sm:px-6">
            <div className="flex flex-row justify-between">
              <div className="flex flex-col">
                <h2
                  id={id}
                  className="text-lg leading-6 font-medium text-gray-900"
                >
                  {title}
                </h2>
                {subTitle && (
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    {subTitle}
                  </p>
                )}
              </div>
              <div>
                {edit &&
                  (!isEdit ? (
                    <Button
                      key={"0"}
                      className={classNames(
                        !isHover && !isMobile && "sm:hidden",
                        "block"
                      )}
                      action={() => {
                        return Promise.resolve(edit.onEdit()).then(() =>
                          setEdit(true)
                        );
                      }}
                    >
                      {edit.editContent ?? (
                        <FontAwesomeIcon className={"text-lg"} icon={faPen} />
                      )}
                    </Button>
                  ) : (
                    <Button
                      key={"1"}
                      actionType={ActionType.SUCCESS}
                      className={classNames("block")}
                      action={submit}
                    >
                      {edit.submitContent ?? (
                        <FontAwesomeIcon className={"text-lg"} icon={faCheck} />
                      )}
                    </Button>
                  ))}
              </div>
            </div>
          </header>
        )}
        <article className="border-t border-gray-200 py-5 px-4 sm:px-6">
          {children}
        </article>
        {footer?.action && (
          <footer onClick={footer.action} className={"cursor-pointer"}>
            <div className="block bg-gray-50 text-sm font-medium text-gray-500 text-center px-4 py-4 hover:text-gray-700 sm:rounded-b-lg">
              {footer.content}
            </div>
          </footer>
        )}
        {footer && !footer?.action && (
          <div className="block bg-gray-50 text-sm font-medium text-gray-500 text-center px-4 py-4 hover:text-gray-700 sm:rounded-b-lg">
            {footer.content}
          </div>
        )}
      </div>
    </section>
  );
}
