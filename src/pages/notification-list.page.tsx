import { useNotificationStore } from "../stores/notification.store";

export default function NotificationListPage() {
  const { notifications, addNotification } = useNotificationStore();

  return (
    <div>NotificationListPage</div>
  );
}