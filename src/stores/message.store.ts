import { create } from "zustand/react";

import Message from "../types/message";

type MessageStore = {
  messages: Message[];
  setMessages: (messages: Message[]) => void;
  addMessage: (message: Message) => void;
  setErrorLastMessage: () => void;
}

export const useMessageStore = create<MessageStore>((set) => ({
  messages: [],
  setMessages: (messages: Message[]) => set({ messages }),
  addMessage: (message: Message) => set((state) => ({ messages: [...state.messages, message] })),
  setErrorLastMessage: () =>
    set((state) => {
      const messages = [...state.messages];
      messages[messages.length - 1] = {...messages[messages.length - 1], error: true};
      return { messages };
    }),
}))