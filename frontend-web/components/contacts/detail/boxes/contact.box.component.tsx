import { PersonDetails } from "../../../../globals/interfaces";
import { ContentBox } from "../../../common/content-box.component";
import React, { useEffect, useState } from "react";
import { PhoneEditInput, PhoneEditRadio } from "../edit/phone-edit.component";
import {
  MailEditInput,
  MailEditRadio,
} from "../edit/mail-edit.input.component";

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
          <PhoneEditRadio isEdit={isEdit} phones={person.phones} />
        </dt>
        <dt>
          <MailEditRadio isEdit={isEdit} mails={person.mails} />
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
