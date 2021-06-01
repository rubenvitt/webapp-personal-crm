import React, { useEffect, useState } from "react";
import { Button } from "./button.component";
import { classNames } from "../../globals/utils";
import { isMobile } from "react-device-detect";

interface Props {
  title?: string | JSX.Element;
  subTitle?: string | JSX.Element;
  footer?: {
    action?: () => void;
    content: string | JSX.Element;
  };
  edit?: {
    onEditAction: () => void;
    content: string | JSX.Element;
  };
}

export const ContentBox: React.FC<Props> = ({
  children,
  title,
  subTitle,
  footer,
  edit,
}) => {
  const [id, setId] = useState(0);
  useEffect(() => {
    setId(Math.random());
  }, []);

  const [isHover, setHover] = useState(false);

  return (
    <section
      onMouseEnter={() => !isMobile && setHover(true)}
      onMouseLeave={() => !isMobile && setHover(false)}
      aria-labelledby={"title-" + id}
    >
      <div className="bg-white shadow sm:rounded-lg">
        {(title || subTitle) && (
          <header className="px-4 py-5 sm:px-6">
            <div className="flex flex-row justify-between">
              <div className="flex flex-col">
                <h2
                  id={"title-" + id}
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
              {edit && (
                <Button
                  className={classNames(
                    !isHover && !isMobile && "sm:hidden",
                    "block"
                  )}
                  action={edit.onEditAction}
                >
                  {edit.content}
                </Button>
              )}
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
};
