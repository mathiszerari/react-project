import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";
import "./index.css";
import HomePage from "./pages/HomePage";
import FriendPage from "./pages/FriendPage";
import ChatListPage from "./pages/chat-list.page";
import ChatPage from "./pages/chat.page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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
