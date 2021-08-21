import create from "zustand";
import { AvailableOnboardingStep } from "../global/interfaces";
import { LAST_AGB_VERSION, LAST_PRIVACY_VERSION } from "../global/onboarding";

interface FormLayout {
  privacy: {
    privacyCheck: boolean;
    agbCheck: boolean;
    updatePrivacy: (value: boolean) => void;
    updateAgb: (value: boolean) => void;
    valid: () => boolean;
  };
}

export function checkDataForStep(
  step: AvailableOnboardingStep,
  data: unknown
): boolean {
  switch (step) {
    case "consent":
      return (
        (data as { privacy: string }).privacy === LAST_PRIVACY_VERSION &&
        (data as { agb: string }).agb === LAST_AGB_VERSION
      );
    default:
      return true;
  }
}

export const useFormStore = create<FormLayout>((set, get) => ({
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
