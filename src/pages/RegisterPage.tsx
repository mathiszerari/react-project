import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/auth.service";
import AuthForm from "../components/Form/AuthForm";

export default function RegisterPage() {
  const navigate = useNavigate();
  return (
    <>
      <h1>Inscription</h1>
      <AuthForm submitFn={registerUser} />
      <button onClick={() => navigate("/login")}>Déjà inscrit ?</button>
    </>
  );
}
