import { useEffect, useState } from "react";
import { Friend } from "../types/friend";
import { getUserFriends } from "../services/friend.service";
import Notification from "../types/notification";

export default function NotificationListPage() {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const storedNotifications = localStorage.getItem('notifications');
    const parsedNotifications = storedNotifications ? JSON.parse(storedNotifications) : [];
    setNotifications(parsedNotifications);

    getUserFriends().then(fetchedFriends => {
      setFriends(fetchedFriends);
      
      const updatedNotifications = parsedNotifications.map((notification: Notification) => {
        if (notification.didIAccept) {
          const selectedFriend = fetchedFriends.find(
            (friend: Friend) => friend.userId === notification.emitterId
          );
          
          if (selectedFriend) {
            return {
              ...notification,
              status: "friend-accepted",
              emitterUsername: selectedFriend.username
            };
          }
        }
        return notification;
      });

      setNotifications(updatedNotifications);
      localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
    });
  }, []);

  if (!notifications || notifications.length === 0) {
    return (
      <div className="p-4">
        <span className="text-lg font-medium">Notifications</span>
        <p className="mt-4 text-gray-500">No notifications to display</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <span className="text-lg font-medium">Notifications</span>
      <div className="mt-4 space-y-4">
        {notifications.map((notification: Notification) => (
          <div key={notification.id} className="rounded-lg shadow-sm">
            <div
              className={
                notification.type === "friend-request-received"
                  ? "bg-green-100 border-green-200 p-4 rounded-lg border"
                  : "bg-blue-100 border-blue-200 p-4 rounded-lg border"
              }
            >
              {notification.status === 'friend-accepted' && (
                <span>{notification.emitterUsername} accepted to be your friend</span>
              )}
              {notification.status === 'my-friend-request-accepted' && (
                <span>{notification.emitterId} accepted your friend request</span>
              )}
              {notification.status === 'pending-request' && (
                <span>{notification.emitterId} sent you a friend request</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}