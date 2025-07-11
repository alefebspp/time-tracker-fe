import { Eye, EyeClosed } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import useLoginForm from "./use-login-form";

export default function LoginForm() {
  const { form, onSubmit, error, inputType, changeInputType, navigate } =
    useLoginForm();

  const {
    formState: { errors, isSubmitting },
  } = form;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold text-gray-600">Fazer login</h1>
          <p className="text-balance text-sm text-muted-foreground text-gray-600">
            Entre com seu email abaixo para fazer login em sua conta
          </p>
        </div>
        <div className="grid gap-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="m@exemplo.com"
                    hasError={!!errors.email}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center">
                    <FormLabel>Password</FormLabel>
                    <a
                      href="#"
                      className="ml-auto text-gray-600 text-sm underline-offset-4 hover:underline"
                    >
                      Esqueceu a senha?
                    </a>
                  </div>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={inputType}
                        placeholder="****"
                        hasError={!!errors.password}
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={changeInputType}
                        className="appearance-none outline-none cursor-pointer absolute right-3 top-1/2 -translate-y-1/2"
                      >
                        {inputType === "password" ? (
                          <EyeClosed className="w-5 h-5 text-gray-500" />
                        ) : (
                          <Eye className="w-5 h-5 text-gray-500" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col items-center gap-2">
            <Button isLoading={isSubmitting} type="submit" className="w-full">
              Login
            </Button>
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>
        </div>
        <div className="text-center text-sm text-gray-600">
          Não tem uma conta?{" "}
          <Button
            onClick={() => navigate("/cadastro")}
            className="appearance-none"
          >
            Cadastrar
          </Button>
        </div>
      </form>
    </Form>
  );
}
