import { Friend } from "../../types/friend";
import "./friend.card.style.css";

interface FriendCardProps {
  friend: Friend;
}

export default function FriendCard({ friend }: FriendCardProps) {
  const cardClasses = [
    "friend-card-red",
    "friend-card-blue",
    "friend-card-green",
  ];

  const getRandomCardClass = () => {
    return cardClasses[Math.floor(Math.random() * cardClasses.length)];
  };

  return (
    <div className={`${getRandomCardClass()} hover:scale-105`}>
      {friend.username}
    </div>
  );
}
