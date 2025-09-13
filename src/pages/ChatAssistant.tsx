import React, { useState, useEffect } from 'react';
import { SendHorizonal, MessageSquareText, Linkedin, Mail, Twitter } from 'lucide-react';

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
    if (input.includes('about'))
      return "I'm a passionate Full Stack Developer based in India, with a strong focus on creating beautiful and functional web applications.";
    if (input.includes('How are you'))
      return "I’m doing great.";
    if (input.includes('skills'))
      return "My skills include HTML, CSS, JS, React, TypeScript, Tailwind CSS, Node.js, Python, Java.";
    if (input.includes('education'))
      return "Currently pursuing my BCA in Computer Science and Engineering, I love exploring new technologies and building innovative solutions.";
    if (input.includes('project'))
      return `Current projects include:
    • Multi Calculator – A feature-rich calculator with multiple tools.
    • File Converter App – A simple and responsive static file converter landing application.
    • Outfit Wallpaper Generator - a modern, interactive web application.
Explore more on the Projects page!`;
    if (input.includes('blog'))
      return `Current Blogs include:
    • Getting Started with React and TypeScript.
    • Getting Started with Visual Studio Code: The Complete Guide.
    • Mastering Python Packages: Organize and Share Your Code.
Explore more on the blog page!`;
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
    <div className="min-h-screen bg-neutral-950 text-white py-16 px-4 flex flex-col items-center">
      <h2 className="text-4xl font-bold mb-12"></h2>
      <h1 className="text-4xl font-bold mb-5 font-excon" data-aos="fade-up">
        Get in Touch
      </h1>
      <p className="text-gray-400 mb-10 pb-5 text-center max-w-md font-satoshi" data-aos="fade-up">
        Have a question or want to Chat with my assistant below.
      </p>

      <div
        className="w-full max-w-xl bg-neutral-900 rounded-lg shadow-xl p-4 space-y-4"
        data-aos="fade-up"
      >
        {/* Assistant Header */}
        <div className="flex items-center gap-4 border-b border-gray-700 pb-4">
          <div className="bg-green-600 rounded-full w-10 h-10 flex items-center justify-center text-white font-bold">
            <MessageSquareText className="h-6 w-6" />
          </div>
          <div>
            <div className="font-semibold text-lg font-synonym">Chat Assistant</div>
            <div className="text-sm text-green-400 font-outfit">Online · Replies instantly</div>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="h-[320px] overflow-y-auto space-y-3 pr-1">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`rounded-lg px-4 py-2 max-w-[75%] text-sm ${
                  msg.role === 'user'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-800 text-gray-200'
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
      <div className="mt-10 text-center">
        <h3 className="text-xl font-bold text-white mb-5 font-synonym" data-aos="fade-up">Other Ways to Connect</h3>
        <div className="flex gap-10 justify-center text-gray-400 text-sm" data-aos="fade-up">
          
  {/* LinkedIn */}
  <a
    href="https://www.linkedin.com/in/dhrubaraj-pati/"
    className="flex flex-col items-center group"
    target="_blank"
    rel="noopener noreferrer"
  >
    <div className="bg-[#1c1c1c] border border-gray-900 rounded-full p-3 group-hover:text-[#499eff] transition">
      <Linkedin className="h-6 w-6" />
    </div>
    <span className="mt-2 group-hover:text-[#499eff]">LinkedIn</span>
  </a>

  {/* Email */}
  <a
    href="mailto:pati.dhrubaraj@outlook.com"
    className="flex flex-col items-center group"
  >
    <div className="bg-[#1c1c1c] border border-gray-900 rounded-full p-3 group-hover:text-[#b83434] transition">
      <Mail className="h-6 w-6" />
    </div>
    <span className="mt-2 group-hover:text-[#b83434]">Email</span>
  </a>

  {/* Twitter */}
  <a
    href="https://x.com/codewithdhruba" //
    className="flex flex-col items-center group"
    target="_blank"
    rel="noopener noreferrer"
  >
    <div className="bg-[#1c1c1c] border border-gray-900 rounded-full p-3 group-hover:text-[#1DA1F2] transition">
      <Twitter className="h-6 w-6" />
    </div>
    <span className="mt-2 group-hover:text-[#1DA1F2]">Twitter</span>
  </a>
</div>

      </div>
    </div>
  );
};

export default ChatAssistant;
