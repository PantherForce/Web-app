export type Chat = {
  id: string;
  name: string;
  profilePicture: string;
  lastMessage: string;
  isRead: boolean;
  professionalDetails: string;
  isBookmarked?: boolean;
};

export type Message = {
  id: string;
  text: string;
  timestamp: string;
  sender: string;
};

import { chat } from "./mock/chat";
import { message } from "./mock/messages";

export type Messages = {
  [chatId: string]: Message[];
};

const mockChats: Chat[] = chat.map((c) => ({
  ...c,
  isRead: c.isRead,
}));

const mockMessages: Messages = message;

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
