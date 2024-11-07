import { acceptRequest } from "../services/friend-request.service";
import { useNotificationStore } from "../stores/notification.store";
import { FriendRequest } from "../types/friend-request";
import Notification from "../types/notification";
import { dateFormater } from "../utils/dateFormater";

export default function FriendRequestCard({request, removeFriendRequest} : {request: FriendRequest, removeFriendRequest : (friendRequest: FriendRequest) => void}) {
  const { notifications, setNotifications } = useNotificationStore();


  async function updateAcceptedRequestsNotifications() {
    await acceptRequest(request.id.toString());
    
    const updatedNotifications = notifications.map((notification: Notification) => {
      if (notification.id === request.id) {
        return {
          ...notification,
          didIAccept: true,
          isSeen: true,
        };
      }
      return notification;
    });
    
    setNotifications(updatedNotifications)
    removeFriendRequest(request)
  
  }

  return (
    <div key={request.id} className="m-4 flex justify-center w-3/4 items-center mx-auto ">
      <div className="flex border justify-between w-full p-2 rounded-full">

        <div className="flex flex-col">
          <span> send by : {request.senderId}</span>
          <span>{dateFormater(request.requestedAt)}</span>
        </div>

        <button
          className="justify-end border px-6 rounded-full mx-24 bg-green-100"
          onClick={updateAcceptedRequestsNotifications}>
          Accept
        </button>

      </div>
    </div>
  );
}