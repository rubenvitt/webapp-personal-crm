import React, { useReducer, useRef } from "react";
import { Person, PersonTag } from "../../../globals/interfaces";
import { classNames } from "../../../globals/utils";

interface Props {
  tagList: PersonTag[];
  className?: string;
}

export const PersonTagList: React.FC<Props> = ({ tagList, className }) => {
  const [tags, addTag] = useReducer(
    (prevState: PersonTag[], element: string): PersonTag[] => {
      return [
        ...prevState,
        {
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
            style={{ backgroundColor: tag.color.bg, color: tag.color.text }}
            className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
          >
            {tag.title}
          </span>
        );
      })}
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
    </div>
  );
};
