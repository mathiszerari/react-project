import { create } from "zustand";
import { User } from "../types/user";

type State = {
  username: string;
  id: string;
};

type Action = {
  clearUser: () => void;
  updateUser: (newUser: User) => void;
};
export const useUserStore = create<State & Action>((set) => ({
  username: "",
  id: "",
  clearUser: () => set({ username: "", id: "" }),
  updateUser: (newUser) => set({ username: newUser.username, id: newUser.id }),
}));
