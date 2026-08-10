"use client";

import React from "react";
import { Button as UiButton, ButtonProps as UiButtonProps } from "@/components/ui/button";

export interface ButtonProps extends UiButtonProps {
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  loading,
  isLoading,
  disabled,
  children,
  type = "button",
  className,
  ...props
}) => {
  const showLoading = loading ?? isLoading;

  return (
    <UiButton
      type={type}
      disabled={disabled || showLoading}
      isLoading={showLoading}
      className={className}
      {...props}
    >
      {children}
    </UiButton>
  );
};

export default Button;
