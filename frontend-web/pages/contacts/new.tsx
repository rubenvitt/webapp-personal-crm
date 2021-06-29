import React, { useReducer } from "react";
import { CreatePersonForm } from "../../components/contacts/detail/create/create-form.component";

interface FormType {
  gender: string;
  anrede: string;
  givenName: string;
  familyName: string;
  nickName: string;
}

const EMPTY_FORM_VALUE: FormType = {
  gender: "",
  anrede: "",
  givenName: "",
  familyName: "",
  nickName: "",
};

const NewContactPage: React.FC = () => {
  const reducer = (
    state: FormType,
    action: {
      name:
        | "gender"
        | "givenName"
        | "reset"
        | "familyName"
        | "nickName"
        | "anrede";
      value?: string;
    }
  ) => {
    if (action.name === "reset") {
      return EMPTY_FORM_VALUE;
    }
    return {
      ...state,
      [action.name]: action.value,
    };
  };

  const [formData, dispatch] = useReducer(reducer, EMPTY_FORM_VALUE);

  return <CreatePersonForm />;
};
export default NewContactPage;
