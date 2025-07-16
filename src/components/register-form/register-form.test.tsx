import { vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { toast } from "sonner";

import RegisterForm from ".";
import useRegisterForm, { UseRegisterFormProps } from "./use-register-form";

function Sut(props: Partial<UseRegisterFormProps>) {
  return (
    <RegisterForm
      {...useRegisterForm({
        navigate: vi.fn(),
        register: vi
          .fn()
          .mockReturnValue({ message: "Usuário criado com sucesso!" }),
        ...props,
      })}
    />
  );
}

vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
  },
}));

describe("<RegisterForm />", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should show error messages if inputs are invalid", async () => {
    render(<Sut />);

    const submitButton = screen.getByText(/registrar/i);

    await userEvent.click(submitButton);

    expect(await screen.findAllByText(/campo obrigatório/i)).toHaveLength(3);
  });

  it("should show error if password and confirm password are not equal", async () => {
    render(<Sut />);

    const passwordInput = screen.getByLabelText("Senha");
    const confirmPasswordInput = screen.getByLabelText(/confirmar senha/i);

    await userEvent.type(passwordInput, "123456");
    await userEvent.type(confirmPasswordInput, "123");
    const submitButton = screen.getByText(/registrar/i);

    const errorMessage = await screen.findByText(/as senhas devem ser iguais/i);

    expect(errorMessage).toBeVisible();
    expect(submitButton).toBeDisabled();
  });

  it("should disable submit button if password is invalid or not equal to confirm password", async () => {
    render(<Sut />);

    const passwordInput = screen.getByLabelText("Senha");
    const confirmPasswordInput = screen.getByLabelText(/confirmar senha/i);
    const submitButton = screen.getByText(/registrar/i);

    await userEvent.type(passwordInput, "123456");
    await userEvent.type(confirmPasswordInput, "123");

    expect(submitButton).toBeDisabled();

    await userEvent.type(passwordInput, "Test");
    await userEvent.type(confirmPasswordInput, "456Test");

    expect(submitButton).toBeDisabled();

    await userEvent.type(passwordInput, "!");
    await userEvent.type(confirmPasswordInput, "!");

    expect(submitButton).not.toBeDisabled();
  });

  it("should show error message if api returns a error", async () => {
    const register = vi.fn().mockRejectedValue({
      isAxiosError: true,
      response: {
        data: {
          error: {
            message: "E-mail já registrado",
          },
        },
      },
    });

    render(<Sut register={register} />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText("Senha");
    const confirmPasswordInput = screen.getByLabelText(/confirmar senha/i);
    const nameInput = screen.getByLabelText(/nome/i);

    await userEvent.type(passwordInput, "123456Abs!");
    await userEvent.type(confirmPasswordInput, "123456Abs!");
    await userEvent.type(nameInput, "User");
    await userEvent.type(emailInput, "user@hotmail.com");

    const submitButton = screen.getByText(/registrar/i);

    await userEvent.click(submitButton);

    const errorMessage = await screen.findByText("E-mail já registrado");

    expect(errorMessage).toBeVisible();
  });

  it("should show error message if api returns a error", async () => {
    const register = vi
      .fn()
      .mockReturnValue({ message: "Usuário criado com sucesso!" });
    const navigate = vi.fn();

    render(<Sut register={register} navigate={navigate} />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText("Senha");
    const confirmPasswordInput = screen.getByLabelText(/confirmar senha/i);
    const nameInput = screen.getByLabelText(/nome/i);

    await userEvent.type(passwordInput, "123456Abs!");
    await userEvent.type(confirmPasswordInput, "123456Abs!");
    await userEvent.type(nameInput, "User");
    await userEvent.type(emailInput, "user@hotmail.com");

    const submitButton = screen.getByText(/registrar/i);

    await userEvent.click(submitButton);

    expect(navigate).toHaveBeenCalledWith("/");
    expect(toast.success).toHaveBeenCalledWith("Usuário criado com sucesso!", {
      position: "top-center",
    });
  });
});
