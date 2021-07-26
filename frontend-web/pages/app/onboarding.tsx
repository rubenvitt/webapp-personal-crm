import React, { useRef, useState } from "react";
import useSWR from "swr";
import create from "zustand";
import { withAuthenticatedTranslatedServerSideProps } from "../../api-functions/defaults";
import { AcceptableDocument } from "../../components-old/common/acceptable-document.component";
import { OnboardProgressContent } from "../../components-old/onboard/onboard-progress-content.component";
import { OnboardProgressNav } from "../../components-old/onboard/onboard-progress-nav.component";
import { Logger } from "../../globals/logging";

export const getServerSideProps = withAuthenticatedTranslatedServerSideProps();

interface FormLayout {
  privacy: {
    privacyCheck: boolean;
    agbCheck: boolean;
    updatePrivacy: (value: boolean) => void;
    updateAgb: (value: boolean) => void;
    valid: () => boolean;
  };
}

const useFormStore = create<FormLayout>((set, get) => ({
  privacy: {
    privacyCheck: false,
    agbCheck: false,
    valid: () => {
      return get().privacy.privacyCheck && get().privacy.agbCheck;
    },
    updatePrivacy: (value) => {
      set({
        privacy: {
          ...get().privacy,
          privacyCheck: value,
        },
      });
    },
    updateAgb: (value) => {
      set({
        privacy: {
          ...get().privacy,
          agbCheck: value,
        },
      });
    },
  },
}));

const Onboarding: React.ReactNode = () => {
  const { data } = useSWR<{ text }>("/privacy");

  const documentsForm = useRef<HTMLFormElement>();
  const [documentsFormValid, setDocumentsFormValid] = useState<boolean>();

  const { privacy } = useFormStore();

  return (
    <>
      <OnboardProgressNav
        steps={[
          {
            id: "privacy",
            name: "Privacy Policy & Terms of Service",
            href: "#",
            status: "complete",
          },
          {
            id: "general",
            name: "Name",
            href: "#",
            status: "current",
          },
          {
            id: "Plans & Payment",
            name: "Test1",
            href: "#",
            status: "upcomming",
          },
          {
            id: "App Setup",
            name: "Test",
            href: "#",
            status: "upcomming",
          },
        ]}
      />
      <OnboardProgressContent
        stepId="1"
        next={{
          disabled: !privacy?.valid(),
          onSubmit: () => {
            const valid = documentsForm.current.reportValidity();
            if (valid) {
              alert("test");
              return Promise.resolve();
            } else {
              return Promise.reject();
            }
          },
        }}
      >
        <form ref={documentsForm}>
          <AcceptableDocument
            content={data?.text}
            id="privacy-policy"
            label={{
              withArticle: "die Datenschutzerklärung",
              title: "Datenschutzerklärung",
            }}
            required
            onChange={(value) => {
              Logger.log("update with value", value);
              privacy.updatePrivacy(value);
            }}
          />
          <AcceptableDocument
            content={data?.text}
            className={"mt-4"}
            id="agb"
            label={{
              withArticle: "die allgemeinen Geschäftsbedingungen",
              title: "Allgemeine Geschäftsbedingungen",
            }}
            required
            onChange={privacy.updateAgb}
          />
        </form>
      </OnboardProgressContent>
    </>
  );
};

export default Onboarding;
