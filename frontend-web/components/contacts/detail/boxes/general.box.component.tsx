import { CakeIcon, UserGroupIcon } from "@heroicons/react/solid";
import { calculateTimespanSince } from "../../../../globals/utils";
import { ContentBox } from "../../../common/content-box.component";
import React from "react";
import { PersonDetails } from "../../../../globals/interfaces";

interface Props {
  person: PersonDetails;
}

export const PersonDetailGeneralBox: React.FC<Props> = ({ person }) => {
  return (
    <ContentBox
      title="Allgemeines"
      subTitle={"Allgemeines zu " + person.name}
      edit={{ content: "Bearbeiten", onEditAction: () => undefined }}
    >
      <dl>
        <dt>
          <CakeIcon className="w-5 h-5 inline pr-2" />
          {new Date(person.birthday).toLocaleDateString()} (
          {calculateTimespanSince({
            duration: { start: person.birthday },
            unit: "years",
          })}
          )
        </dt>
        <dt>
          <UserGroupIcon className="w-5 h-5 inline pr-2" />
          <span className="text-blue-400 cursor-pointer hover:text-blue-500">
            3 Beziehungen
          </span>
        </dt>
        <dt>
          <UserGroupIcon className="w-5 h-5 inline pr-2" />
          <span className="text-blue-400 cursor-pointer hover:text-blue-500">
            Letzter Kontakt{" "}
            {calculateTimespanSince({
              duration: { start: person.lastContact },
              prefix: "vor ",
            })}
          </span>
        </dt>
        <div>
          <h3>Kontaktdaten</h3>
          <dt>Telefonummer: {person.phone}</dt>
          <dt>Email: {person.email}</dt>
        </div>
      </dl>
    </ContentBox>
  );
};
