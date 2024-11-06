import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import HomePage from "./pages/home.page";
import ChatPage from "./pages/ChatPage";
import FriendPage from "./pages/FriendPage";
import App from "./App";
import "./index.css";
import RegisterPage from "./pages/register.page";
import LoginPage from "./pages/login.page";
import ProtectedRoute from "./components/Guard/procteded-route.guard";
import GuestRoute from "./components/Guard/guest-route.guard";

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
