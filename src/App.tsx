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
      receivedAt: request.requestedAt,
      didIAccept: false,
      status: "pending-request",
    }
    const existingNotifications = JSON.parse(localStorage.getItem('notifications') || '[]');
    const updatedNotifications = [notification, ...existingNotifications];
    localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
  }    
  
  function saveAcceptedRequest(request: any) {
    const notification: Notification = {
      id: crypto.randomUUID(),
      type: "friend-request-accepted",
      emitterId: request.userId,
      receivedAt: new Date().toISOString(),
      status: "my-friend-request-accepted",
    }
    const existingNotifications = JSON.parse(localStorage.getItem('notifications') || '[]');
    const updatedNotifications = [notification, ...existingNotifications];
    localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
  }

  useEffect(() => {
    const handleNewFriendRequest = (request: any) => {
      saveReceivedRequest(request);
    }

    const eventSource = eventFetchFriendRequests(handleNewFriendRequest);

    return () => {
      eventSource.close();
    };
  }, [])

  useEffect(() => {
    const handleAcceptedFriendRequest = (request: any) => {
      saveAcceptedRequest(request);
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