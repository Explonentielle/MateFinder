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
}

const defaultContextValue: ChatContextValue = {
  chat: false,
  setChat: () => {},
  current: null,
  setCurrent: () => {},
  otherUser: null,
  setOtherUser: () => {},
};

export const ChatContext = createContext<ChatContextValue>(defaultContextValue);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [chat, setChat] = useState<boolean>(false);
  const [current, setCurrent] = useState<User | null>(null);
  const [otherUser, setOtherUser] = useState<User | null>(null);

  return (
    <ChatContext.Provider value={{ chat, setChat, current, setCurrent, otherUser, setOtherUser }}>
      {children}
      {/* <Chat/> */}
    </ChatContext.Provider>
  );
}

export const useChat = (): ChatContextValue => useContext(ChatContext);
