import { ReactNode, createContext, useState } from "react";

export interface NotificationContextType {
  message: string | null;
  setMessage: (message: string) => void;
}

export const NotificationContext = createContext<
  NotificationContextType | undefined
>(undefined);

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({
  children,
}) => {
  const [message, setMessage] = useState<string | null>(null);

  return (
    <NotificationContext.Provider value={{ message, setMessage }}>
      {children}
    </NotificationContext.Provider>
  );
};
