import { useEffect, useState } from "react";
import { Friend } from "../types/friend";
import { getUserFriends } from "../services/friend.service";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const [friends, setFriends] = useState<Friend[]>([]);

  const fetchFriends = async () => {
    const friendList = await getUserFriends();
    setFriends(friendList);
  };

  const sortedByDateFriendsList = friends.sort((a, b) => {
    return new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime();
  });
  useEffect(() => {
    fetchFriends();
  }, []);

  const navigate = useNavigate();
  const redirectUserToChatPage = (
    event: React.MouseEvent<HTMLLIElement>,
    userId: string
  ) => {
    event.preventDefault();
    navigate(`/chats/${userId}`);
  };

  return (
    <div>
      <h1>Home Page</h1>
      <div>
        <ul>
          {sortedByDateFriendsList.map((friend) => (
            <li
              onClick={(e) => redirectUserToChatPage(e, friend.userId)}
              key={friend.userId}
            >
              {friend.username}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
