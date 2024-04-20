"use client"

import { Button } from '@/src/components/ui/button';
import { CardDescription } from '@/src/components/ui/card';
import { useChat } from './ChatContext';

interface User {
    id: string;
    name: string | null;
    email: string | null;
    photoUrl: string | null;
}

function ChatButton({ current, otherUser }: { current: User, otherUser: User }) {
    const { chat, setChat, setCurrent, setOtherUser } = useChat();

    const handleClick = () => {
        setCurrent(current)
        setOtherUser(otherUser)
        setChat(true);
    };

    return (
        <CardDescription className='w-full'>
            <Button className="px-2" onClick={handleClick}>
                Send a message   
            </Button>
        </CardDescription>
    );
}

export default ChatButton; 