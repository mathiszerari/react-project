import { useEffect } from "react";
import { eventAcceptedFriendRequest } from "../../services/friend-request.service";
import { countUnseenNotifications } from "../../utils/count-unseen-notifications";
import Notification from "../../types/notification";
import { useNotificationStore } from "../../stores/notification.store";

export default function FriendRequestAccepted() {

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
    console.log(notifications)
    countUnseenNotifications(notifications);
  }



  useEffect(() => {
    const handleAcceptedFriendRequest = (request: any) => {
      saveAcceptedRequest(request);
    }

    const eventSource = eventAcceptedFriendRequest(handleAcceptedFriendRequest);

    return () => {
      eventSource.close();
    };
  }, [])

  return null
}