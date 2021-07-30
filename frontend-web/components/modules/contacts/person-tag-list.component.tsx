import { faTrash } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useReducer, useRef } from "react";
import { PersonTag } from "../../../globals/interfaces";
import { classNames } from "../../../globals/utils";
import { MaybeAsyncAction } from "../../../globals/types";

interface Props {
  tagList: PersonTag[];
  className?: string;
  onCreate?: MaybeAsyncAction<string>;
  onClick?: MaybeAsyncAction<PersonTag>;
}

export const PersonTagList: React.FC<Props> = ({
  tagList = [],
  className,
  onClick,
  onCreate,
}) => {
  const [tags, addTag] = useReducer(
    (prevState: PersonTag[], element: string): PersonTag[] => {
      return [
        ...prevState,
        {
          _id: String(Math.random()),
          title: element,
          color: { bg: "#8ec025", text: "#333" },
        },
      ];
    },
    tagList
  );
  const input = useRef<HTMLInputElement>();

  return (
    <div className={classNames(className, "flex gap-2")}>
      {tags.map((tag) => {
        return (
          <span
            key={tag._id}
            onClick={() => onClick(tag)}
            style={{ backgroundColor: tag.color.bg, color: tag.color.text }}
            className={classNames(
              onClick &&
                "hover:ring-2 hover:ring-gray-500 hover:ring-opacity-50 hover:ring-offset-1 hover:ring-offset-gray-200 cursor-pointer",
              "inline-flex group items-center px-3 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
            )}
          >
            {tag.title}
            <span className="pl-2 hidden group-hover:inline">
              <FontAwesomeIcon icon={faTrash} />
            </span>
          </span>
        );
      })}
      {onCreate && (
        <form
          onSubmit={(event) => {
            event.preventDefault();
            Promise.resolve(onCreate(input.current.value)).then(() => {
              input.current.value = "";
            });
          }}
        >
          <input
            ref={input}
            className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-transparent text-blue-800 border border-transparent focus:border-transparent hover:border-blue-500 hover:border-offset-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="..."
          />
        </form>
      )}
    </div>
  );
};
