import React, { useRef } from "react";
import { useCommentsMutation } from "../../../../client-http/comments";
import { PersonDetails } from "../../../../global/interfaces";
import { Button } from "../../../elements/common/button.component";
import { ContentBox } from "../../common/content-box.component";
import { Note } from "./note.component";

interface Props {
  person: PersonDetails;
}

export const PersonDetailNotesBox: React.FC<Props> = ({ person }) => {
  const commentBoxRef = useRef<HTMLTextAreaElement>();
  const { createComment, removeComment } = useCommentsMutation(person);

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
                      createComment({
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
      <ul className="space-y-4 divide-y divide-solid -mt-5">
        {person.comments?.map((comment) => (
          <Note key={comment._id} person={person} comment={comment} />
        ))}
      </ul>
    </ContentBox>
  );
};
