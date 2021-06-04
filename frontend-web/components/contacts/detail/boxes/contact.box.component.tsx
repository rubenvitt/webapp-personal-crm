import { PersonDetails } from "../../../../globals/interfaces";
import { ContentBox } from "../../../common/content-box.component";
import { useEffect, useState } from "react";
import { PhoneEditInput } from "../edit/phone-edit.input.component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/pro-solid-svg-icons";
import { MailEditInput } from "../edit/mail-edit.input.component";

interface Props {
  person: PersonDetails;
}

export const PersonContactBox: React.FC<Props> = ({ person }) => {
  const [isEdit, setIsEdit] = useState<boolean>();
  useEffect(() => {
    // reload edit form
  }, [isEdit]);

  return (
    <ContentBox
      title={"Kontaktdaten"}
      subTitle={`Kontaktdaten für ${person.name}`}
      edit={{
        onEditAction: () => setIsEdit(true),
        submitAction: () => {
          return Promise.resolve().then(() => setIsEdit(false));
        },
      }}
    >
      <dl>
        <dt>
          Telefonnummern:
          <ul>
            <li>
              <PhoneEditInput
                isEdit={isEdit}
                initialPhoneNumber={person.phone}
                onChange={() => undefined}
              />
            </li>
          </ul>
        </dt>
        <dt>
          Mailadressen:
          <ul>
            <li>
              <MailEditInput
                initialMailAddress={person.email}
                onChange={() => undefined}
                isEdit={isEdit}
              />
            </li>
          </ul>
        </dt>
        <dt>
          Adressen:
          <ul>
            <li>XX, LL, AAA BBB (primär)</li>
          </ul>
        </dt>
      </dl>
    </ContentBox>
  );
};
