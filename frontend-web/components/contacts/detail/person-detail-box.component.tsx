import React from "react";
import { PersonDetails } from "../../../globals/interfaces";
import {
  calculateAgeFromBirthday,
  calculateTimespanSince,
  classNames,
  getPronounFor,
} from "../../../globals/utils";
import { PersonDetailActions } from "./person-detail-actions.component";
import { StarSwitch } from "../../common/star-switch.component";
import Avatar from "react-avatar";

interface Props {
  person: PersonDetails;
  aside?: JSX.Element;
}

export const PersonBox: React.FC<Props> = ({ person, children, aside }) => {
  const generateDescriptionFor = (person: PersonDetails) => {
    let ageFromBirthday = calculateAgeFromBirthday(person.birthday);
    return person
      ? (ageFromBirthday
          ? `${getPronounFor(
              person.anrede,
              person.gender
            )} ist ${ageFromBirthday} alt und euer`
          : "Euer") +
          `  letzter Kontakt liegt etwa ${calculateTimespanSince({
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
                <Avatar
                  className="h-16 w-16 rounded-full"
                  round
                  name={person.displayName}
                  src={person.imageUrl}
                  maxInitials={2}
                  alt={person.displayName + "profile picture"}
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
                  {person?.displayName}
                </h1>
                <StarSwitch mutate={() => Promise.resolve()} />
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
