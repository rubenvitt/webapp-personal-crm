import React from "react";
import { useQuery } from "react-query";
import { apiAxios } from "../../../../axios";
import { classNames } from "../../../../global/utils";
import { TextInput } from "../../../elements/common/input.component";
import { FormLayout } from "../../common/form/form.layout.component";
import { FormSection } from "../../common/form/section.component";

export function IntegrationsForm(): JSX.Element {
  const { data } = useQuery("/dav/user/credentials", () => {
    return apiAxios
      .get<{ username: string; password: string }>("/dav/user/credentials")
      .then((value) => value.data);
  });
  const { data: url } = useQuery("/dav", () => {
    return apiAxios.get<{ url: string }>("/dav").then((value) => value.data);
  });

  return (
    <FormLayout className={classNames("lg:col-span-9")}>
      <FormSection
        title="Dav Integration"
        titleAsRow
        description="Deine DAV Ressourcen auf einen Blick."
      >
        <TextInput
          title="DAV URL"
          label="DAV URL"
          className="col-span-4 sm:col-span-4"
          copyOnly
          change={() => undefined}
          disabled
          value={url?.url}
        />
        <TextInput
          title="DAV username"
          label="DAV username"
          className="col-span-4 sm:col-span-2"
          disabled
          copyOnly
          change={() => undefined}
          value={data?.username}
        />
        <TextInput
          title="DAV password"
          label="DAV password"
          className="col-span-4 sm:col-span-2"
          disabled
          copyOnly
          type="password"
          change={() => undefined}
          value={data?.password}
        />
      </FormSection>
    </FormLayout>
  );
}
