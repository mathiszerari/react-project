import { Outlet, useNavigate } from "react-router-dom";
import { useUserStore } from "../../stores/user.store";
import { useEffect } from "react";

export default function GuestRoute() {
  const checkUserAuth = useUserStore((state) => state.checkUserAuth);
  const navigate = useNavigate();

  const checkAuth = async () => {
    const isAuth = await checkUserAuth();
    if (isAuth) {
      navigate("/");
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);
  return <Outlet />;
}
