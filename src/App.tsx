import React, { useState } from "react";
import ChatList from "./components/ChatList/ChatList";
import ChatWindow from "./components/ChatWindow/ChatWindow";

const App: React.FC = () => {
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);

  const handleChatSelect = (id: string) => {
    setSelectedChatId(id);
  };

  return (
    <div className="flex h-screen">
      <ChatList onChatSelect={handleChatSelect} />
      {selectedChatId && (
        <div className="w-1/2">
          <ChatWindow chatId={selectedChatId} />
        </div>
      )}
    </div>
  );
};

export default App;
