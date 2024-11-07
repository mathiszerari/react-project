import Message from "../types/message";

export enum EventName {
  FRIEND_REQUEST_RECEIVED = 'friend-request-received',
  FRIEND_REQUEST_ACCEPTED = 'friend-request-accepted',
  MESSAGE_RECEIVED = 'message-received',
}

export class NotificationService {

  eventListener = (onElementReceived: (data: any) => void, eventName: EventName) => {
    const eventSource = new EventSource(`${process.env.REACT_APP_API_BASE_URL}/notifications`, { withCredentials: true })
    eventSource.addEventListener(eventName, (event) => {
      const data = JSON.parse(event.data);
      onElementReceived(data);
    })
    eventSource.onerror = (error) => {
      eventSource.close();
    };
    return eventSource;
  }
}