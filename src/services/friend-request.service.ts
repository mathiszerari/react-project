import FriendRequest from "../types/friend-request";

export async function fetchFriendRequests() {
  const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/social/friend-requests`, {
    credentials: 'include'
  });
  const friendRequests = await response.json();
  
  return friendRequests.map((request: FriendRequest) => ({
    ...request,
  }));
}