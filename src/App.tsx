import { Outlet, useLoaderData } from "react-router-dom";
import { useState } from "react";

import Notification from "./types/notification";

import Navigation from "./components/navigation";
import Notifications from "./components/notifications/notifications.component";
import { useNotificationStore } from "./stores/notification.store";

export default function App() {

  return (
    <div className="border w-full h-full flex flex-col justify-between">
      <Notifications />
      <Outlet />
      <Navigation />
    </div>
  );
}
