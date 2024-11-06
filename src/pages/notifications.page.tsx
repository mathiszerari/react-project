import { useEffect } from "react";

export default function NotificationListPage() {

  useEffect(() => {
    console.log("notifications");
  }, []);

  return (
    <div>NotificationListPage</div>
  );
}