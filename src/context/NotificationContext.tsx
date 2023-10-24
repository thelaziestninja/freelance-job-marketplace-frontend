import { createContext } from "react";

export interface NotificationContextType {
  message: string | null;
  setMessage: (message: string) => void;
}

export const NotificationContext = createContext<
  NotificationContextType | undefined
>(undefined);
