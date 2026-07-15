"use client";

import { Check, X } from "lucide-react";

interface PasswordStrengthProps {
  password: string;
}

export function PasswordStrength({ password }: PasswordStrengthProps) {
  const rules = [
    {
      label: "At least 8 characters",
      valid: password.length >= 8,
    },
    {
      label: "One uppercase letter",
      valid: /[A-Z]/.test(password),
    },
    {
      label: "One lowercase letter",
      valid: /[a-z]/.test(password),
    },
    {
      label: "One number",
      valid: /\d/.test(password),
    },
    {
      label: "One special character",
      valid: /[!@#$%^&*(),.?\":{}|<>]/.test(password),
    },
  ];

  if (!password) return null;

  return (
    <div>
      <p className="text-xs text-muted-foreground">
        Password must contain at least{" "}
        <span className="font-medium text-foreground">8 characters</span>,{" "}
        <span className="font-medium text-foreground">1 uppercase letter</span>,{" "}
        <span className="font-medium text-foreground">1 lowercase letter</span>,{" "}
        <span className="font-medium text-foreground">1 number</span>, and{" "}
        <span className="font-medium text-foreground">1 special character</span>
        .
      </p>
    </div>
  );
}
