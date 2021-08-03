import { ActionType } from "../../../global/interfaces";
import { useAppRouter } from "../../../global/router";
import { WithForcedChildren } from "../../../global/types";
import { classNames } from "../../../global/utils";
import { Button } from "../../elements/common/button.component";

type Props = WithForcedChildren<{
  stepId: string;
  className?: string;
  next?: {
    onSubmit?: () => Promise<void>;
    label?: string;
    disabled?: boolean;
  };
  back?: {
    onSubmit?: () => Promise<void>;
    label?: string;
    disabled?: boolean;
  };
}>;

export function OnboardProgressContent({
  children,
  className,
  next,
  back,
}: Props): JSX.Element {
  const { push } = useAppRouter();

  return (
    <div
      className={classNames(
        className,
        "bg-white relative overflow-hidden shadow rounded-b-lg divide-y divide-gray-200"
      )}
    >
      <div className="px-4 py-5 sm:p-6">{children}</div>
      <div className="px-4 py-4 sm:px-6 space-x-2 justify-end flex">
        <Button
          action={back?.onSubmit}
          customColor="gray"
          isDisabled={back?.disabled}
        >
          {back?.label ?? "Zurück"}
        </Button>
        <Button
          action={() => {
            return next?.onSubmit().then(() => {
              return push("/onboarding");
            });
          }}
          actionType={ActionType.PRIMARY}
          isDisabled={next?.disabled}
        >
          {next?.label ?? "Weiter"}
        </Button>
      </div>
    </div>
  );
}
