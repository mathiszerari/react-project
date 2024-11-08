import { useNavigate } from "react-router-dom";
import { getCurrentUser, loginUser } from "../services/auth.service";
import AuthForm from "../components/forms/auth.form";
import { UserDTO } from "../dtos/user.dto";
import { useUserStore } from "../stores/user.store";

export default function LoginPage() {
  const navigate = useNavigate();
  const { updateUser } = useUserStore();

  const onSubmit = async (data: UserDTO) => {
    await loginUser(data);

    const currentUser = await getCurrentUser();
    updateUser(currentUser);

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
