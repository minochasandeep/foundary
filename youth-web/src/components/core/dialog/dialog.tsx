import React from "react";

import MuiDialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";

import { DialogProps } from "./types";
import { Button, ButtonProps } from "../button";

const Dialog: React.FC<DialogProps> = ({
  open,
  children,
  title,
  message,
  onClose,
  onCancel,
  onConfirm,
  disableConfirm,
  confirmButtonProps,
  cancelButtonProps,
  dialogContentProps,
  dialogActionProps,
  dialogTitleProps,
  ...restDialogProps
}) => {
  const { sx: dialogContentSx, ...dialogContentRest } =
    dialogContentProps || {};
  const { sx: dialogActionSx, ...dialogActionRest } = dialogActionProps || {};
  const { sx: dialogTitleSx, ...dialogTitleRest } = dialogTitleProps || {};
  const { sx: dialogSx, ...dialogRest } = restDialogProps || {};

  const { sx: cnfBtnSx, ...cnfBtnRest } =
    confirmButtonProps || ({} as ButtonProps);
  cnfBtnRest.title = cnfBtnRest.title || "Yes";
  const { sx: cclBtnSx, ...cclBtnRest } = cancelButtonProps || {};

  return (
    <MuiDialog
      open={open}
      fullWidth
      maxWidth={"sm"}
      onClose={onClose}
      sx={{
        borderRadius: "10px",
        ...dialogSx,
      }}
      {...dialogRest}
    >
      <DialogTitle
        sx={{
          m: 0,
          p: 2,
          height: "20px",
          lineHeight: "24px",
          fontWeight: "semibold",
          ...dialogTitleSx,
        }}
        id="customized-dialog-title"
        {...dialogTitleRest}
      >
        {title}
      </DialogTitle>
      {onClose && (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      )}
      <DialogContent
        sx={{
          p: 2,
          ...dialogContentSx,
        }}
        {...dialogContentRest}
      >
        {message && (
          <Typography sx={{ height: "18px", overflow: "visible" }}>
            {message}
          </Typography>
        )}
        {children}
      </DialogContent>
      {(onCancel || onConfirm) && (
        <DialogActions
          sx={{
            p: 2,
            ...dialogActionSx,
          }}
          {...dialogActionRest}
        >
          {onCancel && (
            <Button
              variant="outlined"
              color="inherit"
              title="Cancel"
              onClick={onCancel}
              sx={{
                borderRadius: "5px",
                height: "36px",
                width: "80px",
                ...cclBtnSx,
              }}
              {...cclBtnRest}
            />
          )}
          {onConfirm && (
            <Button
              onClick={onConfirm}
              disabled={disableConfirm}
              sx={{
                borderRadius: "5px",
                height: "36px",
                width: "80px",
                ...cnfBtnSx,
              }}
              {...cnfBtnRest}
            />
          )}
        </DialogActions>
      )}
    </MuiDialog>
  );
};

export default Dialog;
