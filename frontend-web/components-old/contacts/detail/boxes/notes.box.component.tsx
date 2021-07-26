import React, { useReducer, useRef } from "react";
import { Button } from "../../../../components/elements/common/button.component";
import { ContentBox } from "../../../../components/modules/common/content-box.component";
import {
  Note,
  PersonDetails,
  TimespanType,
} from "../../../../globals/interfaces";
import { calculateTimespanSince } from "../../../../globals/utils";

interface Props {
  person: PersonDetails;
}

const notes: Note[] = [
  {
    _id: 1,
    name: "Leslie Alexander",
    date: "2020-05-01",
    imageId: "1494790108377-be9c29b29330",
    body: "Ducimus quas delectus ad maxime totam doloribus reiciendis ex. Tempore dolorem maiores. Similique voluptatibus tempore non ut.",
  },
  {
    _id: 2,
    name: "Michael Foster",
    date: "2020-10-10",
    imageId: "1519244703995-f4e0f30006d5",
    body: "Et ut autem. Voluptatem eum dolores sint necessitatibus quos. Quis eum qui dolorem accusantium voluptas voluptatem ipsum. Quo facere iusto quia accusamus veniam id explicabo et aut.",
  },
  {
    _id: 3,
    name: "Dries Vincent",
    date: "2021-05-18",
    imageId: "1506794778202-cad84cf45f1d",
    body: "Expedita consequatur sit ea voluptas quo ipsam recusandae. Ab sint et voluptatem repudiandae voluptatem et eveniet. Nihil quas consequatur autem. Perferendis rerum et.",
  },
];

export const PersonDetailNotesBox: React.FC<Props> = () => {
  const commentBoxRef = useRef<HTMLTextAreaElement>();

  const [state, dispatch] = useReducer((notes, action) => {
    return [
      ...notes,
      {
        id: Math.random(),
        date: new Date().toISOString(),
        body: action,
        name: "",
        imageId: "",
      },
    ];
  }, notes);

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
                    placeholder="Notiz hinzufügen"
                    defaultValue={""}
                  />
                </div>
                <div className="mt-3 grid justify-items-end">
                  <Button
                    asyncAction={() =>
                      new Promise((resolve) =>
                        setTimeout(() => {
                          dispatch(commentBoxRef.current.value);
                          commentBoxRef.current.value = "";
                          resolve();
                        }, 1000)
                      )
                    }
                  >
                    Comment
                  </Button>
                </div>
              </form>
            </div>
          </div>
        ),
      }}
    >
      <ul className="space-y-8">
        {state.map((comment) => (
          <li key={comment._id}>
            <div className="flex space-x-3">
              <div>
                <div className="mt-1 text-sm text-gray-700">
                  <p>{comment.body}</p>
                </div>
                <div className="mt-2 text-sm space-x-2">
                  <span className="text-gray-500 font-medium">
                    {calculateTimespanSince({
                      duration: { start: comment.date },
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
