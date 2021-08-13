// noinspection DuplicatedCode

import React from "react";
import { EditPersonForm } from "../../../../components/modules/contacts/detail-page/edit/edit-form.component";
import { withPageAuthRequired } from "../../../../config/auth0";
import { usePerson } from "../../../../services/person-service";

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(context) {
    return {
      props: {
        id: context.params.id,
      },
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
