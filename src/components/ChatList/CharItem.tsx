import React from "react";
import { Chat } from "../../api/mock/chat";

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
      className={`p-4 border-b cursor-pointer flex justify-between items-center ${
        chat.isRead ? "" : "font-bold"
      }`}
      onClick={() => onSelect(chat.id)}
    >
      <div className="flex items-center">
        <img
          src={chat.profilePicture}
          alt={chat.name}
          className="w-10 h-10 rounded-full mr-4"
        />
        <div>
          <div>{chat.name}</div>
          <div className="text-sm text-gray-600">{chat.lastMessage}</div>
        </div>
      </div>
      <div className="flex items-center">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleBookmark(chat.id);
          }}
          className="ml-4 text-blue-500"
        >
          {chat.isBookmarked ? "Unbookmark" : "Bookmark"}
        </button>
      </div>
    </div>
  );
};

export default ChatItem;
