import React from "react";
import { CreatePersonForm } from "../../../components/modules/contacts/create/create-form.component";
import { withPageAuthRequired } from "../../../config/auth0";

export const getServerSideProps = withPageAuthRequired();

const NewContactPage: React.FC = () => {
  return <CreatePersonForm />;
};
export default NewContactPage;
