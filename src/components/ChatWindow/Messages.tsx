import React from "react";

interface MessageProps {
  message: {
    id: string;
    text: string;
    timestamp: string;
    sender: string;
  };
}

const Messages: React.FC<MessageProps> = ({ message }) => {
  return (
    <div className="p-4 bg-black-200 shadow-lg rounded-xl border  my-2">
      <div className="flex justify-between items-center mb-2">
        <p className="text-lg font-semibold text-blue-600">{message.sender}</p>
        <p className="text-sm text-gray-500">
          {new Date(message.timestamp).toLocaleString()}
        </p>
      </div>
      <p className="text-base text-gray-800">{message.text}</p>
    </div>
  );
};

export default Messages;
