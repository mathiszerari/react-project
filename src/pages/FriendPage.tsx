import { useEffect, useState } from "react";
import FriendRequest from "../types/friend-request";

export default function FriendPage() {
  const [data, setData] = useState<FriendRequest[]>([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('http://localhost:3000/social/friend-requests', {
        credentials: 'include'
      });
      setData(await response.json());

      data.forEach((d) => {
        d.requestedAt = timeAgo(d.requestedAt);
      })

      console.log(data);
    }
  
    fetchData();
  }, []);
  
  function timeAgo(dateString: string) {

    const date = new Date(dateString);
    const now = new Date();

    const diffMs = now.getTime() - date.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHeure = Math.floor(diffMin / 60);
    const diffJour = Math.floor(diffHeure / 24);

    if (diffJour > 0) {
        return `${diffJour} day${diffJour > 1 ? 's' : ''} ago`;
    } else if (diffHeure > 0) {
        return ` ${diffHeure} hour${diffHeure > 1 ? 's' : ''} ago`;
    } else if (diffMin > 0) {
        return `${diffMin} minute${diffMin > 1 ? 's' : ''} ago`;
    } else {
        return `${diffSec} second${diffSec > 1 ? 's' : ''} ago`;
    }
}

  
  return (
    <div>
      <h1>Friend Page</h1>

      <div className="border m-6 p-4 bg-blue-100 rounded-3xl">
        <div className="border rounded-3xl p-4 bg-blue-50">

          <span className="mx-16 my-6 text-2xl font-bold">Friends Requests</span>

          {data.map((d) => (
            <div key={d.id} className="m-4 flex justify-center w-3/4 items-center mx-auto ">
              <div className="flex border justify-between w-full p-2 rounded-full">

                <div className="flex flex-col">
                  <span> send by : {d.senderId}</span>
                  <span>{timeAgo(d.requestedAt)}</span>
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