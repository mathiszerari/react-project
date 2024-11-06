import Message from "../types/message";
import { MessageDTO } from "../dtos/message.dto";

export const sendMessage = async (message: MessageDTO): Promise<void> => {
  await fetch(`${process.env.REACT_APP_API_BASE_URL}/chat/${message.id}/send`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({
      receiverId: message.receiverId,
      content: message.content,
    }),
  })
}

export const fetchMessages = async (receiverId: string): Promise<Message[]> => {
  const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/messages/${receiverId}/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  })
  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }
  //TODO : Attention pas d'erreur si utilisateur n'existe pas ou pas ami
  return await response.json()
}

export const eventFetchMessages = (onMessageReceived: (data: Message) => void) => {
  const eventSource = new EventSource(`${process.env.REACT_APP_API_BASE_URL}/notifications`, { withCredentials: true })
  eventSource.addEventListener('message-received', (event) => {
    const data = JSON.parse(event.data);
    onMessageReceived(data);
  })

  eventSource.onerror = (error) => {
    eventSource.close();
  };
  return eventSource;
}