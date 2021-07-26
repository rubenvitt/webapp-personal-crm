// noinspection DuplicatedCode

import React from "react";
import { withAuthenticatedTranslatedServerSideProps } from "../../../../api-functions/defaults";
import { EditPersonForm } from "../../../../components-old/contacts/detail/edit/edit-form.component";
import { usePerson } from "../../../../services/person-service";

export const getServerSideProps = withAuthenticatedTranslatedServerSideProps({
  additionalProps: (context) => {
    return {
      id: context.params.id,
    };
  },
});

const EditPersonPage: React.ReactNode = ({ id }) => {
  const { person, isLoading } = usePerson(id);
  return (
    <>
      {isLoading || !person ? <>Loading</> : <EditPersonForm person={person} />}
    </>
  );
};

export default EditPersonPage;
