import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { checkUserAuth } from "../../services/auth.service";

export default function ProtectedRoute() {
  const navigate = useNavigate();

  const checkAuth = async () => {
    const isAuth = await checkUserAuth();
    if (!isAuth) {
      navigate("/login");
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);
  return <Outlet />;
}
