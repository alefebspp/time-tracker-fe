import { X, Check } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  isValid: boolean;
  label: string;
};

export default function PasswordRuleItem({ isValid, label }: Props) {
  return (
    <div
      data-testid={`${isValid ? "valid" : "invalid"}-password-rule`}
      className={cn("flex items-center gap-2 text-red-500", {
        "text-green-500": isValid,
      })}
    >
      {isValid && <Check className="h-4 w-4 text-green-600" />}
      {!isValid && <X className="h-4 w-4 text-red-600" />}
      <span className="text-xs">{label}</span>
    </div>
  );
}
