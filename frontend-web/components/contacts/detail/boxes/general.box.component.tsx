import {
  calculateAgeFromBirthday,
  calculateTimespanSince,
} from "../../../../globals/utils";
import { ContentBox } from "../../../common/content-box.component";
import React from "react";
import {
  Birthday,
  DateType,
  PersonDetails,
} from "../../../../globals/interfaces";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBirthdayCake, faUsers } from "@fortawesome/pro-regular-svg-icons";
import { Logger } from "../../../../globals/logging";

interface Props {
  person: PersonDetails;
}

function toBirthdayString({ dateType, dateValue }: Birthday) {
  function monthDayToDateString(monthDay: string) {
    const [month, day] = monthDay.split("-");
    return new Date(0, Number(month), Number(day)).toLocaleDateString(
      undefined,
      {
        month: "long",
        day: "2-digit",
      }
    );
  }

  function monthAndYearToDateString(monthYear: string) {
    const [year, month] = monthYear.split("-");
    if (Logger.isDebug)
      Logger.log(
        "convert monthYear to string",
        monthYear,
        monthYear.split("-"),
        new Date(Number(year), Number(month), 1)
      );
    return new Date(Number(year), Number(month), 1).toLocaleDateString(
      undefined,
      {
        year: "numeric",
        month: "long",
      }
    );
  }

  switch (dateType) {
    case DateType.EXACT:
      return new Date(dateValue).toLocaleDateString(undefined, {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
    case DateType.MONTH_DAY:
      return monthDayToDateString(dateValue);
    case DateType.YEAR_MONTH:
      return monthAndYearToDateString(dateValue);
    case DateType.AGE:
      return dateValue + " Jahr" + (Number(dateValue) > 1 ? "e" : "");
    case DateType.UNKNOWN:
      return "Unbekannt";
  }
}

export const PersonDetailGeneralBox: React.FC<Props> = ({ person }) => {
  return (
    <ContentBox
      title="Allgemeines"
      subTitle={"Allgemeines zu " + person.displayName}
    >
      <dl>
        <dt>
          <FontAwesomeIcon
            icon={faBirthdayCake}
            className="inline pr-2"
            size="lg"
          />
          {toBirthdayString(person.birthday)}{" "}
          {[DateType.YEAR_MONTH, DateType.EXACT].find(
            (a) => a === person.birthday.dateType
          ) && "(" + calculateAgeFromBirthday(person.birthday) + ")"}
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
        {(person.primaryMail || person.primaryPhone) && (
          <div>
            <h3>Kontaktdaten</h3>
            {person.primaryPhone && (
              <dt>Telefonnummer: {person.primaryPhone.value}</dt>
            )}
            {person.primaryMail && <dt>Email: {person.primaryMail.value}</dt>}
          </div>
        )}
      </dl>
    </ContentBox>
  );
};
