import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../stores/userStore";

type Inputs = {
  username: string;
  password: string;
};

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const [resError, setResError] = useState<string>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const response = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    if (!response.ok) {
      const { message } = await response.json();
      setResError(message);
      return;
    }

    setUserStore();
  };

  const updateUserId = useUserStore((state) => state.updateUserId);
  const updateUsername = useUserStore((state) => state.updateUsername);

  const setUserStore = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/auth/me`,
      {
        credentials: "include",
      }
    );

    if (!response.ok) {
      const { message } = await response.json();
      setResError(message);
      return;
    }

    const user = await response.json();
    updateUserId(user.id);
    updateUsername(user.username);
  };

  return (
    <>
      <h1>Connexion</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Nom d'utilisateur
          <input type="text" {...register("username", { required: true })} />
          {errors.username && <span>Le nom d'utilisateur est requis</span>}
        </label>
        <label>
          Password{" "}
          <input
            type="password"
            {...register("password", { required: true })}
          />
          {errors.password && <span>Le mot de passe est requis</span>}
        </label>
        {resError && <span>{resError}</span>}
        <button type="submit">Connexion</button>
      </form>

      <button onClick={() => navigate("/register")}>
        Pas encore de compte ?
      </button>
    </>
  );
}
