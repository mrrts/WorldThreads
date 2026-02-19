import { cn } from "@/lib/utils";
import type { LabelHTMLAttributes } from "react";
import { forwardRef } from "react";

const Label = forwardRef<HTMLLabelElement, LabelHTMLAttributes<HTMLLabelElement>>(
  ({ className, ...props }, ref) => (
    <label
      ref={ref}
      className={cn(
        "text-xs font-medium text-muted-foreground uppercase tracking-wider select-none",
        className,
      )}
      {...props}
    />
  ),
);
Label.displayName = "Label";

export { Label };
