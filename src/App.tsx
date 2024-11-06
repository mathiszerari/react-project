import { Outlet } from "react-router-dom";
import Navigation from "./components/navigation";
import { useEffect } from "react";
import Notification from "./types/notification";
import { eventFetchFriendRequests } from "./services/friend-request.service";
import { FriendRequest } from "./types/friend-request";

export default function App() {

  function saveReceivedRequest(request: FriendRequest) {
    const notification: Notification = {
      id: request.id,
      type: "friend-request-received",
      emitterId: request.senderId,
      content: request.senderId + ' asked you in friend',
      receivedAt: request.requestedAt,
    }

    //TODO stocker les données dans le localStorage
  }    

  useEffect(() => {
    const handleNewFriendRequest = (request: any) => () => {
      console.log("request", request);
      saveReceivedRequest(request);
    }

    const eventSource = eventFetchFriendRequests(handleNewFriendRequest);

    return () => {
      eventSource.close();
    };
  }, [])

  return (
    <div>
      <Navigation />
      <Outlet />
    </div>
  );
}