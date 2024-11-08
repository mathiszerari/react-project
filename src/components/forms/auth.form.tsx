import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { UserDTO } from "../../dtos/user.dto";
import Button from "../buttons/button";

interface AuthFormProps {
  submitFn: (data: UserDTO) => Promise<void>;
  children?: React.ReactNode;
  label: string;
}

export default function AuthForm({ submitFn, children, label }: AuthFormProps) {
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
    <form
      className="flex flex-col w-full gap-4 items-center p-4 rounded-lg"
      onSubmit={handleSubmit(onSubmit)}
    >
      <label className="input-group w-full">
        Username
        <input
          className="input"
          type="text"
          {...register("username", { required: true })}
        />
        {errors.username && <span>Username is required</span>}
      </label>
      <label className="input-group w-full">
        Password
        <input
          className="input"
          type="password"
          {...register("password", { required: true })}
        />
        {errors.password && <span>Password is required</span>}
      </label>
      {resError && <span>{resError}</span>}
      {children ?? children}
      <Button
        label={label}
        type="submit"
        variant="primary"
        className="max-w-60"
      />
    </form>
  );
}
