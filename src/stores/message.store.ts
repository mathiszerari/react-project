import { create } from "zustand/react";

import Message from "../types/message";

type MessageStore = {
  messages: Message[];
  setMessages: (messages: Message[]) => void;
  addMessage: (message: Message) => void;
  updateLastMessage: (newMessage: Message) => void;
}

export const useMessageStore = create<MessageStore>((set) => ({
  messages: [],
  setMessages: (messages: Message[]) => set({ messages }),
  addMessage: (message: Message) => set((state) => ({ messages: [...state.messages, message] })),
  updateLastMessage: (newMessage: Message) =>
    set((state) => {
      const messages = [...state.messages];
      messages[messages.length - 1] = newMessage;
      return { messages };
    }),
}))