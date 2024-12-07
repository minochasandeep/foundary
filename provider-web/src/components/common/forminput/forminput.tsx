import React from 'react';
import { Box, Typography, TextField, InputAdornment } from '@mui/material';
import { FormInputProps } from './types';

// This is a common form input component that can be reused across the application
const FormInput: React.FC<FormInputProps> = ({ label, placeholder, name, register, errorMessage, endAdornmentIcon }) => {
    return (
        <Box>
            <Typography variant="body1" component="label" sx={{ fontWeight: 'bold', display: 'block', color: 'white' }} htmlFor={name}>
                {label}
            </Typography>
            <TextField
                id={name}
                placeholder={placeholder}
                fullWidth
                autoComplete="off"
                variant="outlined"
                margin="dense"
                {...register}
                error={!!errorMessage}
                helperText={errorMessage}
                InputProps={{
                    endAdornment: endAdornmentIcon && <InputAdornment position="end">{endAdornmentIcon}</InputAdornment>,
                }}
                sx={{
                    '& .MuiOutlinedInput-root': {
                        '& > fieldset': { borderColor: '#fff' },
                    },
                    '& .MuiInputBase-root': { color: '#fff' },
                    paddingBottom: '16px',
                }}
            />
        </Box>
    );
};

export default FormInput;
