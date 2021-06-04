import React, { useReducer, useRef } from "react";
import { Person, PersonTag } from "../../../globals/interfaces";
import { classNames } from "../../../globals/utils";
import { TrashIcon } from "@heroicons/react/solid";

interface Props {
  tagList: PersonTag[];
  className?: string;
  withCreation?: boolean;
  onClick?: (personTag: PersonTag) => void;
}

export const PersonTagList: React.FC<Props> = ({
  tagList,
  className,
  withCreation,
  onClick,
}) => {
  const [tags, addTag] = useReducer(
    (prevState: PersonTag[], element: string): PersonTag[] => {
      return [
        ...prevState,
        {
          id: String(Math.random()),
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
            key={tag.id}
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
              <TrashIcon className="w-4 h-4" />
            </span>
          </span>
        );
      })}
      {withCreation && (
        <form
          onSubmit={(event) => {
            addTag(input.current.value);
            input.current.value = "";
            event.preventDefault();
          }}
        >
          <input
            ref={input}
            className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-transparent text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            placeholder="..."
          />
        </form>
      )}
    </div>
  );
};
