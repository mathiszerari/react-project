import { useNavigate, useParams } from "react-router-dom";
import Loader from "../components/loaders/spinner/loader.component";
import { useEffect, useState } from "react";
import { sendFriendRequest } from "../services/friend-request.service";

export default function InviteLinkPage() {
  let linkData = useParams();
  const navigate = useNavigate();
  let inviteSend = false

  useEffect(() => {
    if (linkData.senderId && !inviteSend) {
      sendFriendRequest(linkData.senderId)
      inviteSend = true
    }
    navigate("/")
  }, []);


  return (
    <Loader />
  );
}