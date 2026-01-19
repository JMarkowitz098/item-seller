import React from "react";
import { Button } from "./Button";

type ActionType = "edit" | "delete" | "mark-sold" | "mark-unsold" | "submit";

interface ActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  actionType: ActionType;
  children: React.ReactNode;
}

const actionConfig: Record<
  ActionType,
  { variant: "primary" | "secondary" | "danger" | "success" | "warning" }
> = {
  edit: { variant: "primary" },
  delete: { variant: "danger" },
  "mark-sold": { variant: "warning" },
  "mark-unsold": { variant: "success" },
  submit: { variant: "primary" },
};

export function ActionButton({
  actionType,
  children,
  ...props
}: ActionButtonProps) {
  const config = actionConfig[actionType];

  return (
    <Button variant={config.variant} size="sm" {...props}>
      {children}
    </Button>
  );
}
