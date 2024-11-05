import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type Inputs = {
  username: string;
  password: string;
};

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const [resError, setResError] = useState<string>();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const response = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/auth/register`,
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

    navigate("/login");
  };

  return (
    <>
      <h1>Inscription</h1>

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
        <button type="submit">Inscription</button>
      </form>

      <button onClick={() => navigate("/login")}>Déjà inscrit ?</button>
    </>
  );
}
