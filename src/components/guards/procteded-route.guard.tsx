import { Outlet, useLoaderData, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { checkUserAuth, getCurrentUser } from "../../services/auth.service";
import { useUserStore } from "../../stores/user.store";
import { useFriendStore } from "../../stores/friend.store";
import { useNotificationStore } from "../../stores/notification.store";
import Notification from "../../types/notification";

export default function ProtectedRoute() {
  const navigate = useNavigate();
  const { id, updateUser, clearUser } = useUserStore();
  const { clearFriends } = useFriendStore();
  const { setNotifications } = useNotificationStore();

  useEffect(() => {
    const checkAuth = async () => {
      const isAuth = await checkUserAuth();
      if (!isAuth) {
        clearUser();
        clearFriends();
        navigate("/login");
      } else if (!id && isAuth) {
        const currentUser = await getCurrentUser();
        updateUser(currentUser);
      }
    };

    checkAuth();
  }, [id, navigate, clearUser, clearFriends, updateUser]);

  const initialNotifications = useLoaderData() as Notification[];
  useEffect(() => {
    setNotifications(initialNotifications);
  }, [initialNotifications, setNotifications]);

  return <Outlet />;
}
