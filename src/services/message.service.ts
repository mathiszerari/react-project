import Message from "../types/message";
import { MessageAdapter } from "../adapters/message.adapter";
import { BadRequestError } from "../errors/bad-request.error";

export class MessageService implements MessageAdapter {
   sendMessage = async (message: Message): Promise<void> => {
    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/chat/${message.id}/send`, {
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
    if (response.status === 400) {
      throw new BadRequestError("You are not friend with this user");
    }
    else {
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
    }
  }

  fetchMessages = async (receiverId: string): Promise<Message[]> => {
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

  eventFetchMessages = (onMessageReceived: (data: Message) => void) => {
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
}


export class FalseMessageService implements MessageAdapter {
  async sendMessage(message: Message): Promise<void> {

    const random = Math.random() * 10;

    if(random < 5) {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/chat/${message.id}/send`, {
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
      if (response.status === 400) {
        throw new BadRequestError("You are not friend with this user");
      }
      else {
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
      }
    }
   else {
      throw new Error("Method not implemented.");
    }
  }

  fetchMessages = async (receiverId: string): Promise<Message[]> => {
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

  eventFetchMessages = (onMessageReceived: (data: Message) => void) => {
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
}
