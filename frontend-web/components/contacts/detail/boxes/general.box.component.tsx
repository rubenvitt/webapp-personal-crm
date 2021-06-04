import { calculateTimespanSince } from "../../../../globals/utils";
import { ContentBox } from "../../../common/content-box.component";
import React from "react";
import { PersonDetails } from "../../../../globals/interfaces";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBirthdayCake, faUsers } from "@fortawesome/pro-regular-svg-icons";

interface Props {
  person: PersonDetails;
}

export const PersonDetailGeneralBox: React.FC<Props> = ({ person }) => {
  return (
    <ContentBox
      title="Allgemeines"
      subTitle={"Allgemeines zu " + person.name}
      edit={{
        onEditAction: () => undefined,
        submitAction: () => Promise.resolve(),
      }}
    >
      <dl>
        <dt>
          <FontAwesomeIcon
            icon={faBirthdayCake}
            className="inline pr-2"
            size="lg"
          />
          {new Date(person.birthday).toLocaleDateString()} (
          {calculateTimespanSince({
            duration: { start: person.birthday },
            unit: "years",
          })}
          )
        </dt>
        <dt>
          <FontAwesomeIcon icon={faUsers} className="inline pr-2" size="lg" />
          <span className="text-blue-400 cursor-pointer hover:text-blue-500">
            3 Beziehungen
          </span>
        </dt>
        <dt>
          <FontAwesomeIcon icon={faUsers} className="inline pr-2" size="lg" />
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
