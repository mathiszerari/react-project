import { acceptRequest } from "../services/friend-request.service";
import { useNotificationStore } from "../stores/notification.store";
import { FriendRequest } from "../types/friend-request";
import Notification from "../types/notification";
import { dateFormater } from "../utils/dateFormater";
import Button from "./buttons/button";
import profilePicture from "../assets/images/mii-profile-picture.jpg"

export default function FriendRequestCard({ request, removeFriendRequest }: { request: FriendRequest, removeFriendRequest: (friendRequest: FriendRequest) => void }) {
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
      <div className=''>
        <div className='friend-request-card'>
          <div className='friend-request-card-info'>
            <img src={profilePicture} alt="profil-picture" />
            <p>{request.senderId}</p>
          </div>

          <div className="ml-16">
            <Button
              className="relative right-2"
              variant="primary"
              label="Accept"
              onClick={updateAcceptedRequestsNotifications}
            />
          </div>

        </div>
      </div>


    </div>
  );
}