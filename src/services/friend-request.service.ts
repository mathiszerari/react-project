import { FriendRequest } from "../types/friend-request";

export async function fetchFriendRequests() {
  const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/social/friend-requests`, {
    credentials: 'include'
  });
  const friendRequests = await response.json();
  
  return friendRequests.map((request: FriendRequest) => ({
    ...request,
  }));
}

export const sendFriendRequest = async (receiverId: string) => {
  const randomuuid = crypto.randomUUID(); 
  await fetch(`${process.env.REACT_APP_API_BASE_URL}/social/friend-request/${randomuuid}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ receiverId: receiverId }),
  })
}

export const acceptRequest = async (requestId: string) => {
  await fetch(`${process.env.REACT_APP_API_BASE_URL}/social/friend-request/${requestId}/accept`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  })
}
