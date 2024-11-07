interface ButtonProps {
  label: string;
  onClick?: (params?: any) => any;
  type?: "submit";
  disabled?: boolean;
  variant?: "primary" | "secondary" | "tertiary";
}

export default function Button({
  label,
  onClick,
  type,
  disabled,
  variant = "primary",
}: ButtonProps) {
  return (
    <button
      className={`${variant}-btn`}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {label}
    </button>
  );
}
