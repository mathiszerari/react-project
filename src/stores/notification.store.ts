import { create } from "zustand/react";

import Notification from "../types/notification";

type NotificationsStore = {
  notifications: Notification[];
  setNotifications: (notifications: Notification[]) => void;
  addNotification: (notification: Notification) => void;
}
export const useNotificationStore = create<NotificationsStore>((set) => ({
  notifications: [],
  setNotifications: (notifications: Notification[]) => set({notifications}),
  addNotification: (notification: Notification) => set((state) => ({ notifications: [notification, ...state.notifications] })),
}))