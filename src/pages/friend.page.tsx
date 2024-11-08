import { useEffect, useState } from "react";
import FriendRequestCard from "../components/friend-request-card.component";
import { fetchFriendRequests } from "../services/friend-request.service";
import Loader from "../components/loaders/spinner/loader.component";
import { FriendRequest } from "../types/friend-request";
import AddFriend from "../components/add-friend.component";
import { useNotificationStore } from "../stores/notification.store";
import { EventName } from "../services/notification.service";

export default function FriendPage() {
  const [friendRequests, setFriendRequests] = useState<FriendRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const { service } = useNotificationStore();

  const removeFriendRequest = (friendRequest: FriendRequest) => {
    setFriendRequests((prevRequests) =>
      prevRequests.filter((request) => request.id !== friendRequest.id)
    );
  };
  

  useEffect(() => {
    loadInitialRequests();

    const handleNewFriendRequest = (data: any) => {
      setFriendRequests(prevRequests => {return [data, ...prevRequests];});
    };

    const eventSource = service.eventListener(handleNewFriendRequest, EventName.FRIEND_REQUEST_RECEIVED);

    return () => {
      eventSource.close();
    };
  }, []); 
  
  async function loadInitialRequests() {
    try {
      const requests = await fetchFriendRequests();
      setFriendRequests(requests);
    } catch (error) {
      console.error("Error loading friend requests:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      {loading ? <Loader /> : null}

      <div className="border m-6 p-4 bg-blue-100 rounded-3xl">
        <div className="border rounded-3xl p-4 bg-blue-50">
          <AddFriend />
          <div>
            <span className="mx-16 my-6 text-2xl font-bold">Friends Requests</span>

            {friendRequests.map((request) => (
              <div key={request.id}>
                <FriendRequestCard request={request} removeFriendRequest={removeFriendRequest} />
              </div>
            ))}
          </div>
        </div>
      </div>


    </div>
  );
}