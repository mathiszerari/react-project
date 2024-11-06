import { Outlet } from "react-router-dom";
import Navigation from "./components/navigation";
import { useEffect } from "react";
import Notification from "./types/notification";
import { eventAcceptedFriendRequest, eventFetchFriendRequests } from "./services/friend-request.service";

export default function App() {

  function saveReceivedRequest(request: any) {
    const notification: Notification = {
      id: request.id,
      type: "friend-request-received",
      emitterId: request.senderId,
      content: request.senderId + ' asked you in friend',
      receivedAt: request.requestedAt,
    }

    console.log(notification);

    //TODO stocker les données dans le localStorage
  }    

  function saveAcceptedRequest(request: string) {
    const notification: Notification = {
      id: crypto.randomUUID(),
      type: "friend-request-accepted",
      emitterId: request,
      content: request + ' accepted to be your friend',
      receivedAt: new Date().toISOString(),
    }

    console.log(notification);

    //TODO stocker les données dans le localStorage
  }    

  useEffect(() => {
    const handleNewFriendRequest = (request: any) => {
      saveAcceptedRequest(request);
    }

    const eventSource = eventFetchFriendRequests(handleNewFriendRequest);

    return () => {
      eventSource.close();
    };
  }, [])

  useEffect(() => {
    console.log("notifications");
    
    const handleAcceptedFriendRequest = (request: any) => {
      saveReceivedRequest(request);
      console.log("success");
    }

    const eventSource = eventAcceptedFriendRequest(handleAcceptedFriendRequest);

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