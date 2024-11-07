import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";

type LoaderProps = {
  receiverId?: string;
  children: ReactNode;
};

export default function MessagesLoader({ receiverId, children }: LoaderProps) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!receiverId) {
      navigate('/');
    }
  }, [receiverId, navigate]);

  return <>{children}</>;
}
