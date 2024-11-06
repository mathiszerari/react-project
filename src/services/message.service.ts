import Message from "../types/message";

export const sendMessage = async (message: Message): Promise<void> => {
  const messageId= crypto.randomUUID()
  const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/chat/${messageId}/send`, {
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
  //TODO: Gérer plusieurs erreurs dont erreur connexion
  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }
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