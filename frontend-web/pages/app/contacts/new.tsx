import React from "react";
import { withAuthenticatedTranslatedServerSideProps } from "../../../api-functions/defaults";
import { CreatePersonForm } from "../../../components/modules/contacts/create/create-form.component";

export const getServerSideProps = withAuthenticatedTranslatedServerSideProps();

const NewContactPage: React.FC = () => {
  return <CreatePersonForm />;
};
export default NewContactPage;
