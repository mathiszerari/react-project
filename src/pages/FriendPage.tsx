import { useEffect, useState } from "react";
import data from "../data.json";

interface Chat {
  id: number;
  name: string;
  username: string;
  profilePicture: string;
  createdAt: string;
}

export default function FriendPage() {
  const [friends, setFriends] = useState<Chat[]>([]);

  useEffect(() => {
    console.log(data);
    setFriends(data);
    
  }, []);

  
  return (
    <div>
      <h1>Friend Page</h1>

      <div className="border m-6 p-4 bg-blue-100 rounded-3xl">
        <div className="border rounded-3xl p-4 bg-blue-50">

          <span className="mx-16 my-6 text-2xl font-bold">Friends Requests</span>

          {friends.map((friend) => (
            <div key={friend.id} className="m-4 flex justify-center w-3/4 items-center mx-auto ">
              <div className="flex border justify-between w-full p-2 rounded-full">

                <div className="flex">
                  <img
                    src={friend.profilePicture + friend.username}
                    alt="profile"
                    className="w-12 h-12 rounded-full"
                  />

                  <div className="ml-4">
                    <h2>{friend.name}</h2>
                    <p>{friend.username}</p>
                  </div>
                </div>

                <button className="justify-end border px-6 rounded-full mx-32 bg-green-100">Accept</button>

              </div>
            </div>
          ))}

          <span className="mt-8 mx-16 my-6 text-2xl font-bold">{friends.length} Friends</span>

          <div className="px-32 grid grid-cols-* grid-flow-col gap-4">
            {friends.map((friend) => (
              <div key={friend.id}>
                <img
                  src={friend.profilePicture + friend.username}
                  alt="profile"
                  className="w-12 h-12 rounded-full"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}