import { faEdit, faSave, faTrash } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef, useState } from "react";
import { useCommentsMutation } from "../../../../client-http/comments";
import {
  Comment,
  PersonDetails,
  TimespanType,
} from "../../../../global/interfaces";
import { calculateTimespanSince, classNames } from "../../../../global/utils";
import { Button } from "../../../elements/common/button.component";

type Props = {
  comment: Comment;
  person: PersonDetails;
};

export function Note({ comment, person }: Props): JSX.Element {
  const { removeComment, isLoading, updateComment } =
    useCommentsMutation(person);

  const [editing, setEditing] = useState(false);
  const commentBoxRef = useRef<HTMLTextAreaElement>();

  return (
    <li key={comment._id}>
      <div className="flex space-x-3 mt-2">
        <div className="w-full">
          <div className="mt-1 text-sm text-gray-700">
            <div
              className={classNames(
                editing ? "block" : "hidden",
                "w-full flex space-x-2"
              )}
            >
              <textarea
                ref={commentBoxRef}
                minLength={10}
                maxLength={5000}
                required
                name="comment"
                rows={3}
                className="shadow-sm w-full focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300 rounded-md"
                placeholder="Notiz erstellen"
                defaultValue={comment.content}
              />
              <div className="flex items-end">
                <Button
                  action={() => {
                    if (commentBoxRef.current.reportValidity()) {
                      updateComment({
                        ...comment,
                        content: commentBoxRef.current.value,
                      }).then(() => {
                        setEditing(false);
                      });
                    } else {
                      return Promise.reject();
                    }
                  }}
                >
                  <FontAwesomeIcon icon={faSave} size={"lg"} />
                </Button>
              </div>
            </div>
            <p className={classNames(editing ? "hidden" : "block")}>
              {comment.content}
            </p>
          </div>
          <div className="mt-2 text-sm space-x-2 text-gray-500 font-medium">
            <span>
              {calculateTimespanSince({
                duration: {
                  start: comment.created,
                },
                type: TimespanType.INACCURATE,
                prefix: "vor ",
              })}{" "}
              {comment.updated && "(bearbeitet)"}
            </span>
            <span>•</span>
            <button
              disabled={isLoading}
              onClick={() => setEditing((prevState) => !prevState)}
              className="hover:text-blue-500"
            >
              <FontAwesomeIcon icon={faEdit} />
            </button>
            <button
              disabled={isLoading || editing}
              onClick={() => {
                removeComment(comment);
              }}
              className="hover:text-red-500"
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}
