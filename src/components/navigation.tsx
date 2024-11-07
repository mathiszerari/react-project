import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../services/auth.service";
import { useFriendStore } from "../stores/friend.store";
import { useUserStore } from "../stores/user.store";
import IconButton from "./buttons/icon.button";

import { DoorOpen } from "lucide-react";
import { Users } from "lucide-react";
import { Mail } from "lucide-react";

export default function Navigation() {
  const { clearUser } = useUserStore();
  const { clearFriends } = useFriendStore();
  const handleLogout = () => {
    clearUser();
    clearFriends();
    logoutUser();
    navigate("/login");
  };
  const navigate = useNavigate();

  const handleNotifications = () => {};
  return (
    <div className="w-full sticky bottom-0 border-t-2 border-t-cyan-500 shadow-[inset_0px_24px_64px_rgba(0,0,0,0.3)] bg-slate-50">
      <div className="max-w-[1440px] w-full flex justify-between py-8 m-auto">
        <div className="flex flex-row gap-16 items-end">
          <IconButton onClick={() => navigate("/")}>
            <div>Chats</div>
          </IconButton>
          <IconButton className="w-24" onClick={() => navigate("/friends")}>
            <Users size={64} />
          </IconButton>
        </div>
        <div className="flex flex-row gap-16 items-end">
          <IconButton className="w-24" onClick={() => handleNotifications()}>
            <Mail size={64} />
          </IconButton>
          <IconButton onClick={() => handleLogout()}>
            <DoorOpen size={64} />
          </IconButton>
        </div>
      </div>
    </div>
  );
}
