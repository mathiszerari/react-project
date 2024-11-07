import { Outlet, useNavigate } from "react-router-dom";
import { checkUserAuth, getCurrentUser } from "../../services/auth.service";
import { useUserStore } from "../../stores/user.store";
import { useFriendStore } from "../../stores/friend.store";

export default function ProtectedRoute() {
  const navigate = useNavigate();
  const { id, updateUser, clearUser } = useUserStore();
  const { clearFriends } = useFriendStore();
  const checkAuth = async () => {
    const isAuth = await checkUserAuth();
    if (!isAuth) {
      clearUser();
      clearFriends();
      navigate("/login");
    }

    if (!id && isAuth) {
      const currentUser = await getCurrentUser();
      updateUser(currentUser);
    }
  };

  checkAuth();

  return <Outlet />;
}
