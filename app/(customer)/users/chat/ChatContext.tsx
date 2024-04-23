"use client"
import React, { createContext, useContext, useState, ReactNode } from 'react';
import Chat from './Chat';

interface User {
  id: string;
  name: string | null;
  email: string | null;
  photoUrl: string | null;
}

interface ChatContextValue {
  chat: boolean;
  setChat: (value: boolean) => void;
  current: User | null;
  setCurrent: (user: User | null) => void;
  otherUser: User | null;
  setOtherUser: (user: User | null) => void;
  messages: number;
  setMessages: (number: number) => void;
}

const defaultContextValue: ChatContextValue = {
  chat: false,
  setChat: () => { },
  current: null,
  setCurrent: () => { },
  otherUser: null,
  setOtherUser: () => { },
  messages:  0,
  setMessages: () => { },
};

export const ChatContext = createContext<ChatContextValue>(defaultContextValue);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [chat, setChat] = useState<boolean>(false);
  const [current, setCurrent] = useState<User | null>(null);
  const [otherUser, setOtherUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<number>(0);


  return (
    <ChatContext.Provider value={{ chat, setChat, current, setCurrent, otherUser, setOtherUser, messages, setMessages }}>
      {children}
      <Chat />
    </ChatContext.Provider>
  );
}

export const useChat = (): ChatContextValue => useContext(ChatContext);
