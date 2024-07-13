import { fetchChats, fetchMessages, sendMessage } from "../api";

export const getChats = async () => {
  return await fetchChats();
};

export const getMessages = async (chatId: string) => {
  return await fetchMessages(chatId);
};

export const postMessage = async (chatId: string, text: string) => {
  return await sendMessage(chatId, text);
};
