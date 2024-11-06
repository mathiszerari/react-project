import { useEffect } from "react";

export default function NotificationListPage() {
  const notifications = JSON.parse(localStorage.getItem('notifications') || '[]');

  useEffect(() => {
    console.log(notifications);
  }, []);

  return (
    <div>NotificationListPage</div>
  );
}