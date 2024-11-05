import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { UserDTO } from "../../types/userDto";

interface AuthFormProps {
  submitFn: (data: UserDTO) => Promise<void>;
}

export default function AuthForm({ submitFn }: AuthFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserDTO>();

  const [resError, setResError] = useState<string>();

  const onSubmit: SubmitHandler<UserDTO> = async (data) => {
    try {
      await submitFn(data);
    } catch (error: any) {
      setResError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        Nom d'utilisateur
        <input type="text" {...register("username", { required: true })} />
        {errors.username && <span>Le nom d'utilisateur est requis</span>}
      </label>
      <label>
        Password
        <input type="password" {...register("password", { required: true })} />
        {errors.password && <span>Le mot de passe est requis</span>}
      </label>
      {resError && <span>{resError}</span>}
      <button type="submit">Connexion</button>
    </form>
  );
}
