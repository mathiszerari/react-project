import { Outlet } from "react-router-dom";
import Navigation from "./components/navigation";
import Notifications from "./components/notifications/notifications.component";

export default function App() {
  
  return (
    <div>
      <Notifications />
      <Navigation />
      <Outlet />
    </div>
  );
}