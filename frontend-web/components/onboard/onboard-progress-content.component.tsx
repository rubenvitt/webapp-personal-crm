import { Button } from "../common/button.component";
import { classNames } from "../../globals/utils";

interface Props {
  stepId: string;
  className?: string;
}

export const OnboardProgressContent: React.FC<Props> = ({
  children,
  className,
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
        <Button customColor="gray">Back</Button>
        <Button>Next</Button>
      </div>
    </div>
  );
};
