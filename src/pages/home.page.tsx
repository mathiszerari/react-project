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
    console.log("Enter event");

    navigate(`/chats/${userId}`);
  };

  return (
    <main className="flex flex-col justify-center overflow-auto py-8">
      <ul className="w-full h-full grid grid-rows-auto grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {sortedByDateFriendsList.map((friend) => (
          <li
            onClick={(e) => redirectUserToChatPage(e, friend.userId)}
            key={friend.userId}
          >
            <FriendCard friend={friend} />
          </li>
        ))}
        {friends.length < 20 &&
          Array.from({ length: 20 - friends.length }).map((_, index) => (
            <FriendCardPlaceholder key={index} />
          ))}
      </ul>
    </main>
  );
}
