import React from "react";

export interface CardAction {
  label: string;
  onClick: () => void;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  disabled?: boolean;
}

export interface CardProps {
  title: string;
  description?: string;

  // Main visual
  value?: string | number;
  imageSrc?: string;
  icon?: React.ReactNode;

  // Status / metadata
  badges?: string[];

  // Optional actions
  actions?: CardAction[];
  secondaryAction?: CardAction;

  // Visual variations
  variant?: "default" | "compact" | "elevated";

  // Optional interaction
  onClick?: () => void;

  // Styling hooks
  className?: string;
  styleOverrides?: React.CSSProperties;

  // Optional metric-card support based on the attached design
  progress?: number;
}
