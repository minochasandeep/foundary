// react imports
import React, { createContext, ReactNode, useState } from "react";
// mui imports
import Snackbar from "@mui/material/Snackbar";
import MUIAlert, { AlertProps } from "@mui/material/Alert";
import { styled, Typography, useTheme } from "@mui/material";

interface IAlert extends AlertProps {
  background?: string;
}

export const Alert = styled(MUIAlert)<IAlert>(({ background }) => ({
  background,
}));

// types
export interface NotificationContextProps {
  showNotification: (
    type: "error" | "success" | "warning",
    message: string,
  ) => void;
  hideNotification: () => void;
}

export interface NotificationProps {
  open?: boolean;
  type?: "error" | "success" | "warning";
  message?: string;
}

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationContext = createContext<NotificationContextProps>({
  showNotification: () => {},
  hideNotification: () => {},
});

// Create the provider component
export const NotificationProvider: React.FC<NotificationProviderProps> = ({
  children,
}) => {
  const [notification, setNotification] = useState<NotificationProps>({});
  const theme = useTheme();

  const CUSTOM_COLORS_MAPPING = {
    success: theme.palette.success.light,
    info: theme.palette.info.light,
    error: theme.palette.error.main,
    warning: theme.palette.warning.light,
  };

  const showNotification = (
    type: "error" | "success" | "warning",
    message: string,
  ) => {
    setNotification({
      open: true,
      type,
      message,
    });
  };

  const hideNotification = () => {
    setNotification({
      ...notification,
      open: false,
    });
  };

  return (
    <NotificationContext.Provider
      value={{
        showNotification,
        hideNotification,
      }}
    >
      {children}
      <Snackbar
        open={notification.open}
        onClose={() => hideNotification()}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          severity={notification.type}
          variant="filled"
          onClose={() => hideNotification()}
          background={CUSTOM_COLORS_MAPPING[notification.type || "success"]}
          sx={{ width: "100%", whiteSpace: "pre-line" }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </NotificationContext.Provider>
  );
};
