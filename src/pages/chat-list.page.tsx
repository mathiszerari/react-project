import { useEffect, useState } from "react";
import data from "../mock/user-data.json";
import Chat from "../types/chat";


export default function ChatListPage() {
  const [chats, setChats] = useState<Chat[]>([]);

  useEffect(() => {
    setChats(data);
    
  }, []);

  return (
    <div>
      <h1 className="text-3xl my-4 mx-10">Chat Page</h1>

      <div className="border m-6 p-4 bg-blue-100 rounded-3xl">
        <div className="border rounded-3xl p-4 bg-blue-50">
          {chats.map((chat) => (
            <div key={chat.id} className="m-4 flex justify-center"
            onClick={() => { window.location.href = "/chat/" + chat.username }}>
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