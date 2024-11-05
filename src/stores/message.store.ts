import { create } from "zustand/react";

type MessageStore = {
  messages: string[];
  addMessage: (message: string) => void;
}

export const useMessageStore = create<MessageStore>((set) => ({
  messages: [],
  addMessage: (message: string) => set((state) => ({ messages: [...state.messages, message] })),
}))