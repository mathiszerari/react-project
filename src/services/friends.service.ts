import { Friend } from "../types/friends";

export const getUserFriends = async (): Promise<Friend[]> => {
  const response = await fetch(
    `${process.env.REACT_APP_API_BASE_URL}/social/friends`,
    {
      method: "GET",
      credentials: "include",
    }
  );
  if (!response.ok) {
    const { message } = await response.json();
    console.error(message);
    return [];
  }

  return (await response.json()) as Friend[];
};
