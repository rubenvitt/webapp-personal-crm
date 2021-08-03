import create from "zustand";

interface FormLayout {
  privacy: {
    privacyCheck: boolean;
    agbCheck: boolean;
    updatePrivacy: (value: boolean) => void;
    updateAgb: (value: boolean) => void;
    valid: () => boolean;
  };
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
