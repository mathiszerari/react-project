import { useEffect } from "react";
import { eventAcceptedFriendRequest } from "../../services/friend-request.service";
import { countUnseenNotifications } from "../../utils/count-unseen-notifications";
import Notification from "../../types/notification";

export default function FriendRequestAccepted() {

  function saveAcceptedRequest(request: any) {
    const notification: Notification = {
      id: crypto.randomUUID(),
      type: "friend-request-accepted",
      emitterId: request.userId,
      receivedAt: new Date().toISOString(),
      status: "my-friend-request-accepted",
      isSeen: false,
    }
    const existingNotifications = JSON.parse(localStorage.getItem('notifications') || '[]');
    const updatedNotifications = [notification, ...existingNotifications];
    localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
    countUnseenNotifications();
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