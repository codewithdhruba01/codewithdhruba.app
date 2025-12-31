import React from 'react';
import { BotMessageSquare } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

interface ChatBotLauncherProps {
  bottomOffset?: string;
  zIndex?: string;
}

const ChatBotLauncher: React.FC<ChatBotLauncherProps> = ({
  bottomOffset = 'bottom-20',
  zIndex = 'z-50'
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  if (location.pathname === '/chat-assistant') return null;

  if (location.pathname.startsWith('/blog/')) return null;

  return (
    <div className={`group fixed ${bottomOffset} right-5 ${zIndex} transition-all duration-300`}>
      <button
        onClick={() => navigate('/chat-assistant')}
        className="bg-[#333333b7] hover:bg-[#222222] p-3 rounded-full shadow-lg transition-all"
        aria-label="Open Chat Assistant"
      >
        <BotMessageSquare size={24} className="text-white" />
      </button>

      <span className="absolute -top-10 right-1/2 translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-all duration-200"></span>
    </div>
  );
};

export default ChatBotLauncher;
