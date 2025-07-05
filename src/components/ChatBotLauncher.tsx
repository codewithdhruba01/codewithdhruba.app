import React from 'react';
import { BotMessageSquare } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const ChatBotLauncher: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Optional: Hide button on the chat page itself
  if (location.pathname === '/chat-assistant') return null;

  return (
    <div className="group fixed bottom-20 right-5 z-50">
      <button
        onClick={() => navigate('/chat-assistant')}
        className="bg-[#333333b7] hover:bg-[#222222] p-3 rounded-full shadow-lg transition-all"
        aria-label="Open Chat Assistant"
      >
        <BotMessageSquare size={24} className="text-white" />
      </button>

      {/* Tooltip */}
      <span className="absolute -top-10 right-1/2 translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-all duration-200">
      </span>
    </div>
  );
};

export default ChatBotLauncher;
