import { acceptRequest } from "../services/friend-request.service";
import { useNotificationStore } from "../stores/notification.store";
import { FriendRequest } from "../types/friend-request";
import Notification from "../types/notification";
import { dateFormater } from "../utils/dateFormater";
import Button from "./buttons/button";

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
            <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ffiverr-res.cloudinary.com%2Fimages%2Ft_main1%2Cq_auto%2Cf_auto%2Cq_auto%2Cf_auto%2Fgigs%2F55353524%2Foriginal%2F7892661bbe7146c7698d340085ce35e335e50c09%2Fcreate-a-wii-mii-profile-picture.jpg&f=1&nofb=1&ipt=451f0aff439af51981b4ceb34719ecf92fe888e28e751bafea4bdf7cdf7f61aa&ipo=images" alt="profil-picture" />
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