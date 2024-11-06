import * as React from "react";
import { Link } from "react-router-dom";
import { logoutUser } from "../services/auth.service";

export default function Navigation() {
  return (
    <div className="mt-6 mx-64 border h-16 flex flex-row justify-around items-center rounded-full">
      <Link to="/chats">Chats</Link>
      <Link to="/friends">Friends</Link>
      <Link to="/settings">Settings</Link>
      <Link to="/login" onClick={logoutUser}>
        Logout
      </Link>
    </div>
  );
}
