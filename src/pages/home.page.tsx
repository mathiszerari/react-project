import { useEffect, useState } from "react";
import { Friend } from "../types/friends";
import { getUserFriends } from "../services/friends.service";

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

  return (
    <div>
      <h1>Home Page</h1>
      <div>
        <ul>
          {sortedByDateFriendsList.map((friend) => (
            <li key={friend.userId}>{friend.username}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
