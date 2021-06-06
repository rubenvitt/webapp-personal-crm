import {
  PersonAddress,
  PersonDetails,
  PersonMail,
  PersonPhone,
} from "../../../../globals/interfaces";
import { ContentBox } from "../../../common/content-box.component";
import React, { useEffect, useState } from "react";
import { EditRadio } from "../edit/edit-input.component";
import { EditAddress } from "../edit/edit-address-input.component";

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
      subTitle={`Kontaktdaten für ${person.displayName}`}
      edit={{
        onEditAction: () => setIsEdit(true),
        submitAction: () => {
          return Promise.resolve().then(() => setIsEdit(false));
        },
      }}
    >
      <dl>
        <dt>
          <EditRadio<PersonPhone>
            isEdit={isEdit}
            label="Telefonnummern:"
            values={person.phones}
            inputOptions={{
              inputType: "tel",
              autocomplete: "tel",
              title: "Telefonnummer",
            }}
          />
        </dt>
        <dt>
          <EditRadio<PersonMail>
            isEdit={isEdit}
            values={person.mails}
            label={"E-Mail Adressen:"}
            inputOptions={{
              inputType: "email",
              autocomplete: "email",
              title: "E-Mail Adresse",
            }}
          />
        </dt>
        <dt>
          <EditRadio<PersonAddress>
            isEdit={isEdit}
            values={person.addresses}
            label={"Adressen:"}
            CustomEditInput={({ isEdit, initialElement }) => {
              return (
                <div className="flex flex-1 grid grid-cols-6 md:grid-cols-8">
                  {isEdit ? (
                    <EditAddress initialElement={initialElement} />
                  ) : (
                    <p className="col-span-4">{initialElement.value.city}</p>
                  )}
                </div>
              );
            }}
          />
        </dt>
      </dl>
    </ContentBox>
  );
};
