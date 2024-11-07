import { create } from "zustand/react";

import Message from "../types/message";

type MessageStore = {
  messages: Message[];
  setMessages: (messages: Message[]) => void;
  addMessage: (message: Message) => void;
  updateErrorLastMessage: (error: boolean) => void;
}

export const useMessageStore = create<MessageStore>((set) => ({
  messages: [],
  setMessages: (messages: Message[]) => set({ messages }),
  addMessage: (message: Message) => set((state) => ({ messages: [...state.messages, message] })),
  updateErrorLastMessage: (error: boolean) =>
    set((state) => {
      const messages = [...state.messages];
      messages[messages.length - 1] = {...messages[messages.length - 1], error};
      return { messages };
    }),
}))