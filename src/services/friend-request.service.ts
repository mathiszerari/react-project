import { FriendRequest } from "../types/friend-request";

export async function fetchFriendRequests() {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/social/friend-requests`, {
      credentials: 'include'
    });
    const friendRequests = await response.json();
    return friendRequests.map((request: FriendRequest) => ({
      ...request,
    }));
  } catch (error) {
    console.error('Error fetching friend requests:', error);
    throw error;
  }
}

export const sendFriendRequest = async (receiverId: string) => {
  try {
    const randomuuid = crypto.randomUUID(); 
    await fetch(`${process.env.REACT_APP_API_BASE_URL}/social/friend-request/${randomuuid}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ receiverId: receiverId }),
    });
  } catch (error) {
    console.error('Error sending friend request:', error);
    throw error;
  }
}

export const acceptRequest = async (requestId: string) => {
  try {
    await fetch(`${process.env.REACT_APP_API_BASE_URL}/social/friend-request/${requestId}/accept`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
  } catch (error) {
    console.error('Error accepting friend request:', error);
    throw error;
  }
}