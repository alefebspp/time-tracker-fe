"use client";
import { useState } from "react";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { RegisterRequest } from "@/services/auth";
import { returnErrorMessage } from "@/utils";

const passwordSchema = z
  .string({ message: "Campo obrigatório" })
  .min(8, { message: "A senha deve ter no mínimo 8 caracteres" })
  .refine((password) => /[A-Z]/.test(password), {
    message: "A senha deve ter pelo menos 1 caracter maiúsculo",
  })
  .refine((password) => /[a-z]/.test(password), {
    message: "A senha deve ter pelo menos 1 caracter minúsculo",
  })
  .refine((password) => /[0-9]/.test(password), {
    message: "A senha deve ter pelo menos 1 número",
  })
  .refine((password) => /[!@#$%^&*]/.test(password), {
    message: "A senha deve ter pelo menos um caracter especial (!@#$%^&*)",
  });

export const registerFormSchema = z.object({
  name: z.string().min(1, { message: "Campo obrigatório" }),
  email: z
    .string({ message: "Campo obrigatório" })
    .min(1, { message: "Campo obrigatório" })
    .email({ message: "Email inválido" }),
  password: passwordSchema,
  confirm_password: z
    .string({ message: "Campo obrigatório" })
    .min(1, { message: "Campo obrigatório" }),
});

export type UseRegisterFormProps = {
  navigate: ReturnType<typeof useNavigate>;
  register: RegisterRequest;
};

export default function useRegisterForm({
  register,
  navigate,
}: UseRegisterFormProps) {
  const [error, setError] = useState<string>();

  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirm_password: "",
    },
  });

  const password = form.watch("password");
  const confirmPassword = form.watch("confirm_password");
  const passwordsAreNotEqual = confirmPassword !== password;

  function hasCapitalLetter(password: string) {
    return /[A-Z]/.test(password);
  }

  function hasLetter(password: string) {
    return /[a-z]/.test(password);
  }

  function hasNumber(password: string) {
    return /[0-9]/.test(password);
  }

  function hasSpecialChar(password: string) {
    return /[!@#$%^&*]/.test(password);
  }

  async function onSubmit(values: z.infer<typeof registerFormSchema>) {
    try {
      if (error) {
        setError(undefined);
      }

      const response = await register(values);

      if (response.error) {
        return setError(response.error.message);
      }

      if (response.message) {
        toast.success(response.message, { position: "top-center" });
        navigate("/");
      }
    } catch (error) {
      const message = returnErrorMessage(error);
      setError(message);
    }
  }

  return {
    form,
    onSubmit,
    password,
    passwordsAreNotEqual,
    error,
    hasCapitalLetter,
    hasLetter,
    hasNumber,
    hasSpecialChar,
    navigate,
  };
}
