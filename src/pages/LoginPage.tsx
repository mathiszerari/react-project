import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/auth.service";
import AuthForm from "../components/Form/AuthForm";
import { UserDTO } from "../types/userDto";

export default function LoginPage() {
  const navigate = useNavigate();

  const onSubmit = async (data: UserDTO) => {
    await loginUser(data);
    navigate("/");
  };
  return (
    <>
      <h1>Connexion</h1>
      <AuthForm submitFn={onSubmit} />
      <button onClick={() => navigate("/register")}>
        Pas encore inscrit ?
      </button>
    </>
  );
}
