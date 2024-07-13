import React, { useState, useEffect } from "react";
import { fetchMessages, sendMessage, Message } from "../../api/index";
import Messages from "./Messages";

interface ChatWindowProps {
  chatId: string;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ chatId }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    fetchMessages(chatId).then((data) => setMessages(data));
  }, [chatId]);

  const handleSendMessage = async () => {
    if (newMessage.trim() !== "") {
      const message = await sendMessage(chatId, newMessage);
      setMessages((prevMessages) => [...prevMessages, message]);
      setNewMessage("");
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 rounded-lg shadow-lg">
      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <Messages key={message.id} message={message} />
        ))}
      </div>
      <div className="p-4 border-t border-gray-300 bg-white rounded-b-lg">
        <div className="flex flex-col md:flex-row items-stretch md:items-center space-y-2 md:space-y-0 md:space-x-4">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-grow border border-gray-300 p-2 rounded-lg shadow-sm focus:outline-none focus:border-blue-400"
          />
          <button
            onClick={handleSendMessage}
            className="bg-blue-500 p-2 text-white rounded-lg shadow hover:bg-blue-600 transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
