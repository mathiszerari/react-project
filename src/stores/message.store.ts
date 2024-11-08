import { create } from "zustand/react";

import Message from "../types/message";

type MessageStore = {
  messages: Message[];
  setMessages: (messages: Message[]) => void;
  addMessage: (message: Message) => void;
  updateErrorLastMessage: (error: boolean) => void;
};

export const useMessageStore = create<MessageStore>((set) => ({
  messages: [],
  setMessages: (messages: Message[]) => set({ messages }),
  addMessage: (message: Message) =>
    set((state) => ({ messages: [message, ...state.messages] })),
  updateErrorLastMessage: (error: boolean) =>
    set((state) => {
      const messages = [...state.messages];
      messages[0] = {
        ...messages[0],
        error,
      };
      return { messages };
    }),
}));
