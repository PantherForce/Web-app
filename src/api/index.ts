type Chat = {
  id: string;
  name: string;
  profilePicture: string;
  lastMessage: string;
};

type Message = {
  id: string;
  text: string;
  timestamp: string;
  sender: string;
};

import { chats } from "./mock/chat";
import { messages } from "./mock/messages";

type Messages = {
  [chatId: string]: Message[];
};

const mockChats: Chat[] = chats;
const mockMessages: Messages = messages;

export const fetchChats = async (): Promise<Chat[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockChats), 1000);
  });
};

export const fetchMessages = async (chatId: string): Promise<Message[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockMessages[chatId] || []), 1000);
  });
};

export const sendMessage = async (
  chatId: string,
  text: string
): Promise<Message> => {
  return new Promise((resolve) => {
    const newMessage: Message = {
      id: `${Date.now()}`,
      text,
      timestamp: new Date().toISOString(),
      sender: "Me",
    };
    mockMessages[chatId] = [...(mockMessages[chatId] || []), newMessage];
    setTimeout(() => resolve(newMessage), 500);
  });
};
