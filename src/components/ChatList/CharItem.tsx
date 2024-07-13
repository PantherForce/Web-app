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
      className={`md:p-4 p-3 mb-2 bg-white w-full md:w-3/4 rounded-lg border border-gray-300 md:border-gray-300 cursor-pointer flex justify-between items-center transition hover:bg-blue-50 ${
        chat.isRead ? "text-gray-700" : "font-bold text-black"
      }`}
      onClick={() => onSelect(chat.id)}
    >
      <div className="flex md:flex-row justify-items-end flex-col">
        <div className="flex items-center">
          <img
            src={chat.profilePicture}
            alt={chat.name}
            className="w-12 h-12 rounded-full mr-4 shadow-md border-2 border-blue-100"
          />
          <div>
            <div className="text-sm w-full md:text-lg">{chat.name}</div>
            <div className="text-sm font-normal text-gray-500">
              {chat.lastMessage}
            </div>
          </div>
        </div>
        <div className="flex items-center ml-0 md:ml-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleBookmark(chat.id);
            }}
            className={`font-medium transition ${
              chat.isBookmarked ? "text-yellow-500" : "text-gray-500"
            }`}
          >
            {chat.isBookmarked ? "★ Unbookmark" : "☆ Bookmark"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatItem;
