// frontend2/src/components/Notification.tsx
import React from "react";
import { useNotificationContext } from "../../context/useNotificationContext";

const Notification: React.FC = () => {
  const { message } = useNotificationContext(); // Using the custom hook here

  if (!message) return null;

  return <div className="notification">{message}</div>;
};

export default Notification;
