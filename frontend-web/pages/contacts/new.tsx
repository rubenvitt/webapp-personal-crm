import React from "react";
import { CreatePersonForm } from "../../components/contacts/detail/create/create-form.component";
import { withPageAuthRequired } from "../../globals/auth0";

export const getServerSideProps = withPageAuthRequired();

const NewContactPage: React.FC = () => {
  return <CreatePersonForm />;
};
export default NewContactPage;
