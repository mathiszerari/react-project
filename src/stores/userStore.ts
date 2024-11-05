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
  checkUserAuth: () => Promise<boolean>;
};
export const useUserStore = create<State & Action>((set) => ({
  username: "",
  userId: "",
  clearUsername: () => set({ username: "" }),
  clearUserId: () => set({ userId: "" }),
  updateUsername: (newUsername: string) => set({ username: newUsername }),
  updateUserId: (newUserId: string) => set({ userId: newUserId }),
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
