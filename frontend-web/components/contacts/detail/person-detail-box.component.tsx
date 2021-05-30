import React, { useReducer, useRef } from "react";
import { PersonDetails, TimespanType } from "../../../globals/interfaces";
import { CheckIcon, ThumbUpIcon, UserIcon } from "@heroicons/react/solid";
import { calculateTimespanSince, getPronounFor } from "../../../globals/utils";
import { PersonDetailActions } from "./person-detail-actions.component";
import { ContentBox } from "../../common/content-box.component";
import { Button } from "../../common/button.component";

interface Props {
  person: PersonDetails;
}

const eventTypes = {
  applied: { icon: UserIcon, bgColorClass: "bg-gray-400" },
  advanced: { icon: ThumbUpIcon, bgColorClass: "bg-blue-500" },
  completed: { icon: CheckIcon, bgColorClass: "bg-green-500" },
};
const timeline = [
  {
    id: 1,
    type: eventTypes.applied,
    content: "Applied to",
    target: "Front End Developer",
    date: "Sep 20",
    datetime: "2020-09-20",
  },
  {
    id: 2,
    type: eventTypes.advanced,
    content: "Advanced to phone screening by",
    target: "Bethany Blake",
    date: "Sep 22",
    datetime: "2020-09-22",
  },
  {
    id: 3,
    type: eventTypes.completed,
    content: "Completed phone screening with",
    target: "Martha Gardner",
    date: "Sep 28",
    datetime: "2020-09-28",
  },
  {
    id: 4,
    type: eventTypes.advanced,
    content: "Advanced to interview by",
    target: "Bethany Blake",
    date: "Sep 30",
    datetime: "2020-09-30",
  },
  {
    id: 5,
    type: eventTypes.completed,
    content: "Completed interview with",
    target: "Katherine Snyder",
    date: "Oct 4",
    datetime: "2020-10-04",
  },
];

interface Note {
  id: number;
  name?: string;
  date: string;
  imageId?: string;
  body: string;
}

const notes: Note[] = [
  {
    id: 1,
    name: "Leslie Alexander",
    date: "2020-05-01",
    imageId: "1494790108377-be9c29b29330",
    body: "Ducimus quas delectus ad maxime totam doloribus reiciendis ex. Tempore dolorem maiores. Similique voluptatibus tempore non ut.",
  },
  {
    id: 2,
    name: "Michael Foster",
    date: "2020-10-10",
    imageId: "1519244703995-f4e0f30006d5",
    body: "Et ut autem. Voluptatem eum dolores sint necessitatibus quos. Quis eum qui dolorem accusantium voluptas voluptatem ipsum. Quo facere iusto quia accusamus veniam id explicabo et aut.",
  },
  {
    id: 3,
    name: "Dries Vincent",
    date: "2021-05-18",
    imageId: "1506794778202-cad84cf45f1d",
    body: "Expedita consequatur sit ea voluptas quo ipsam recusandae. Ab sint et voluptatem repudiandae voluptatem et eveniet. Nihil quas consequatur autem. Perferendis rerum et.",
  },
];

export const PersonBox: React.FC<Props> = ({ person, children }) => {
  const generateDescriptionFor = (person: PersonDetails) => {
    return person
      ? getPronounFor(person.anrede) +
          " ist " +
          calculateTimespanSince({ start: person.birthday }) +
          " alt und euer letzter Kontakt liegt etwa " +
          calculateTimespanSince({ start: person.lastContact }) +
          " zurück."
      : "Lade Details...";
  };

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
    <div className="min-h-screen">
      <main className="py-10">
        {/* Page header */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8">
          <div className="flex items-center space-x-5">
            <div className="flex-shrink-0">
              <div className="relative">
                <img
                  className="h-16 w-16 rounded-full"
                  src={person.imageUrl}
                  alt={person.name + " profile picture"}
                />
                <span
                  className="absolute inset-0 shadow-inner rounded-full"
                  aria-hidden="true"
                />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {person?.name}
              </h1>
              <p className="text-sm font-medium text-gray-500">
                {generateDescriptionFor(person)}
              </p>
            </div>
          </div>
          <PersonDetailActions person={person} />
        </div>

        <div className="mt-8 max-w-3xl mx-auto grid grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
          <div className="space-y-6 lg:col-start-1 lg:col-span-2">
            <ContentBox
              title="Allgemeines"
              subTitle={"Allgemeines zu " + person.name}
            >
              Hier kommt rein:
              <br />
              Zusammenfassung von: Alter, Beziehungen, Geburtstag, letzter
              Aktivität, Kontaktdaten
            </ContentBox>

            <ContentBox
              title="Notizen"
              footer={{
                content: (
                  <div className="flex space-x-3">
                    <div className="flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={person?.imageUrl}
                        alt=""
                      />
                    </div>
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
                            placeholder="Add a note"
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
                  <li key={comment.id}>
                    <div className="flex space-x-3">
                      <div>
                        <div className="mt-1 text-sm text-gray-700">
                          <p>{comment.body}</p>
                        </div>
                        <div className="mt-2 text-sm space-x-2">
                          <span className="text-gray-500 font-medium">
                            {calculateTimespanSince(
                              { start: comment.date },
                              TimespanType.INACCURATE,
                              "vor "
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </ContentBox>
          </div>

          <div className="lg:col-start-3 lg:col-span-1 space-y-6">
            <ContentBox
              title="Box 2"
              footer={{ content: "Klick mich hier", action: () => undefined }}
            />
          </div>
        </div>
      </main>
    </div>
  );
};
