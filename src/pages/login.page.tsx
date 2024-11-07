import { useNavigate } from "react-router-dom";
import { getCurrentUser, loginUser } from "../services/auth.service";
import AuthForm from "../components/forms/auth.form";
import { UserDTO } from "../dtos/user.dto";
import { useUserStore } from "../stores/user.store";
import Button from "../components/buttons/button";

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
    <div className="flex flex-col max-w-96 w-full items-center gap-8">
      <h1>
        Wii <span className="text-cyan-500 italic">Login</span>
      </h1>
      <AuthForm label="Login" submitFn={onSubmit}>
        <Button
          className="text-sm"
          variant="tertiary"
          label=" Not registered yet ? Register here !"
          onClick={() => navigate("/register")}
        />
      </AuthForm>
    </div>
  );
}
