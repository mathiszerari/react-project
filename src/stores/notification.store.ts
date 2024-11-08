import { create } from "zustand/react";

import Notification from "../types/notification";
import { EventName, NotificationService } from "../services/notification.service";

const notificationService = new NotificationService();

type NotificationsStore = {
  notifications: Notification[];
  service: NotificationService;
  setNotifications: (notifications: Notification[]) => void;
  addNotification: (notification: Notification) => void;
  getMessagesNotifications: () => Notification[];
  getFriendRequestReceivedNotifications: () => Notification[];
  getFriendRequestAcceptedNotifications: () => Notification[];
};

export const useNotificationStore = create<NotificationsStore>((set, get) => ({
  notifications: [],
  service: notificationService,
  setNotifications: (notifications: Notification[]) => set({ notifications }),
  addNotification: (notification: Notification) =>
    set((state) => ({ notifications: [notification, ...state.notifications] })),
  getMessagesNotifications: () =>
    get().notifications.filter((notification) => notification.type === EventName.MESSAGE_RECEIVED),
  getFriendRequestReceivedNotifications: () =>
    get().notifications.filter((notification) => notification.type === EventName.FRIEND_REQUEST_RECEIVED),
  getFriendRequestAcceptedNotifications: () =>
    get().notifications.filter((notification) => notification.type === EventName.FRIEND_REQUEST_ACCEPTED),
}));
