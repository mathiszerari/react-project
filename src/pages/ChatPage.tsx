import { useEffect, useState } from "react";
import data from "../data.json";

interface Chat {
  id: number;
  name: string;
  username: string;
  profilePicture: string;
  createdAt: string;
}

export default function ChatPage() {
  const [chats, setChats] = useState<Chat[]>([]);

  useEffect(() => {
    console.log(data);
    setChats(data);
    
  }, []);

  return (
    <div>
      <h1>Chat Page</h1>

      <div className="border m-6 p-4 bg-blue-100 rounded-3xl">
        <div className="border rounded-3xl p-4 bg-blue-50">
          {chats.map((chat) => (
            <div key={chat.id} className="m-4 flex justify-center ">
              <div className="flex border w-3/4 p-2 rounded-full">

                <img
                  src={chat.profilePicture + chat.username}
                  alt="profile"
                  className="w-12 h-12 rounded-full"
                />

                <div className="ml-4">
                  <h2>{chat.name}</h2>
                  <p>{chat.username}</p>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}