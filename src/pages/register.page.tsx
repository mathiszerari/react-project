import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/auth.service";
import AuthForm from "../components/formss/auth.form";
import { UserDTO } from "../dtos/user.dto";

export default function RegisterPage() {
  const navigate = useNavigate();

  const onSubmit = async (data: UserDTO) => {
    await registerUser(data);
    navigate("/");
  };
  return (
    <>
      <h1>Inscription</h1>
      <AuthForm submitFn={onSubmit} />
      <button onClick={() => navigate("/login")}>Déjà inscrit ?</button>
    </>
  );
}
