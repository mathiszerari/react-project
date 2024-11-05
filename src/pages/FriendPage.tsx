import { useEffect, useState } from "react";
import FriendRequest from "../types/friend-request";
import { dateFormater } from "../utils/dateFormater";

export default function FriendPage() {
  const [friendRequests, setFriendRequests] = useState<FriendRequest[]>([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('http://localhost:3000/social/friend-requests', {
        credentials: 'include'
      });
      setFriendRequests(await response.json());

      friendRequests.forEach((d) => {
        d.requestedAt = dateFormater(d.requestedAt);
      })
    }
  
    fetchData();
  }, []);
  
  return (
    <div>
      <h1>Friend Page</h1>

      <div className="border m-6 p-4 bg-blue-100 rounded-3xl">
        <div className="border rounded-3xl p-4 bg-blue-50">

          <span className="mx-16 my-6 text-2xl font-bold">Friends Requests</span>

          {friendRequests.map((request) => (
            <div key={request.id} className="m-4 flex justify-center w-3/4 items-center mx-auto ">
              <div className="flex border justify-between w-full p-2 rounded-full">

                <div className="flex flex-col">
                  <span> send by : {request.senderId}</span>
                  <span>{dateFormater(request.requestedAt)}</span>
                </div>

                <button className="justify-end border px-6 rounded-full mx-24 bg-green-100">Accept</button>

              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}