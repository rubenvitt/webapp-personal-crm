import { FormLayout } from "../../common/form/form.layout.component";
import { FormSection } from "../../common/form/section.component";
import { classNames } from "../../../globals/utils";
import { TextInput } from "../../common/input.component";
import React from "react";
import useSWR from "swr";
import { AxiosError } from "axios";

export const IntegrationsForm: React.FC = ({ children }) => {
  const { data } = useSWR<{ username: string; password: string }, AxiosError>(
    "/dav/user/credentials"
  );
  const { data: url } = useSWR<{ url: string }>("/dav");

  return (
    <FormLayout className={classNames("lg:col-span-9")}>
      <FormSection
        title="Dav Integration"
        titleAsRow
        description="Deine DAV Ressourcen auf einen Blick."
      >
        <TextInput
          title="DAV URL"
          className="col-span-4 sm:col-span-4"
          clickToCopy
          disabled
          value={url?.url}
        />
        <TextInput
          title="DAV username"
          className="col-span-4 sm:col-span-2"
          disabled
          clickToCopy
          value={data?.username}
        />
        <TextInput
          title="DAV password"
          className="col-span-4 sm:col-span-2"
          disabled
          clickToCopy
          value={data?.password}
        />
      </FormSection>
    </FormLayout>
  );
};
