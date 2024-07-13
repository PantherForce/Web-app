import React, { useState, useEffect } from "react";
import Chat from "../../api/mock/chat";
import { fetchChats } from "../../api/index";
import ChatItem from "./CharItem"; // Corrected import path

interface ChatListProps {
  onChatSelect: (id: string) => void;
}

const ChatList: React.FC<ChatListProps> = ({ onChatSelect }) => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [unreadChats, setUnreadChats] = useState<Chat[]>([]);
  const [bookmarkedChats, setBookmarkedChats] = useState<Chat[]>([]);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
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
    setSelectedChatId(id);
    onChatSelect(id);

    const updatedChats = chats.map((chat) =>
      chat.id === id ? { ...chat, isRead: true } : chat
    );
    setChats(updatedChats);
    setUnreadChats(updatedChats.filter((chat) => !chat.isRead));
  };

  const handleTabChange = (mode: "all" | "unread" | "bookmarked") => {
    setViewMode(mode);
    setSelectedChatId(null);
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
    <div className="flex flex-col md:flex-row w-full h-screen">
      <div className="w-full md:w-1/4 p-4 border-r">
        <div
          className={`cursor-pointer py-2 px-4 ${
            viewMode === "all" ? "bg-gray-200" : ""
          }`}
          onClick={() => handleTabChange("all")}
        >
          All Chats
        </div>
        <div
          className={`cursor-pointer py-2 px-4 ${
            viewMode === "unread" ? "bg-gray-200" : ""
          }`}
          onClick={() => handleTabChange("unread")}
        >
          Unread Chats ({unreadChats.length})
        </div>
        <div
          className={`cursor-pointer py-2 px-4 ${
            viewMode === "bookmarked" ? "bg-gray-200" : ""
          }`}
          onClick={() => handleTabChange("bookmarked")}
        >
          Bookmarked Chats ({bookmarkedChats.length})
        </div>
      </div>

      <div className="w-full md:w-full p-4">
        {viewMode === "all" && renderChats(chats)}
        {viewMode === "unread" && renderChats(unreadChats)}
        {viewMode === "bookmarked" && renderChats(bookmarkedChats)}
      </div>
    </div>
  );
};

export default ChatList;
