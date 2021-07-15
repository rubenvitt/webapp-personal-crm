import { Button } from "../common/button.component";
import { classNames } from "../../globals/utils";
import { ActionType } from "../../globals/interfaces";

interface Props {
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
}

export const OnboardProgressContent: React.FC<Props> = ({
  children,
  className,
  next,
  back,
}) => {
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
          asyncAction={back?.onSubmit}
          customColor="gray"
          isDisabled={back?.disabled}
        >
          {back?.label ?? "Zurück"}
        </Button>
        <Button
          asyncAction={next?.onSubmit}
          type={ActionType.PRIMARY}
          isDisabled={next?.disabled}
        >
          {next?.label ?? "Weiter"}
        </Button>
      </div>
    </div>
  );
};
