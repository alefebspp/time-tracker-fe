import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useRegisterForm from "./use-register-form";
import PasswordRuleItem from "./password-rule-item";

type Props = ReturnType<typeof useRegisterForm>;

export default function RegisterForm(props: Props) {
  const { form, passwordsAreNotEqual, password, error, navigate, onSubmit } =
    props;

  const {
    formState: { isSubmitting, errors },
  } = form;

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-6"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold text-gray-600">Registro</h1>
          <p className="text-balance text-sm text-muted-foreground text-gray-600">
            Cadastre-se para acessar a plataforma
          </p>
        </div>
        <div className="grid gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="m@exemplo.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col gap-2">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input placeholder="****" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <PasswordRuleItem
              isValid={password ? password.length >= 8 : false}
              label="Mínimo de 8 caracteres"
            />
            <PasswordRuleItem
              isValid={props.hasCapitalLetter(password)}
              label="Mínimo de 1 letra maiúscula"
            />
            <PasswordRuleItem
              isValid={props.hasLetter(password)}
              label="Mínimo de 1 letra"
            />
            <PasswordRuleItem
              isValid={props.hasNumber(password)}
              label="Mínimo de 1 número"
            />
            <PasswordRuleItem
              isValid={props.hasSpecialChar(password)}
              label="Mínimo de 1 caracter especial (!@#$%^&*)"
            />
          </div>
          <FormField
            control={form.control}
            name="confirm_password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirmar senha</FormLabel>
                <FormControl>
                  <Input placeholder="****" {...field} />
                </FormControl>
                {passwordsAreNotEqual ? (
                  <p className="text-xs font-medium text-destructive">
                    As senhas devem ser iguais
                  </p>
                ) : (
                  <FormMessage />
                )}
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col items-center gap-2">
          <Button
            disabled={passwordsAreNotEqual || !!errors.password}
            type="submit"
            isLoading={isSubmitting}
            className="w-full"
          >
            Registrar
          </Button>
          {error && <p className="text-sm text-red-500">{error}</p>}

          <Button
            variant="link"
            onClick={() => navigate("/")}
            className="text-sm appearance-none w-fit h-fit text-gray-600"
          >
            Voltar
          </Button>
        </div>
      </form>
    </Form>
  );
}
