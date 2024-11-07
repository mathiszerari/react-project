import FriendRequestReceived from "./friend-request-accepted.component";
import FriendRequestAccepted from "./friend-request-received.component";
import { NotificationService } from "../../services/notification.service";
import { useNotificationStore } from "../../stores/notification.store";

export default function Notifications() {

  const { service } = useNotificationStore();

  return (
    <>
      <FriendRequestReceived notificationService={service}/>
      <FriendRequestAccepted notificationService={service}/>
    </>
  );
}
