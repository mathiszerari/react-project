import { UserDTO } from "../dtos/user.dto";
import { User } from "../types/user";

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

export async function getCurrentUser(): Promise<User> {
  const response = await fetch(
    `${process.env.REACT_APP_API_BASE_URL}/auth/me`,
    {
      credentials: "include",
    }
  );
  if (!response.ok) {
    const { message } = await response.json();
    throw new Error(message);
  }
  return response.json();
}

export async function checkUserAuth() {
  const response = await fetch(
    `${process.env.REACT_APP_API_BASE_URL}/auth/me`,
    {
      credentials: "include",
    }
  );

  return response.ok ? true : false;
}
