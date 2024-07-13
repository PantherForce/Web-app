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
    <div className="p-4 bg-gray-100 rounded-lg shadow-md my-2">
      <p className="text-lg">
        <strong>{message.sender}:</strong> {message.text}
      </p>
      <p className="text-sm text-green-100">{message.timestamp}</p>
    </div>
  );
};

export default Messages;
