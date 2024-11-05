import { create } from "zustand";

type State = {
  username: string;
  userId: string;
};

type Action = {
  clearUsername: () => void;
  clearUserId: () => void;
  updateUsername: (newUsername: string) => void;
  updateUserId: (newUserId: string) => void;
};
export const useUserStore = create<State & Action>((set) => ({
  username: "",
  userId: "",
  clearUsername: () => set({ username: "" }),
  clearUserId: () => set({ userId: "" }),
  updateUsername: (newUsername: string) => set({ username: newUsername }),
  updateUserId: (newUserId: string) => set({ userId: newUserId }),
}));
