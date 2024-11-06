import { create } from "zustand";

type State = {
  username: string;
  userId: string;
};

type Action = {
  clearUser: () => void;
  updateUser: (newUser: State) => void;
};
export const useUserStore = create<State & Action>((set) => ({
  username: "",
  userId: "",
  clearUser: () => set({ username: "", userId: "" }),
  updateUser: (newUser) => set(newUser),
}));
