import { TextField } from '@mui/material';
import type { TextFieldProps } from '@mui/material';

export default function Input(props: TextFieldProps) {
  return (
    <TextField
      fullWidth
      variant="outlined"
      {...props}
    />
  );
}
