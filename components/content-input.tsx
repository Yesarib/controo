'use client'
import React from "react";
import { TextField, Typography, Box, IconButton, CircularProgress } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';

type ContentInputProps = {
    setMessage: React.Dispatch<React.SetStateAction<string>>;
    handleSubmit: () => void;
    isNewMessage?: boolean;
    isLoading?: boolean;
}

const ContentInput: React.FC<ContentInputProps> = ({ setMessage, handleSubmit, isNewMessage = true, isLoading = false }) => {
    return (
        <Box className="w-full p-6 flex flex-col justify-center items-center">
            {isNewMessage ? (
                <Typography variant="h5" sx={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 'bold', color: 'white' }}>
                    What kind of content should we create today?
                </Typography>
            ) : null}

            <Box sx={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <TextField
                    multiline
                    rows={4}
                    placeholder="Enter the topic you want to generate content for..."
                    onChange={(e) => setMessage(e.target.value)}
                    disabled={isLoading}
                    sx={{
                        width: '50%',
                        backgroundColor: '#2c2f36',
                        mt: 2,
                        color: 'white',
                        borderRadius: '24px',
                        paddingRight: '50px',
                        '& .MuiOutlinedInput-root': {
                            border: 'none',
                            '& fieldset': { border: 'none' },
                        },
                        '& .MuiInputBase-root': { boxShadow: 'none' },
                        '& .MuiInputBase-input': {
                            color: 'white',
                            '&::placeholder': { color: 'white' },
                        },
                    }}
                />
                <Box sx={{
                    position: 'absolute',
                    bottom: '5px',
                    right: '25px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '50%',
                }}>
                    <IconButton onClick={handleSubmit} disabled={isLoading} sx={{ borderRadius: '50%', color: 'white' }}>
                        {isLoading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : <SendIcon />}
                    </IconButton>
                </Box>
            </Box>
        </Box>
    )
}

export { ContentInput };
