import React, { useState, useEffect } from "react";
import { fetchMessages, sendMessage, Message } from "../../api/index";

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
    <div className="flex flex-col h-full">
      <div className="mt-4 p-4 overflow-y-auto">
        {messages.map((message) => (
          <div key={message.id} className="mb-2">
            <div className="bg-gray-100 rounded-lg p-3">
              <p className="text-lg">
                <strong>{message.sender}:</strong> {message.text}
              </p>
              <p className="text-sm text-gray-500">{message.timestamp}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 border-t border-gray-300">
        <div className="">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="border border-gray-300 p-2 w-full rounded-md"
          />
        </div>
        <button
          onClick={handleSendMessage}
          className="mt-2 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
