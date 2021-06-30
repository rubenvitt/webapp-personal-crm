import { Dialog } from "./dialog.component";
import { Button } from "../button.component";
import { ActionType } from "../../../globals/interfaces";

interface Props {
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
}

export const ConfirmDialog: React.FC<Props> = ({
  onClose,
  withClose = false,
  children,
  title,
  success,
  cancel,
  open,
}) => {
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
            asyncAction={success?.action}
            type={success?.type ?? ActionType.PRIMARY}
          >
            {success?.label ?? "OK"}
          </Button>
        )}
      </div>
    </Dialog>
  );
};
