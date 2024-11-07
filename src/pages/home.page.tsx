import { useEffect } from "react";
import { getUserFriends } from "../services/friend.service";
import { useNavigate } from "react-router-dom";
import { useFriendStore } from "../stores/friend.store";
import FriendCard from "../components/cards/friend.card";
import FriendCardPlaceholder from "../components/cards/friend-placeholder.card";

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
    <main className="flex flex-col justify-center">
      <ul className="grid grid-rows-3 grid-cols-5 gap-6">
        {sortedByDateFriendsList.map((friend) => (
          <li
            onClick={(e) => redirectUserToChatPage(e, friend.userId)}
            key={friend.userId}
          >
            <FriendCard friend={friend} />
          </li>
        ))}
        {friends.length < 15 &&
          Array.from({ length: 15 - friends.length }).map((_, index) => (
            <FriendCardPlaceholder key={index} />
          ))}
      </ul>
    </main>
  );
}
