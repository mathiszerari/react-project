interface IconButtonProps {
  children?: React.ReactNode;
  onClick: (params?: any) => any;
  className?: string;
}

export default function IconButton({
  children,
  onClick,
  className,
}: IconButtonProps) {
  return (
    <button className={`icon-btn ${className}`} onClick={onClick}>
      {children ?? children}
    </button>
  );
}
