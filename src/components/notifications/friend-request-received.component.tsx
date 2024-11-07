import { useEffect } from "react";
import { countUnseenNotifications } from "../../utils/count-unseen-notifications";
import Notification from "../../types/notification";
import { useNotificationStore } from "../../stores/notification.store";
import { NotificationService, EventName } from "../../services/notification.service";

export default function FriendRequestReceived({ notificationService }: { notificationService: NotificationService }) {
  const { notifications, addNotification } = useNotificationStore();

  function saveReceivedRequest(request: any) {
    const notification: Notification = {
      id: request.id,
      type: "friend-request-received",
      emitterId: request.senderId,
      receivedAt: request.requestedAt,
      didIAccept: false,
      status: "pending-request",
      isSeen: false,
    };
    addNotification(notification);
    const existingNotifications = JSON.parse(
      localStorage.getItem("notifications") || "[]"
    );
    const updatedNotifications = [notification, ...existingNotifications];
    localStorage.setItem("notifications", JSON.stringify(updatedNotifications));
    countUnseenNotifications(notifications);
  }

  useEffect(() => {

    const handleNewFriendRequest = (request: any) => {
      console.log("get the request");
      saveReceivedRequest(request);
    };
    const eventSource = notificationService.eventListener(handleNewFriendRequest, EventName.FRIEND_REQUEST_RECEIVED);

    return () => {
      eventSource.close();
    };
  }, []);

  return null;
}
