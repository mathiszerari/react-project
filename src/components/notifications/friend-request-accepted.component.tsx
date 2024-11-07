import { useEffect } from "react";
import { countUnseenNotifications } from "../../utils/count-unseen-notifications";
import Notification from "../../types/notification";
import { useNotificationStore } from "../../stores/notification.store";
import { NotificationService, EventName } from "../../services/notification.service";

export default function FriendRequestAccepted({ notificationService }: { notificationService: NotificationService }) {

  const { notifications, addNotification } = useNotificationStore();

  function saveAcceptedRequest(request: any) {
    const notification: Notification = {
      id: crypto.randomUUID(),
      type: "friend-request-accepted",
      emitterId: request.userId,
      receivedAt: new Date().toISOString(),
      status: "my-friend-request-accepted",
      isSeen: false,
    }
    
    addNotification(notification);
    countUnseenNotifications(notifications);
  }



  useEffect(() => {
    const handleAcceptedFriendRequest = (request: any) => {
      saveAcceptedRequest(request);
    }
    const eventSource = notificationService.eventListener(handleAcceptedFriendRequest, EventName.FRIEND_REQUEST_ACCEPTED);

    return () => {
      eventSource.close();
    };
  }, [])

  return null
}