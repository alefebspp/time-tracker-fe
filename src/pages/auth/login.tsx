import LoginForm from "@/components/login-form";
import useLoginForm from "@/components/login-form/use-login-form";
import { useUserContext } from "@/contexts/user-context";
import { login } from "@/services/auth";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const { setUser } = useUserContext();
  const navigate = useNavigate();

  return <LoginForm {...useLoginForm({ setUser, navigate, login })} />;
}
