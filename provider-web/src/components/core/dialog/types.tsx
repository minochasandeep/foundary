import { DialogProps as MUIDialogProps } from "@mui/material/Dialog";
import { ButtonProps } from "../button";
import { DialogTitleProps } from "@mui/material/DialogTitle";
import { DialogContentProps } from "@mui/material/DialogContent";
import { DialogActionsProps } from "@mui/material/DialogActions";

// The `DialogProps` interface extends MUI's `DialogProps`.
export interface DialogProps extends MUIDialogProps {
  /*If provided, the close button will be visible in the top right corner,
     and the specified action will be executed when clicked.*/
  onClose?: () => void;
  /**
   * If provided, the confirm button will be visible, and the specified action
   * will be executed when clicked.
   */
  onConfirm?: () => void;
  /**
   * If provided, the cancel button will be visible, and the specified action
   * will be executed when clicked.
   */
  disableConfirm?: boolean;
  /**
   * If provided yes, the Yes button will be disabled
   */
  onCancel?: () => void;
  /**
   * Props for customizing the style or title of the confirm button.
   */
  confirmButtonProps?: ButtonProps;
  /**
   * Props for customizing the style or title of the cancel button.
   */
  cancelButtonProps?: ButtonProps;
  /**
   * Props for customizing the styling of the dialog title.
   */
  dialogTitleProps?: DialogTitleProps;
  /**
   * Props for customizing the styling of the dialog content container.
   */
  dialogContentProps?: DialogContentProps;
  /**
   * Props for customizing the styling of the dialog action bar.
   */
  dialogActionProps?: DialogActionsProps;

  message?: string;
}
