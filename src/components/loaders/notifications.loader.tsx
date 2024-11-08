import Notification from "../../types/notification";

export const NotificationsLoader = ({
  params,
}: {
  params: Record<string, string | undefined>;
}) => {
  const storedNotifications: string | null =
    localStorage.getItem("notifications");
  const parsedNotifications: Notification[] = storedNotifications
    ? JSON.parse(storedNotifications)
    : [];
  return parsedNotifications;
};
