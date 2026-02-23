import * as React from "react";
import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
}

export function Container({
  as: Component = "div",
  className,
  ...props
}: ContainerProps) {
  return <Component className={cn("cc-container", className)} {...props} />;
}

