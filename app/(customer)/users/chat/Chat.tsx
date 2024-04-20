"use client"

import Talk from 'talkjs';
import { useEffect, useRef } from 'react';
import { Plus } from 'lucide-react';
import { useChat } from './ChatContext';

export default function Chat({ }) {
    const chatboxEl = useRef(null);
    const { chat, setChat, otherUser, current, setCurrent, setOtherUser } = useChat();


    useEffect(() => {
        if (chat) {
            if (current && otherUser) {
                Talk.ready.then(() => {
                    const user1 = new Talk.User({
                        id: current.id,
                        name: current.name || "",
                        email: current.email,
                        photoUrl: current.photoUrl,
                        welcomeMessage: 'Hi',
                        role: 'default',
                    });

                    const user2 = new Talk.User({
                        id: otherUser.id,
                        name: otherUser.name || "",
                        email: otherUser.email,
                        photoUrl: otherUser.photoUrl,
                        welcomeMessage: 'Hi',
                        role: 'default',
                    });

                    if (user2 && user1) {
                        const session = new Talk.Session({
                            appId: 'tVBP2u6a',
                            me: user1,
                        });

                        const conversation = session.getOrCreateConversation(
                            Talk.oneOnOneId(user1, user2)
                        );

                        conversation.setParticipant(user1);
                        conversation.setParticipant(user2);

                        const chatbox = session.createChatbox();
                        chatbox.mount(chatboxEl.current);
                        chatbox.select(conversation);
                    }

                });
            }
        }
    }, [Chat, otherUser, current]);

    const handleCloseChat = () => {
        setChat(false); 
        setCurrent(null)
        setOtherUser(null)

    };

    return (
        <>
            {chat && (
                <main className='h-[50vh] w-[28vw] absolute top-[45vh] right-[2vw] z-10'>
                    <button className="" onClick={handleCloseChat}>
                        <Plus className="h-6 w-6 rotate-45 text-red-600" />
                    </button>
                    <div className=' h-[50vh]' ref={chatboxEl} />
                </main>
            )}
        </>
    );
}
