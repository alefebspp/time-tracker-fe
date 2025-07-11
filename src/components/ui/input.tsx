import * as React from "react";

import { cn } from "@/lib/utils";

type Props = React.ComponentProps<"input"> & {
  hasError?: boolean;
};

const Input = React.forwardRef<HTMLInputElement, Props>(
  ({ className, type, hasError, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "bg-white flex h-10 w-full rounded-md border border-gray-500 outline-none px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground  disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className,
          {
            "border-destructive": hasError,
          }
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
