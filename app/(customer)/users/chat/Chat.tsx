import Talk from 'talkjs';
import { useEffect, useRef } from 'react';
import { MessageCircleMore, Plus } from 'lucide-react';
import { useChat } from './ChatContext';
import { toast } from 'sonner';

export default function Chat() {
    const chatboxEl = useRef(null);
    const { chat, setChat, otherUser, current, messages, setMessages, setOtherUser } = useChat();

    useEffect(() => {
        const initializeChat = async () => {
            if (current) {
                const session = new Talk.Session({
                    appId: 'tVBP2u6a',
                    me: new Talk.User({
                        id: current.id,
                        name: current.name || "",
                        email: current.email,
                        photoUrl: current.photoUrl,
                        welcomeMessage: 'Hi',
                        role: 'default',
                    })
                });

                session.unreads.onChange(function (unreadConversations) {
                    const amountOfUnreads = unreadConversations.length;
                    setMessages(amountOfUnreads)
                })

                session.unreads.onChange(function (unreadConversations) {
                    const sender = unreadConversations[unreadConversations.length - 1].lastMessage.sender
                    if (sender) {
                        setOtherUser({
                            id: sender.id.toString(),
                            name: sender.name || "",
                            email: "alex59debonnieres@gmail.com",
                            photoUrl: sender.photoUrl,
    
                        })
                    }
                })

                if (chat && otherUser) {
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
                            email: otherUser.email || "",
                            photoUrl: otherUser.photoUrl || "",
                            welcomeMessage: 'Hi',
                            role: 'default',
                        });

                        if (user2 && user1) {
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
        };

        initializeChat();
    }, [chat, otherUser, current]);

    const handleCloseChat = () => {
        setChat(false);
    };

    const handleOpenChat = () => {
        if (current) {
            setChat(true);
        } else {
            toast.error("Not logged or not recent conversation");
        }
    };

    return (
        <>
            {chat ? (
                <main className='h-[50vh] w-[80vw] md:w-[28vw] fixed top-[45vh] right-[2vw] z-10'>
                    <button className="" onClick={handleCloseChat}>
                        <Plus className="h-6 w-6 rotate-45 text-red-600" />
                    </button>
                    <div className=' h-[50vh]' ref={chatboxEl} />
                </main>
            ) :
            <div className='fixed bottom-[5vh] right-[2vw] z-10'>
                    <MessageCircleMore onClick={handleOpenChat} size={42} />
                    {messages > 0 && (
                        <span className="-translate-x-1/3 -translate-y-1/3 absolute top-0 left-0 mr-4 rounded-full bg-red-500 size-6 flex justify-center items-center text-white">
                            {messages}
                        </span>
                    )}
                </div>
            }
        </>
    );
}
