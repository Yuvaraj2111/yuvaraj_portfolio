import { cn } from "@/lib/utils";
import type { AnchorHTMLAttributes } from "react";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: "primary" | "ghost" };

export function Button({ variant = "primary", className, children, ...rest }: Props) {
  return (
    <a
      {...rest}
      className={cn(
        "group inline-flex h-11 items-center gap-2 rounded-full px-5 text-sm font-medium transition-colors",
        variant === "primary"
          ? "bg-ink text-bg hover:bg-cyan hover:text-[#04121a]"
          : "border border-line text-ink hover:border-cyan/60 hover:bg-raised/60",
        className
      )}
    >
      {children}
    </a>
  );
}
