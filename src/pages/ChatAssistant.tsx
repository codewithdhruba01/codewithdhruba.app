import React, { useState, useEffect } from 'react';
import { SendHorizonal, MessageSquareText } from 'lucide-react';

const ChatAssistant: React.FC = () => {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState('');
  const [showEndMessage, setShowEndMessage] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0); // ✅ Scroll to top on mount

    // Initial bot greeting
    setMessages([
      {
        role: 'assistant',
        content:
          "Hey there! I'm Your Chat Assistant, your personal assistant to explore Dhrubaraj's world of coding, creativity, and projects. Ask me anything — I'm always ready to help!",
      },
    ]);
  }, []);

  const getBotReply = (userInput: string): string => {
    const input = userInput.toLowerCase();

    if (['hi', 'hello', 'hey'].includes(input))
      return "Hey there! I'm Your Chat Assistant, your personal assistant to explore Dhrubaraj's world of coding, creativity, and projects. Ask me anything — I'm always ready to help!";
    if (input.includes('name'))
      return "I'm Dhrubaraj Pati, a passionate Computer Engineering student exploring full-stack development.";
    if (input.includes('skills'))
      return "My skills include React, TypeScript, Tailwind CSS, Node.js, Python, Firebase.";
    if (input.includes('education'))
      return "I’m pursuing Computer Engineering and constantly learning through real-world coding challenges.";
    if (input.includes('project'))
      return `Here are a few of my projects:
1. 🔢 Multi Calculator – A feature-rich calculator with multiple tools.
2. 🧠 AI Chat Assistant – Fully functional assistant using OpenAI (you’re using it now!).
3. 🌐 Portfolio – This sleek and professional website built with React + Tailwind.
Explore more on the Projects page!`;
    if (input.includes('blog'))
      return "I write blogs about web dev, React, and AI tools — check them out in the Blog section.";
    if (input.includes('contact'))
      return "You can reach me through the Contact page or via the social icons in the footer.";
    if (input.includes('github') || input.includes('contribution'))
      return "You'll find my open source work and contributions on the Contributions page — mostly on GitHub.";
    if (input.includes('portfolio'))
      return "This website is my personal portfolio! Feel free to explore all the sections.";

    setShowEndMessage(true);
    return "Thanks for reaching out! 😊 I'll record your message and get back to you soon.";
  };

  const sendMessage = () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: 'user', content: input }];
    const botReply = getBotReply(input);
    setMessages([...newMessages, { role: 'assistant', content: botReply }]);
    setInput('');
  };

  const restartConversation = () => {
    setMessages([
      {
        role: 'assistant',
        content:
          "Hey there! I'm Your Chat Assistant, your personal assistant to explore Dhrubaraj's world of coding, creativity, and projects. Ask me anything — I'm always ready to help!",
      },
    ]);
    setInput('');
    setShowEndMessage(false);
  };

  return (
    <div className="min-h-screen bg-black text-white py-16 px-4 flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-6"></h1>
      <h1 className="text-4xl font-bold mb-5"
      data-aos="fade-up"
      
      >Get in Touch</h1>
      <p className="text-gray-400 mb-10 pb-5 text-center max-w-md" data-aos="fade-up">
        Have a question or want to Chat with my assistant below.
      </p>

      <div className="w-full max-w-xl bg-[#1c1c1c] rounded-lg shadow-xl p-4 space-y-4" data-aos="fade-up">
        {/* Assistant Header */}
        <div className="flex items-center gap-4 border-b border-gray-700 pb-4">
          <div className="bg-green-600 rounded-full w-10 h-10 flex items-center justify-center text-white font-bold">
                <MessageSquareText className="h-6 w-6"/>
          </div>
          <div>
            <div className="font-semibold text-lg">Chat Assistant</div>
            <div className="text-sm text-green-400">Online · Replies instantly</div>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="h-[320px] overflow-y-auto space-y-3 pr-1">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`rounded-lg px-4 py-2 max-w-[75%] text-sm ${
                  msg.role === 'user' ? 'bg-green-600 text-white' : 'bg-gray-800 text-gray-200'
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
        </div>

        {/* Input Box */}
        {!showEndMessage && (
          <div className="flex items-center gap-2 border-t border-gray-700 pt-4">
            <input
              type="text"
              placeholder="Say hello to start..."
              className="flex-1 px-4 py-3 rounded-md bg-[#2a2a2a] text-white focus:outline-none"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            />
            <button
              onClick={sendMessage}
              className="bg-green-600 p-3 rounded-md hover:bg-green-700 transition"
            >
              <SendHorizonal size={18} className="text-white" />
            </button>
          </div>
        )}

        {/* End Message */}
        {showEndMessage && (
          <div className="text-center mt-4">
            <p className="text-gray-400 mb-2">Thanks for reaching out!</p>
            <button
              onClick={restartConversation}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm"
            >
              Start New Conversation
            </button>
          </div>
        )}
      </div>

      {/* Social Footer */}
      {/* <div className="mt-10 text-center">
        <h3 className="text-1xl text-gray-500 mb-3">Other Ways to Connect</h3>
        <div className="flex gap-6 justify-center text-gray-400 text-lg">
          <a href="https://x.com/codewithdhruba" className="text-muted-foreground hover:text-foreground">
                <Linkedin className="h-10 w-10 hover:text-[#00CAFF]" />
                <span className="sr-only">Twitter</span>
              </a>
        </div>
      </div> */}
    </div>
  );
};

export default ChatAssistant;
