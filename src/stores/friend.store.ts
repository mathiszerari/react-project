import { create } from "zustand/react";
import { Friend } from "../types/friend";

type States = {
  friends: Friend[];
};

type Actions = {
  setFriends: (friends: Friend[]) => void;
  addFriend: (friend: Friend) => void;
  clearFriends: () => void;
  // fetchFriends: () => Friend[];
};

export const useFriendStore = create<States & Actions>((set, get) => ({
  friends: [],
  setFriends: (friends: Friend[]) => set({ friends }),
  addFriend: (friend: Friend) =>
    set((state) => ({ friends: [...state.friends, friend] })),
  clearFriends: () => set({ friends: [] }),
  // fetchFriends: () => get().friends,
}));
