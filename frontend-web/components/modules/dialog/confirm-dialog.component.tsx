import { ActionType } from "../../../global/interfaces";
import { MaybeAsyncAction, WithForcedChildren } from "../../../global/types";
import { Button } from "../../elements/common/button.component";
import { Dialog } from "./dialog.component";
import { Dialog as HeadlessDialog } from "@headlessui/react";

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
    action: MaybeAsyncAction;
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
  return (
    <Dialog open={open} withClose={withClose} onClose={onClose}>
      <HeadlessDialog.Title as="h3" className="font-bold text-lg">
        {title}
      </HeadlessDialog.Title>
      <div>{children}</div>
      <div className="flex justify-end space-x-1 mt-2 pt-2 border-t">
        {(cancel?.visible ?? true) && (
          <Button
            action={cancel?.action ?? onClose}
            actionType={cancel?.type ?? ActionType.ARCHIVE}
          >
            {cancel?.label ?? "Abbrechen"}
          </Button>
        )}
        {(success?.visible ?? true) && (
          <Button
            action={success?.action}
            actionType={success?.type ?? ActionType.PRIMARY}
          >
            {success?.label ?? "OK"}
          </Button>
        )}
      </div>
    </Dialog>
  );
}
