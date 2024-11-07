import { useEffect, useState } from "react";
import FriendRequestCard from "../components/friend-request-card.component";
import { eventFetchFriendRequests, fetchFriendRequests } from "../services/friend-request.service";
import Loader from "../components/loaders/spinner/loader.component";
import { FriendRequest } from "../types/friend-request";
import AddFriend from "../components/add-friend.component";

export default function FriendPage() {
  const [friendRequests, setFriendRequests] = useState<FriendRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadInitialRequests();

    const handleNewFriendRequest = (data: any) => {
      setFriendRequests(prevRequests => {return [data, ...prevRequests];});
    };

    const eventSource = eventFetchFriendRequests(handleNewFriendRequest);

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
              <FriendRequestCard key={request.id} {...request} />
            ))}
          </div>
        </div>
      </div>


    </div>
  );
}