import React, { useEffect, useState } from "react";
import { mutate } from "swr";
import { ContentBox } from "../../common/content-box.component";
import {
  MailType,
  PersonAddress,
  PersonDetails,
  PersonMail,
  PersonPhone,
  PhoneType,
} from "../../../../global/interfaces";
import { URL_API_Persons } from "../../../../global/urls";
import {
  addMailAddress,
  addPhoneNumber,
  deleteMailAddress,
  deletePhoneNumber,
  updateMailAddress,
  updatePhoneNumber,
} from "../../../../services/person-service";
import { EditAddress } from "./edit/edit-address-input.component";
import { EditRadio } from "./edit/edit-input.component";

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
            deleteItem={{
              action: async (element) => {
                mutate(
                  `${URL_API_Persons}/${person._id}`,
                  {
                    ...person,
                    contact: {
                      phone: [
                        ...person.contact.phone.filter(
                          (value) => value._id !== element._id
                        ),
                      ],
                      ...person.contact,
                    },
                  },
                  false
                );

                await deletePhoneNumber(person, element);
                mutate(`${URL_API_Persons}/${person._id}`);
                return Promise.resolve();
              },
            }}
            addItem={{
              action: async (value) => {
                mutate(
                  `${URL_API_Persons}/${person._id}`,
                  {
                    ...person,
                    contact: {
                      phone: [
                        ...person.contact.phone,
                        {
                          value,
                          type: PhoneType.MOBILE,
                        },
                      ],
                      ...person.contact,
                    },
                  },
                  false
                );

                await addPhoneNumber(person, {
                  value,
                  type: PhoneType.MOBILE,
                });
                mutate(`${URL_API_Persons}/${person._id}`);
              },
            }}
            updateItem={{
              action: async (value) => {
                mutate(
                  `${URL_API_Persons}/${person._id}`,
                  {
                    ...person,
                    contact: {
                      phone: [
                        ...person.contact.phone.map((elem) => {
                          if (elem._id === value._id) {
                            return { ...elem, value: value.value };
                          }
                          return elem;
                        }),
                      ],
                      ...person.contact,
                    },
                  },
                  false
                );
                await updatePhoneNumber(person, value);
                mutate(`${URL_API_Persons}/${person._id}`);
              },
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
            addItem={{
              action: async (value) => {
                const element = {
                  value,
                  type: MailType.PRIVATE,
                };
                mutate(`${URL_API_Persons}/${person._id}`, {
                  ...person,
                  contact: {
                    mail: [...(person.contact.mail ?? []), element],
                    ...person.contact,
                  },
                });
                await addMailAddress(person, element);
                mutate(`${URL_API_Persons}/${person._id}`);
                return Promise.resolve();
              },
            }}
            updateItem={{
              action: async (value) => {
                mutate(
                  `${URL_API_Persons}/${person._id}`,
                  {
                    ...person,
                    contact: {
                      mail: [
                        ...person.contact.mail.map((elem) => {
                          if (elem._id === value._id) {
                            return { ...elem, value: value.value };
                          }
                          return elem;
                        }),
                      ],
                      ...person.contact,
                    },
                  },
                  false
                );
                await updateMailAddress(person, value);
                mutate(`${URL_API_Persons}/${person._id}`);
              },
            }}
            deleteItem={{
              action: async (element) => {
                mutate(
                  `${URL_API_Persons}/${person._id}`,
                  {
                    ...person,
                    contact: {
                      mail: [
                        ...person.contact.mail.filter(
                          (value) => value._id !== element._id
                        ),
                      ],
                      ...person.contact,
                    },
                  },
                  false
                );

                await deleteMailAddress(person, element);
                mutate(`${URL_API_Persons}/${person._id}`);
                return Promise.resolve();
              },
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
