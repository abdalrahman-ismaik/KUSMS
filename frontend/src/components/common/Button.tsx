import { Button as MuiButton, CircularProgress } from '@mui/material';
import type { ButtonProps } from '@mui/material';

interface CustomButtonProps extends ButtonProps {
  loading?: boolean;
}

export default function Button({ loading, disabled, children, ...props }: CustomButtonProps) {
  return (
    <MuiButton
      disabled={loading || disabled}
      {...props}
      startIcon={loading ? <CircularProgress size={20} color="inherit" /> : props.startIcon}
    >
      {children}
    </MuiButton>
  );
}
