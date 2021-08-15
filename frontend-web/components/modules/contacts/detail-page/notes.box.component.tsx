import { AxiosError } from "axios";
import React, { useRef } from "react";
import { useMutation } from "react-query";
import { apiAxios } from "../../../../axios";
import {
  Comment,
  CreateElement,
  PersonDetails,
  TimespanType,
} from "../../../../global/interfaces";
import { calculateTimespanSince } from "../../../../global/utils";
import { Button } from "../../../elements/common/button.component";
import { ContentBox } from "../../common/content-box.component";

interface Props {
  person: PersonDetails;
}

export const PersonDetailNotesBox: React.FC<Props> = ({ person }) => {
  const commentBoxRef = useRef<HTMLTextAreaElement>();
  const { mutateAsync } = useMutation<void, AxiosError, CreateElement<Comment>>(
    ["/persons/comment", person._id],
    (data) => {
      return apiAxios.post("/persons/" + person._id + "/comment", data);
    },
    {
      onSuccess: () => {
        //invalidate cache, optimistic update
      },
    }
  );

  return (
    <ContentBox
      title="Notizen"
      footer={{
        content: (
          <div className="flex space-x-3">
            <div className="min-w-0 flex-1">
              <form action="#">
                <div>
                  <label htmlFor="comment" className="sr-only">
                    About
                  </label>
                  <textarea
                    id="comment"
                    ref={commentBoxRef}
                    name="comment"
                    rows={3}
                    className="shadow-sm block w-full focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300 rounded-md"
                    placeholder="Notiz erstellen"
                    defaultValue={""}
                  />
                </div>
                <div className="mt-3 grid justify-items-end">
                  <Button
                    action={() =>
                      mutateAsync({
                        content: commentBoxRef.current.value,
                        created: new Date().toISOString(),
                      }).then(() => {
                        commentBoxRef.current.value = "";
                      })
                    }
                  >
                    Notiz hinzufügen
                  </Button>
                </div>
              </form>
            </div>
          </div>
        ),
      }}
    >
      <ul className="space-y-8">
        {person.comments?.map((comment) => (
          <li key={comment._id}>
            <div className="flex space-x-3">
              <div>
                <div className="mt-1 text-sm text-gray-700">
                  <p>{comment.content}</p>
                </div>
                <div className="mt-2 text-sm space-x-2">
                  <span className="text-gray-500 font-medium">
                    {calculateTimespanSince({
                      duration: {
                        start: comment.created,
                      },
                      type: TimespanType.INACCURATE,
                      prefix: "vor ",
                    })}
                  </span>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </ContentBox>
  );
};
