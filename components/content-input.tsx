'use client'
import React from "react";
import { TextField, Typography, Box, IconButton } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';

type ContentInputProps = {
    setMessage: React.Dispatch<React.SetStateAction<string>>
    handleSubmit: () => void
}

const ContentInput: React.FC<ContentInputProps> = ({ setMessage, handleSubmit }) =>  {

    return (
        <Box className="w-full p-6 flex flex-col justify-center items-center">
            <Typography variant="h5" sx={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 'bold', color: 'white' }}>
                What kind of content should we create today?
            </Typography>
            <Box sx={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <TextField
                    multiline
                    rows={4}
                    placeholder="Enter the topic you want to generate content for..."
                    onChange={(e) => setMessage(e.target.value)}
                    sx={{
                        width: '50%',
                        backgroundColor: '#2c2f36', // Daha açık renk
                        mt: 2,
                        color: 'white',
                        borderRadius: '24px',
                        paddingRight: '50px', // Buton için sağda boşluk bırakmak
                        '& .MuiOutlinedInput-root': {
                            border: 'none', // Border'ı kaldır
                            '& fieldset': {
                                border: 'none', // Border'ı tamamen kaldır
                            },
                        },
                        '& .MuiInputBase-root': {
                            boxShadow: 'none', // Shadow'ı kaldır
                        },
                        '& .MuiInputBase-input': {
                            color: 'white', // Metin rengi beyaz
                            '&::placeholder': {
                                color: 'white', // Placeholder rengi beyaz
                            },
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
                    <IconButton onClick={handleSubmit} sx={{ borderRadius: '50%', color: 'white' }}>
                        <SendIcon />
                    </IconButton>
                </Box>
            </Box>
        </Box>
    )

}

export { ContentInput };