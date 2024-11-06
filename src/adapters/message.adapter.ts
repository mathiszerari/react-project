import Message from "../types/message";

export interface MessageAdapter {
  sendMessage: (message: Message) => Promise<void>;
  fetchMessages: (receiverId: string) => Promise<Message[]>;
  eventFetchMessages: (onMessageReceived: (data: Message) => void) => EventSource;
}