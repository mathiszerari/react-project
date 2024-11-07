interface ButtonProps {
  label: string;
  onClick?: (params?: any) => any;
  type?: "submit" | "button";
  disabled?: boolean;
  variant?: "primary" | "secondary" | "tertiary";
  className?: string;
}

export default function Button({
  label,
  onClick,
  type = "button",
  disabled,
  variant = "primary",
  className,
}: ButtonProps) {
  return (
    <button
      className={`${variant}-btn ${className}`}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {label}
    </button>
  );
}
