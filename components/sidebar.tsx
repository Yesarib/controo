/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useCallback, useEffect, useState } from 'react';
import { Box, Typography, Divider, Button, IconButton, Menu, MenuItem } from '@mui/material';
import { deleteChat, getUserChats } from '@/app/dashboard/supabase/chat';
import { useUser } from '@/hooks/use-user';
import { Add, MoreVert } from '@mui/icons-material';
import Link from 'next/link';
import { deleteMessagesByChatId } from '@/app/dashboard/supabase/message';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useParams, useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';
import { signOut } from '@/app/(home)/login/action';
import Loading from './loading';
import Image from 'next/image';

interface Chat {
    id: string;
    user_id: string;
    title: string;
    created_at: string;
}

export function Sidebar() {
    const { userId } = useUser();
    const [chats, setChats] = useState<Chat[]>([]);
    const [anchorEl, setAnchorEl] = useState<EventTarget & HTMLDivElement | null>(null);
    const [selectedChatId, setSelectedChatId] = useState("");
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const params = useParams();
    const chatId = params.chatId;

    const getChats = useCallback(async () => {
        setLoading(true);
        if (!userId) {
            console.log('No user id');
            setLoading(false);
            return;
        }

        const response = await getUserChats(userId);

        if (!response || !Array.isArray(response)) {
            console.log('Invalid response from Supabase:', response);
            setChats([]);
        } else {
            setChats(response as Chat[]);
        }
        setLoading(false);
    }, [userId]);

    useEffect(() => {
        if (userId) {
            getChats();
        }
    }, [userId, chatId]);

    const handleMenuOpen = (event: any, chatId: string) => {
        event.preventDefault()
        setAnchorEl(event.currentTarget);
        setSelectedChatId(chatId);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedChatId("");
    };

    const handleDelete = async () => {
        if (selectedChatId) {
            await deleteChat(selectedChatId);
            await deleteMessagesByChatId(selectedChatId);
        }
        handleMenuClose();
        if (chatId === selectedChatId) {
            router.push('/dashboard');
        }
        getChats();
    };

    return (
        <div>
            <Box
                className="p-4"
                sx={{
                    width: 250,
                    backgroundColor: '#2A2D36',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100vh',
                }}
            >

                <div className='flex justify-center items-center'>
                    <Image src={'/logo-no-background.png'} alt="logo" width={120} height={100} />
                </div>
                
                <Button fullWidth sx={{ textTransform: 'capitalize', borderRadius: '12px', color: 'white', display: 'flex', justifyContent: 'start', alignItems: 'center', mt: 8 }}>
                    <Add sx={{ mr: 1 }} fontSize='small' />
                    <Link href={'/dashboard'}>
                        <Typography variant="body2" gutterBottom sx={{ color: 'white', mt: 1 }}>
                            New Content
                        </Typography>
                    </Link>
                </Button>

                <Divider sx={{ my: 2, backgroundColor: 'gray' }} />

                <Typography variant="body1" sx={{ color: 'white', fontWeight: 'bold', fontFamily: 'Lato, sans-serif', mt: 2 }}>
                    Today
                </Typography>

                {loading ? (
                    <Loading isSidebar width="200" />
                ) : (
                    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 1, mt: 1 }}>
                        {chats.map((chat) => (
                            <Link key={chat.id} className='group w-full flex justify-between items-center p-2 text-white bg-[#404150] rounded-md hover:bg-gray-600 transition duration-300 ease-in-out' href={`/dashboard/chat/${chat.id}`}>
                                <Typography variant="body2" sx={{ fontFamily: 'Lato, sans-serif' }}>
                                    {chat.title}
                                </Typography>
                                <IconButton onClick={(e) => handleMenuOpen(e, chat.id)}>
                                    <MoreVert sx={{ height: '20px', color: 'white' }} />
                                </IconButton>
                            </Link>
                        ))}
                    </Box>
                )}

                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                    <MenuItem onClick={handleDelete} sx={{ display: 'flex', width: '100%', height: '100%', color: 'red', alignItems: 'center' }}>
                        <DeleteForeverIcon />
                        <Typography variant="body2" sx={{ mt: 0.5 }}>Delete</Typography>
                    </MenuItem>
                </Menu>

                <Divider sx={{ my: 2, backgroundColor: 'gray' }} />

                <Button onClick={signOut} fullWidth sx={{ textTransform: 'capitalize', display: 'flex', alignItems: 'center', textAlign: 'center', gap: 2, color: 'white', marginTop: 'auto' }}>
                    <LogOut /> Log Out
                </Button>
            </Box>
        </div>
    );
}
