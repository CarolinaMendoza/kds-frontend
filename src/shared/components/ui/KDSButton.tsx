import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import type { ButtonProps } from "@mui/material/Button";
import type { ReactNode } from "react";

type KDSButtonProps = Omit<ButtonProps, "variant" | "color"> & {
  variant?: "primary" | "secondary" | "ghost";
  loading?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
};

const variantMap: Record<NonNullable<KDSButtonProps["variant"]>, ButtonProps> = {
  primary:   { variant: "contained", color: "primary" },
  secondary: { variant: "outlined",  color: "secondary" },
  ghost:     { variant: "text",      color: "inherit" },
};

export default function KDSButton({
  variant = "primary",
  loading,
  startIcon,
  endIcon,
  children,
  disabled,
  sx,
  ...rest
}: KDSButtonProps) {
  const base = variantMap[variant];

  return (
    <Button
      {...base}
      startIcon={!loading ? startIcon : undefined}
      endIcon={!loading ? endIcon : undefined}
      disabled={disabled || loading}
      sx={{
        borderRadius: 5,
        textTransform: "none",
        fontWeight: 600,
        px: 2.5,
        py: 1,
        ...(variant === "ghost" && { ":hover": { backgroundColor: "action.hover" } }),
        ...sx,
      }}
      {...rest}
    >
      {loading ? <CircularProgress size={20} /> : children}
    </Button>
  );
}
