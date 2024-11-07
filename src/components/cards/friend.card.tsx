import { Friend } from "../../types/friend";
import "./friend.card.style.css";

interface FriendCardProps {
  friend: Friend;
}

export default function FriendCard({ friend }: FriendCardProps) {
  return <div className="friend-card">{friend.username}</div>;
}
