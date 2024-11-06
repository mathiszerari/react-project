import { create } from "zustand";

type State = {
  username: string;
  userId: string;
};

type Action = {
  clearUser: () => void;
  updateUser: (newUser: State) => void;
  checkUserAuth: () => Promise<boolean>;
};
export const useUserStore = create<State & Action>((set) => ({
  username: "",
  userId: "",
  clearUser: () => set({ username: "", userId: "" }),
  updateUser: (newUser) => set(newUser),
  checkUserAuth: async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/auth/me`,
      {
        credentials: "include",
      }
    );
    if (!response.ok) {
      return false;
    }
    return true;
  },
}));
