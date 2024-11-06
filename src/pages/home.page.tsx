import { useEffect } from "react";
import { getUserFriends } from "../services/friend.service";
import { useNavigate } from "react-router-dom";
import { useFriendStore } from "../stores/friend.store";

export default function HomePage() {
  const { friends, setFriends } = useFriendStore();

  const loadFriends = async () => {
    if (friends.length === 0) {
      const friends = await getUserFriends();
      setFriends(friends);
    }
  };

  const sortedByDateFriendsList = friends.sort((a, b) => {
    return new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime();
  });

  useEffect(() => {
    loadFriends();
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
