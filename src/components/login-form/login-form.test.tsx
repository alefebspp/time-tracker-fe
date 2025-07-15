import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

import LoginForm from ".";
import useLoginForm, { UseLoginFormProps } from "./use-login-form";

function Sut(props: Partial<UseLoginFormProps>) {
  return (
    <LoginForm
      {...useLoginForm({
        login: vi.fn().mockResolvedValue({ user: { id: 1 } }),
        setUser: vi.fn(),
        navigate: vi.fn(),
        ...props,
      })}
    />
  );
}

async function setupForm() {
  const emailInput = screen.getByPlaceholderText(/m@exemplo\.com/i);
  const passwordInput = screen.getByPlaceholderText("****");
  const loginButton = screen.getByRole("button", { name: /login/i });

  await userEvent.type(emailInput, "user@test.com");
  await userEvent.type(passwordInput, "123456");

  return {
    emailInput,
    passwordInput,
    loginButton,
  };
}

describe("<LoginForm />", () => {
  it("should show validation errors when fields are empty", async () => {
    render(<Sut />);

    const loginButton = screen.getByRole("button", { name: /login/i });
    await userEvent.click(loginButton);

    expect(await screen.findByText(/campo obrigatório/i)).toBeVisible();
    expect(await screen.findByText(/email inválido/i)).toBeVisible();
  });

  it("should toggle password visibility when eye button is clicked", async () => {
    render(<Sut />);

    const passwordInput = screen.getByPlaceholderText("****");
    const toggleButton = screen.getByRole("button", { name: "" });

    expect(passwordInput).toHaveAttribute("type", "password");

    await userEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute("type", "text");

    await userEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute("type", "password");
  });

  it("should be able to authenticate", async () => {
    const login = vi.fn().mockResolvedValue({ user: { id: 1 } });
    const setUser = vi.fn();
    const navigate = vi.fn();

    render(<Sut login={login} setUser={setUser} navigate={navigate} />);

    const { loginButton } = await setupForm();

    await userEvent.click(loginButton);

    await waitFor(() => {
      expect(login).toHaveBeenCalledWith({
        email: "user@test.com",
        password: "123456",
      });

      expect(setUser).toHaveBeenCalledWith({ id: 1 });
      expect(navigate).toHaveBeenCalledWith("/dashboard");
    });
  });

  it("should show error message when api returns a message", async () => {
    const login = vi
      .fn()
      .mockResolvedValue({ error: { message: "Invalid credentials" } });

    render(<Sut login={login} />);

    const { loginButton } = await setupForm();

    await userEvent.click(loginButton);

    await waitFor(() => {
      const errorMessage = screen.getByText("Invalid credentials");

      expect(errorMessage).toBeVisible();
    });
  });

  it("should show error message when login throws an error (catch)", async () => {
    const login = vi.fn().mockRejectedValue({
      isAxiosError: true,
      response: {
        data: {
          error: {
            message: "Credenciais inválidas",
          },
        },
      },
    });

    render(<Sut login={login} />);

    const { loginButton } = await setupForm();

    await userEvent.click(loginButton);

    const errorMessage = await screen.findByText(/credenciais inválidas/i);

    expect(errorMessage).toBeVisible();
  });
});
