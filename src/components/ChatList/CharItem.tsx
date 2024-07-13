import React from "react";
import { Chat } from "../../api/index";

interface ChatItemProps {
  chat: Chat;
  onSelect: (id: string) => void;
  onToggleBookmark: (id: string) => void;
}

const ChatItem: React.FC<ChatItemProps> = ({
  chat,
  onSelect,
  onToggleBookmark,
}) => {
  return (
    <div
      className={`p-4 mb-2 bg-white rounded-lg shadow-md border border-gray-200 cursor-pointer flex justify-between items-center transition hover:bg-blue-50 ${
        chat.isRead ? "text-gray-700" : "font-bold text-black"
      }`}
      onClick={() => onSelect(chat.id)}
    >
      <div className="flex items-center">
        <img
          src={chat.profilePicture}
          alt={chat.name}
          className="w-12 h-12 rounded-full mr-4 shadow-md border-2 border-blue-100"
        />
        <div>
          <div className="text-lg">{chat.name}</div>
          <div className="text-sm text-gray-500">{chat.lastMessage}</div>
        </div>
      </div>
      <div className="flex items-center">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleBookmark(chat.id);
          }}
          className={`ml-4 font-medium transition ${
            chat.isBookmarked ? "text-yellow-500" : "text-gray-500"
          }`}
        >
          {chat.isBookmarked ? "★ Unbookmark" : "☆ Bookmark"}
        </button>
      </div>
    </div>
  );
};

export default ChatItem;
