import { Outlet, useLoaderData } from "react-router-dom";
import { useState } from "react";

import Notification from "./types/notification";

import Navigation from "./components/navigation";
import Notifications from "./components/notifications/notifications.component";
import { useNotificationStore } from "./stores/notification.store";

export default function App() {
 
  return (
    <div>
      <Navigation />
      <Notifications />
      <Outlet />
    </div>
  );
}
