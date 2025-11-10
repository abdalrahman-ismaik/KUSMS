import { TextField, TextFieldProps } from '@mui/material';

export default function Input(props: TextFieldProps) {
  return (
    <TextField
      fullWidth
      variant="outlined"
      {...props}
    />
  );
}
