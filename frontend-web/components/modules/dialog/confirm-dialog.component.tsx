import { ActionType } from "../../../globals/interfaces";
import { WithForcedChildren } from "../../../globals/types";
import { Button } from "../../elements/common/button.component";
import { Dialog } from "./dialog.component";

type Props = WithForcedChildren<{
  withClose?: boolean;
  onClose: () => void;
  open: boolean;
  title: string;
  cancel?: {
    label?: string;
    action?: () => void;
    visible?: boolean;
    type?: ActionType;
    isLoading?: boolean;
  };
  success?: {
    label?: string;
    action: () => Promise<void>;
    visible?: boolean;
    type?: ActionType;
    isLoading?: boolean;
  };
}>;

export function ConfirmDialog({
  onClose,
  withClose = false,
  children,
  title,
  success,
  cancel,
  open,
}: Props): JSX.Element {
  if (!open) {
    return <></>;
  }

  return (
    <Dialog withClose={withClose} onClose={onClose}>
      <h2 className="font-bold text-lg">{title}</h2>
      <div>{children}</div>
      <div className="flex justify-end space-x-1 mt-2 pt-2 border-t">
        {(cancel?.visible ?? true) && (
          <Button
            action={cancel?.action ?? onClose}
            type={cancel?.type ?? ActionType.ARCHIVE}
          >
            {cancel?.label ?? "Abbrechen"}
          </Button>
        )}
        {(success?.visible ?? true) && (
          <Button
            action={success?.action}
            type={success?.type ?? ActionType.PRIMARY}
          >
            {success?.label ?? "OK"}
          </Button>
        )}
      </div>
    </Dialog>
  );
}
