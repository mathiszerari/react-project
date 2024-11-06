import { Outlet } from "react-router-dom";
import Navigation from "./components/navigation";
import { useEffect } from "react";
import { eventFetchFriendRequests } from "./services/friend-request.service";
import { useNotificationStore } from "./stores/notification.store";

export default function App() {

  const { notifications, addNotification } = useNotificationStore();

  useEffect(() => {
    const handleNewFriendRequest = (data: { userId: string }) => {
      setFriendRequests(prevRequests => { return [data, ...prevRequests]; });
      const notification = {
        id: crypto.randomUUID(),
        type: "friend-request-received",
        emitterId: data.userId,
        content: 'A user asked you in friend',
        receivedAt: new Date().toISOString(),
      }
      console.log(data);
      addNotification(notification);
    };

    const eventSource = eventFetchFriendRequests(handleNewFriendRequest);

    return () => {
      eventSource.close();
    };
  })

  return (
    <div>
      <Navigation />
      <Outlet />
    </div>
  );
}
function setFriendRequests(arg0: (prevRequests: any) => any[]) {
  throw new Error("Function not implemented.");
}

