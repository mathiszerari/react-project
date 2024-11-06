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

export const eventFetchFriendRequests = (onRequestReceived: (data: any) => void) => {
  const eventSource = new EventSource(`${process.env.REACT_APP_API_BASE_URL}/notifications`, { withCredentials: true })
  eventSource.addEventListener('friend-request-received', (event) => {
    const data = JSON.parse(event.data);
    onRequestReceived(data);
  })
  eventSource.onerror = (error) => {
    eventSource.close();
  };
  return eventSource;
}

export const eventAcceptedFriendRequest = (onRequestAccepted: (data: any) => void) => {
  const eventSource = new EventSource(`${process.env.REACT_APP_API_BASE_URL}/notifications`, { withCredentials: true })
  eventSource.addEventListener('friend-request-accepted', (event) => {
    const data = JSON.parse(event.data);
    onRequestAccepted(data);
  })
  eventSource.onerror = (error) => {
    eventSource.close();
  };
  return eventSource;
}