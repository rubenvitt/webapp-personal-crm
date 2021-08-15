import React, { useEffect, useState } from "react";
import { useContactMutations } from "../../../../client-http/contact";
import {
  Address,
  MailType,
  PersonAddress,
  PersonDetails,
  PersonMail,
  PersonPhone,
  PhoneType,
} from "../../../../global/interfaces";
import { ContentBox } from "../../common/content-box.component";
import { EditAddress } from "./edit/edit-address-input.component";
import { EditRadio } from "./edit/edit-input.component";

interface Props {
  person: PersonDetails;
}

function displayPersonAddress(value: Address): string {
  return (
    value.street +
    (value.street ? ", " : "") +
    value.zip +
    (value.zip ? " " : "") +
    value.city +
    (value.city && value.country ? ", " : "") +
    value.country
  );
}

export const PersonContactBox: React.FC<Props> = ({ person }) => {
  const [isEdit, setIsEdit] = useState<boolean>();
  useEffect(() => {
    // reload edit form
  }, [isEdit]);

  const {
    mutatePhoneDelete,
    mutatePhoneUpdate,
    mutatePhoneAdd,
    mutateMailDelete,
    mutateMailUpdate,
    mutateMailAdd,
    mutateAddressAdd,
    mutateAddressDelete,
    mutateAddressUpdate,
  } = useContactMutations(person);

  return (
    <ContentBox
      title={"Kontaktdaten"}
      subTitle={`Kontaktdaten für ${person.displayName}`}
      edit={{
        onCancel: () => setIsEdit(false),
        onEdit: () => setIsEdit(true),
        onSubmit: () => {
          return Promise.resolve().then(() => setIsEdit(false));
        },
      }}
    >
      <dl className="flex space-y-4 flex-col">
        <dt className="border-b pb-4 border-gray-200">
          <EditRadio<PersonPhone>
            deleteItem={async (element) => {
              return mutatePhoneDelete(element);
            }}
            addItem={async (value) => {
              await mutatePhoneAdd({
                value,
                type: PhoneType.MOBILE,
              });
            }}
            updateItem={async (value) => {
              await mutatePhoneUpdate(value);
            }}
            isEdit={isEdit}
            label="Telefonnummern:"
            values={person.contact?.phone}
            inputOptions={{
              inputType: "tel",
              autocomplete: "tel",
              title: "Telefonnummer",
            }}
          />
        </dt>
        <dt className="border-b pb-4 border-gray-200">
          <EditRadio<PersonMail>
            addItem={async (value) => {
              const element = {
                value,
                type: MailType.PRIVATE,
              };
              return await mutateMailAdd(element);
            }}
            updateItem={async (value) => {
              return await mutateMailUpdate(value);
            }}
            deleteItem={async (element) => {
              return await mutateMailDelete(element);
            }}
            isEdit={isEdit}
            values={person.contact?.mail}
            label="E-Mail Adressen:"
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
            values={person.contact?.address}
            label={"Adressen:"}
            addItem={async (value) => {
              mutateAddressAdd(value as PersonAddress);
            }}
            updateItem={async (value) => {
              mutateAddressUpdate(value.value);
            }}
            deleteItem={async (element) => {
              return mutateAddressDelete(element);
            }}
            CustomEditInput={({ isEdit, initialElement, ...rest }) => {
              return (
                <div className="flex flex-1 grid grid-cols-6 md:grid-cols-8">
                  {isEdit ? (
                    <EditAddress initialElement={initialElement} {...rest} />
                  ) : (
                    <p className="col-span-4">
                      {initialElement &&
                        displayPersonAddress(initialElement.value)}
                    </p>
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
