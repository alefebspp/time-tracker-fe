"use client";
import { useState } from "react";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { login } from "@/services/auth";
import { returnErrorMessage } from "@/utils";
import { useUserContext } from "@/contexts/user-context";

const loginSchema = z.object({
  email: z
    .string({ message: "Campo obrigatório" })
    .email({ message: "Email inválido" })
    .min(1, { message: "Campo obrigatório" }),
  password: z
    .string({ message: "Campo obrigatório" })
    .min(1, { message: "Campo obrigatório" }),
});

export default function useLoginForm() {
  const [inputType, setInputType] = useState<"password" | "text">("password");
  const [error, setError] = useState<string>();

  const { setUser } = useUserContext();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function changeInputType() {
    if (inputType === "password") {
      setInputType("text");
    } else {
      setInputType("password");
    }
  }

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    try {
      if (error) {
        setError(undefined);
      }

      const response = await login(values);

      if (response.user) {
        setUser(response.user);
        navigate("/dashboard");
      }
    } catch (error) {
      console.log("ERROR:", error);
      const message = returnErrorMessage(error);
      setError(message);
    }
  }

  return {
    form,
    onSubmit,
    error,
    inputType,
    changeInputType,
    navigate,
  };
}
