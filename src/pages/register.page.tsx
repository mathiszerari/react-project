import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/auth.service";
import AuthForm from "../components/forms/auth.form";
import { UserDTO } from "../dtos/user.dto";
import Button from "../components/buttons/button";

export default function RegisterPage() {
  const navigate = useNavigate();

  const onSubmit = async (data: UserDTO) => {
    await registerUser(data);
    navigate("/");
  };
  return (
    <div className="flex flex-col max-w-96 w-full items-center gap-8">
      <h1>
        Wii <span className="text-cyan-500 italic">Register</span>
      </h1>
      <AuthForm label="Register" submitFn={onSubmit}>
        <Button
          className="text-sm"
          variant="tertiary"
          label="Already registered ? Login here !"
          onClick={() => navigate("/login")}
        />
      </AuthForm>
    </div>
  );
}
