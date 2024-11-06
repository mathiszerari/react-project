import { UserDTO } from "../types/user-dto";

export async function loginUser(data: UserDTO) {
  const response = await fetch(
    `${process.env.REACT_APP_API_BASE_URL}/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    }
  );
  if (!response.ok) {
    const { message } = await response.json();
    throw new Error(message);
  }
}

export async function registerUser(data: UserDTO) {
  const response = await fetch(
    `${process.env.REACT_APP_API_BASE_URL}/auth/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    }
  );
  if (!response.ok) {
    const { message } = await response.json();
    throw new Error(message);
  }
}

export async function logoutUser() {
  const response = await fetch(
    `${process.env.REACT_APP_API_BASE_URL}/auth/logout`,
    {
      method: "POST",
      credentials: "include",
    }
  );
  if (!response.ok) {
    const { message } = await response.json();
    throw new Error(message);
  }
}
