import React from "react";
import { PersonDetails } from "../../../globals/interfaces";
import {
  calculateTimespanSince,
  classNames,
  getPronounFor,
} from "../../../globals/utils";
import { PersonDetailActions } from "./person-detail-actions.component";
import { StarIcon as StarIconOutline } from "@heroicons/react/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  person: PersonDetails;
  aside?: JSX.Element;
}

export const PersonBox: React.FC<Props> = ({ person, children, aside }) => {
  const generateDescriptionFor = (person: PersonDetails) => {
    return person
      ? `${getPronounFor(person.anrede)} ist ${calculateTimespanSince({
          duration: { start: person.birthday },
        })} alt und euer letzter Kontakt liegt etwa ${calculateTimespanSince({
          duration: { start: person.lastContact },
        })} zurück.`
      : "Lade Details...";
  };

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
              <div className={"flex items-center"}>
                <h1 className="text-2xl font-bold text-gray-900">
                  {person?.name}
                </h1>
                lala
                <FontAwesomeIcon icon={["fab", "apple"]} />
                <p className="text-2xl p-2 group text-yellow-500 cursor-pointer">
                  <FontAwesomeIcon
                    icon={{ iconName: "star", prefix: "far" }}
                    size="lg"
                  />
                  <StarIconOutline className={"h-5 w-5 group-hover:hidden"} />
                  <StarIconSolid
                    className={"h-5 w-5 hidden group-hover:block"}
                  />
                </p>
              </div>
              <p className="text-sm font-medium text-gray-500">
                {generateDescriptionFor(person)}
              </p>
            </div>
          </div>
          <PersonDetailActions person={person} />
        </div>

        <div className="mt-8 max-w-3xl mx-auto grid grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
          <div
            className={classNames(
              aside ? "lg:col-span-2" : "lg:col-span-3",
              "space-y-6 lg:col-start-1"
            )}
          >
            {children}
          </div>

          {aside && (
            <div className="lg:col-start-3 lg:col-span-1 space-y-6">
              {aside}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
