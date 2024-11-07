import { create } from "zustand/react";
import { Friend } from "../types/friend";

type States = {
  friends: Friend[];
};

type Actions = {
  setFriends: (friends: Friend[]) => void;
  addFriend: (friend: Friend) => void;
  clearFriends: () => void;
  getFriendById: (userId: string) => Friend | undefined;
};

export const useFriendStore = create<States & Actions>((set) => ({
  friends: [],
  setFriends: (friends: Friend[]) => set({ friends }),
  addFriend: (friend: Friend) =>
    set((state) => ({ friends: [...state.friends, friend] })),
  clearFriends: () => set({ friends: [] }),
  getFriendById: (userId: string): Friend | undefined =>
    useFriendStore
      .getState()
      .friends.find((friend: Friend) => friend.userId === userId),
}));
