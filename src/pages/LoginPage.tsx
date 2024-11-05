import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/auth.service";
import AuthForm from "../components/Form/AuthForm";

export default function LoginPage() {
  const navigate = useNavigate();
  return (
    <>
      <h1>Connexion</h1>
      <AuthForm submitFn={loginUser} />
      <button onClick={() => navigate("/register")}>
        Pas encore inscrit ?
      </button>
    </>
  );
}
