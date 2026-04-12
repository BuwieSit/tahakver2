import React, { useState } from 'react';
import { MessageCircle, X, Send, Headphones, User } from 'lucide-react';

const SupportChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const mockMessages = [
    { id: 1, text: "Hi there! 👋 Welcome to TAHAK Support. How can we help you with your healing journey today?", sender: 'bot' },
    { id: 2, text: "You can ask about our packages, booking availability, or traditional rituals.", sender: 'bot' },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-[10000]">
      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-[350px] max-w-[90vw] bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden animate__animated animate__fadeInUp animate__faster">
          {/* Header */}
          <div className="bg-emerald-600 p-6 text-white">
            <div className="flex justify-between items-center mb-1">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-xl">
                  <Headphones size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-lg leading-tight">TAHAK Support</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-emerald-300 rounded-full animate-pulse" />
                    <span className="text-[10px] font-medium opacity-80 uppercase tracking-wider">Online Now</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/20 p-1.5 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="h-[350px] overflow-y-auto p-6 bg-gray-50 space-y-4">
            {mockMessages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'bot' ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
                  msg.sender === 'bot' 
                    ? 'bg-white text-gray-700 shadow-sm rounded-tl-none' 
                    : 'bg-emerald-600 text-white shadow-md rounded-tr-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            <div className="flex justify-start">
              <div className="bg-white px-4 py-2 rounded-full shadow-sm flex gap-1 items-center">
                <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce" />
                <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-gray-100 flex items-center gap-2">
            <input 
              type="text" 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 bg-gray-100 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
            />
            <button className="p-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-900/10">
              <Send size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 transform hover:scale-110 active:scale-95 ${
          isOpen ? 'bg-gray-900 text-white rotate-90' : 'bg-emerald-600 text-white shadow-emerald-600/30'
        }`}
      >
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
      </button>
    </div>
  );
};

export default SupportChatbot;
