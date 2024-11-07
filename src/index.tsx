import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import reportWebVitals from "./reportWebVitals";
import App from "./App";
import "./index.css";
import RegisterPage from "./pages/register.page";
import LoginPage from "./pages/login.page";
import HomePage from "./pages/home.page";
import ChatListPage from "./pages/chat-list.page";
import ChatPage from "./pages/chat.page";
import FriendPage from "./pages/friend.page";
import ProtectedRoute from "./components/guards/procteded-route.guard";
import GuestRoute from "./components/guards/guest-route.guard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <ProtectedRoute />,
        children: [
          {
            index: true,
            element: <HomePage />,
          },
          {
            path: "/chats",
            element: <ChatListPage />,
          },
          {
            path: "/chats/:receiverId",
            element: <ChatPage />,
          },
          {
            path: "/friends",
            element: <FriendPage />,
          },
        ],
      },
    ],
  },
  {
    element: <GuestRoute />,
    children: [
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
