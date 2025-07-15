import { useNavigate } from "react-router-dom";

import RegisterForm from "@/components/register-form";
import useRegisterForm from "@/components/register-form/use-register-form";
import { register } from "@/services/auth";

export default function RegisterPage() {
  return (
    <RegisterForm {...useRegisterForm({ register, navigate: useNavigate() })} />
  );
}
