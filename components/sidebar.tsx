'use client'

import React, { useCallback, useEffect, useState } from 'react';
import { Box, Typography, List, ListItem, Divider, Button } from '@mui/material';
import { getUserChats } from '@/app/dashboard/supabase/chat';
import { useUser } from '@/hooks/use-user';

interface Chat {
    id: string;
    user_id: string;
    title: string;
    created_at: string;
}

export function Sidebar() {
    const { userId } = useUser();
    console.log(userId);
    
    const [chats, setChats] = useState<Chat[]>([]);

    const getChats = useCallback(async () => {
        if (!userId) {
            console.log('No user id');
            return;
        }

        const response = await getUserChats(userId);

        if (!response || !Array.isArray(response)) {
            console.log('Invalid response from Supabase:', response);
            setChats([]);
            return;
        }

        setChats(response);
    }, [userId]);

    useEffect(() => {
        getChats();
    }, [getChats]);

    return (
        <Box
            className="p-4"
            sx={{
                width: 250,
                backgroundColor: '#2A2D36',
                display: 'flex',
                flexDirection: 'column',
                height: '100vh',  // Sidebar'ın yüksekliğini %100 yapıyoruz
            }}
        >
            <div className='flex justify-center items-center w-full'>
                <Button
                    fullWidth
                    sx={{
                        textTransform: 'capitalize',
                        border: '1px solid #333',
                        borderRadius: '12px',
                        color: 'white',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center',
                    }}
                >
                    <Typography variant="body1" gutterBottom sx={{ color: 'white', mt: 1 }}>
                        New Content
                    </Typography>
                </Button>
            </div>

            <Divider sx={{ my: 2, backgroundColor: 'gray' }} />

            <div className='mt-8'>
                <Typography variant="body1" sx={{ color: 'white', fontWeight: 'bold' }}>
                    Today
                </Typography>
                <List sx={{ padding: 0 }}>
                    {chats.map((chat) => (
                        <ListItem key={chat.id} sx={{ color: 'white' }}>
                            <Typography variant="body2">{chat.title}</Typography>
                        </ListItem>
                    ))}
                </List>

                <Typography variant="body1" sx={{ color: 'white', fontWeight: 'bold', mt: 2 }}>
                    Last 7 Days
                </Typography>
                <List sx={{ padding: 0 }}>
                    {chats.map((chat) => (
                        <ListItem key={chat.id} sx={{ color: 'white' }}>
                            <Typography variant="body2">{chat.title}</Typography>
                        </ListItem>
                    ))}
                </List>

                <Typography variant="body1" sx={{ color: 'white', fontWeight: 'bold', mt: 2 }}>
                    Last 30 Days
                </Typography>
                <List sx={{ padding: 0 }}>
                    {chats.map((chat) => (
                        <ListItem key={chat.id} sx={{ color: 'white' }}>
                            <Typography variant="body2">{chat.title}</Typography>
                        </ListItem>
                    ))}
                </List>
            </div>

            <Divider sx={{ my: 2, backgroundColor: 'gray' }} />

            <div style={{ marginTop: 'auto' }}>
                <Typography variant="body2" color="gray" sx={{ textAlign: 'center' }}>
                    Settings
                </Typography>
            </div>
        </Box>
    );
}
