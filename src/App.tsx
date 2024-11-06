import { Outlet } from "react-router-dom";
import Navigation from "./components/navigation";
import { useEffect } from "react";
import { eventAcceptedFriendRequest, eventFetchFriendRequests } from "./services/friend-request.service";
import { useNotificationStore } from "./stores/notification.store";
import { FriendRequestReceivedDTO } from "./dtos/friend-request-received.dto";
import { FriendRequestAcceptedDTO } from "./dtos/friend-request-accepted.dto";

export default function App() {

  const { notifications, addNotification } = useNotificationStore();

  useEffect(() => {
    const handleNewFriendRequest = (data: FriendRequestReceivedDTO ) => {
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

  useEffect(() => {
    const handleFriendRequestAccepted = (data: FriendRequestAcceptedDTO) => {
      setFriendRequests(prevRequests => { return [data, ...prevRequests]; });
      const notification = {
        id: data.id,
        type: "friend-request-accepted",
        emitterId: data.senderId,
        content: 'A user asked you in friend',
        receivedAt: data.requestedAt,
      }
      console.log(data);
      addNotification(notification);
    };

    const eventSource = eventAcceptedFriendRequest(handleFriendRequestAccepted);

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

