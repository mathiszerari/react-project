import FriendRequestReceived from "./friend-request-accepted.component";
import FriendRequestAccepted from "./friend-request-received.component";

export default function Notifications() {
  return (
    <>
      <FriendRequestReceived />
      <FriendRequestAccepted />
    </>
  )
}