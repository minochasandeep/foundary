import { useContext } from "react";
import {
  NotificationContext,
  NotificationContextProps,
} from "@/context/notification-context";

export const useNotification = (): NotificationContextProps =>
  useContext(NotificationContext);
