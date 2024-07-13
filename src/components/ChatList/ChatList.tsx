import React, { useState, useEffect } from "react";
import { Chat } from "../../api/mock/chat";
import { fetchChats } from "../../api/index";
import ChatItem from "./CharItem";

interface ChatListProps {
  onChatSelect: (id: string) => void;
}

const ChatList: React.FC<ChatListProps> = ({ onChatSelect }) => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [unreadChats, setUnreadChats] = useState<Chat[]>([]);
  const [bookmarkedChats, setBookmarkedChats] = useState<Chat[]>([]);
  const [viewMode, setViewMode] = useState<"all" | "unread" | "bookmarked">(
    "all"
  );

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchChats();
      setChats(data);
      setUnreadChats(data.filter((chat) => !chat.isRead));
      setBookmarkedChats(data.filter((chat) => chat.isBookmarked));
    };

    fetchData();
  }, []);

  const handleChatSelect = (id: string) => {
    onChatSelect(id);

    const updatedChats = chats.map((chat) =>
      chat.id === id ? { ...chat, isRead: true } : chat
    );
    setChats(updatedChats);
    setUnreadChats(updatedChats.filter((chat) => !chat.isRead));
  };

  const handleTabChange = (mode: "all" | "unread" | "bookmarked") => {
    setViewMode(mode);
  };

  const toggleBookmark = (id: string) => {
    const updatedChats = chats.map((chat) =>
      chat.id === id ? { ...chat, isBookmarked: !chat.isBookmarked } : chat
    );
    setChats(updatedChats);
    setBookmarkedChats(updatedChats.filter((chat) => chat.isBookmarked));
  };

  const renderChats = (chatsToRender: Chat[]) => {
    return chatsToRender.map((chat) => (
      <ChatItem
        key={chat.id}
        chat={chat}
        onSelect={handleChatSelect}
        onToggleBookmark={toggleBookmark}
      />
    ));
  };

  return (
    <div className="flex flex-col md:flex-row w-1/2 md:w-full h-screen">
      <div className="w-full md:w-1/4 p-4 border-r bg-gray-100">
        <div className="text-2xl font-bold mb-4">SuperDM</div>
        <div
          className={`cursor-pointer py-2 px-4 mb-2 rounded-lg transition ${
            viewMode === "all"
              ? "bg-blue-500 text-white"
              : "bg-white text-gray-700"
          }`}
          onClick={() => handleTabChange("all")}
        >
          All Chats
        </div>
        <div
          className={`cursor-pointer py-2 px-4 mb-2 rounded-lg transition ${
            viewMode === "unread"
              ? "bg-blue-500 text-white"
              : "bg-white text-gray-700"
          }`}
          onClick={() => handleTabChange("unread")}
        >
          Unread Chats ({unreadChats.length})
        </div>
        <div
          className={`cursor-pointer py-2 px-4 mb-2 rounded-lg transition ${
            viewMode === "bookmarked"
              ? "bg-blue-500 text-white"
              : "bg-white text-gray-700"
          }`}
          onClick={() => handleTabChange("bookmarked")}
        >
          Bookmarked Chats ({bookmarkedChats.length})
        </div>
      </div>

      <div className="w-full md:w-3/4 p-4 bg-white overflow-y-auto">
        {viewMode === "all" && renderChats(chats)}
        {viewMode === "unread" && renderChats(unreadChats)}
        {viewMode === "bookmarked" && renderChats(bookmarkedChats)}
      </div>
    </div>
  );
};

export default ChatList;
