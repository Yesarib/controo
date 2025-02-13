'use client'

import React, { useCallback, useEffect, useState } from 'react';
import { Box, Typography, Divider, Button } from '@mui/material';
import { getUserChats } from '@/app/dashboard/supabase/chat';
import { useUser } from '@/hooks/use-user';
// import { format } from 'date-fns';
import { Add, MoreVert } from '@mui/icons-material';
import Link from 'next/link';

interface Chat {
    id: string;
    user_id: string;
    title: string;
    created_at: string;
}

export function Sidebar() {
    const { userId } = useUser();
    // console.log(userId);

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
        <div>
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
                <div>
                    <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>
                        Contro
                    </Typography>
                </div>
                <div className='flex items-center w-full mt-8'>
                    <Button
                        fullWidth
                        sx={{
                            textTransform: 'capitalize',
                            borderRadius: '12px',
                            color: 'white',
                            display: 'flex',
                            justifyContent: 'start',
                            alignItems: 'center',
                            textAlign: 'center',
                        }}
                    >
                        <Add sx={{ mr: 1 }} fontSize='small' />
                        <Link href={'/dashboard'}>
                            <Typography variant="body2" gutterBottom sx={{ color: 'white', mt: 1 }}>
                                New Content
                            </Typography>
                        </Link>
                    </Button>
                </div>

                <Divider sx={{ my: 2, backgroundColor: 'gray' }} />

                <div className='mt-8'>
                    <Typography variant="body1" sx={{ color: 'white', fontWeight: 'bold', fontFamily: 'Lato, sans-serif', }}>
                        Today
                    </Typography>
                    <Box sx={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1,
                        mt: 1
                    }}>
                        {chats.map((chat) => (
                            <Link key={chat.id} className='group w-full flex justify-between items-center p-2 text-white bg-gray-400 rounded-md
                            hover:bg-gray-600 transition duration-300 ease-in-out
                            ' href={`/dashboard/chat/${chat.id}`}>
                                <Typography variant="body2" sx={{
                                    fontFamily: 'Lato, sans-serif',
                                }}>{chat.title}</Typography>
                                <button className='hidden group-hover:block'>
                                    <MoreVert sx={{ height: '20px' }} />
                                </button>
                            </Link>
                        ))}

                    </Box>
                </div>

                <Divider sx={{ my: 2, backgroundColor: 'gray' }} />

                <div style={{ marginTop: 'auto' }}>
                    <Typography variant="body2" color="gray" sx={{ textAlign: 'center' }}>
                        Settings
                    </Typography>
                </div>
            </Box>
        </div>
    );
}
