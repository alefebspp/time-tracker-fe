import { isAxiosError } from "axios";

export function returnErrorMessage(error: unknown) {
  if (isAxiosError(error)) {
    if (error.response) {
      return (
        (error.response.data.error.message as string) ||
        "Erro no servidor. Por favor, tente de novo."
      );
    }
  }

  return "Erro no servidor. Por favor, tente de novo.";
}
