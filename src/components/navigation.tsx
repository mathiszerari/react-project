import * as React from "react";
import { Link } from "react-router-dom";
import { logoutUser } from "../services/auth.service";
import { useFriendStore } from "../stores/friend.store";
import { useUserStore } from "../stores/user.store";
import { countUnseenNotifications } from "../utils/count-unseen-notifications";
import { useEffect } from "react";

export default function Navigation() {
  const { clearUser } = useUserStore();
  const { clearFriends } = useFriendStore();
  const handleLogout = () => {
    clearUser();
    clearFriends();
    logoutUser();
  };

  let test = localStorage.getItem("unseenNotif");

  useEffect(() => {
    countUnseenNotifications();
  }, [test]);

  return (
    <div className="mt-6 mx-64 border h-16 flex flex-row justify-around items-center rounded-full">
      <Link to="/">Chats</Link>
      <Link to="/friends">Friends</Link>
      <div className="flex">
        <Link to="/notifications">Notifications </Link>

        <span> {countUnseenNotifications()}</span>
      </div>
      <Link to="/login" onClick={handleLogout}>
        Logout
      </Link>
    </div>
  );
}
