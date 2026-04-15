import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Headphones, User, Sparkles, ChevronRight } from 'lucide-react';

const KNOWLEDGE_BASE = {
  greetings: {
    keywords: ['hi', 'hello', 'hey', 'good morning', 'good afternoon', 'good evening', 'kumusta'],
    response: "Hi there! 👋 Welcome to TAHAK Support. How can we help you with your healing journey today?",
    recommendations: ['What is TAHAK?', 'Show me packages', 'How to book?']
  },
  about: {
    keywords: ['what is tahak', 'about tahak', 'meaning', 'tahan', 'kalikasan', 'story'],
    response: "TAHAK (Tahanan sa Kalikasan) is a wellness-focused tour operator in Quezon, Philippines. Our name is a fusion of 'Tahanan' (home) and 'Kalikasan' (nature), representing the environment as a home for wellness. It also means 'journey' in Filipino.",
    recommendations: ['Where is it located?', 'Our Essence', 'Who are the partners?']
  },
  location: {
    keywords: ['where', 'location', 'place', 'address', 'quezon', 'sta lucia'],
    response: "We are located in the heart of Sta. Lucia, Quezon, Philippines. It's a sanctuary where the lush greenery becomes your temporary home.",
    recommendations: ['How to get there?', 'Is transportation provided?', 'Mountain trek details']
  },
  packages: {
    keywords: ['package', 'tour', 'experience', 'price', 'how much', 'rates', 'offer'],
    response: "We offer several curated experiences: \n\n• Ugnayan (Connection) - ₱2,500: Day trip with forest bathing & meditation.\n• Sama (Community Stay) - ₱4,800: 2D1N farm immersion & traditional crafts.\n• Kapwa (Shared Journey) - ₱7,200: 3D2N mountain trek with tribal storytelling.\n• Sound of Silence - ₱1,800: 4-hour therapeutic sound bath.\n• Ancestral Healing (Hilot) - ₱3,200: Full day massage & herbal bath.\n• Mountain Tea Ritual - ₱1,200: 2-hour tea tasting & medicinal plant tour.\n\nWhich one would you like to know more about?",
    recommendations: ['Ugnayan details', 'Sama details', 'Kapwa details', 'Hilot massage']
  },
  ugnayan: {
    keywords: ['ugnayan', 'connection details'],
    response: "Ugnayan (The Connection) is a Day Trip priced at ₱2,500 for 2-4 persons. It includes a full day of forest bathing, guided meditation, and an organic lunch. It's perfect for those looking to reconnect with nature in a single day.",
    recommendations: ['How to book?', 'What to bring?', 'Show all packages']
  },
  sama: {
    keywords: ['sama', 'community details'],
    response: "Sama (Community Stay) is a 2 Days, 1 Night experience for ₱4,800 (Max 6 persons). You'll immerse in local farm life, learn traditional crafts, and sleep under the stars. A great way to experience local culture.",
    recommendations: ['Is food included?', 'What to bring?', 'Show all packages']
  },
  kapwa: {
    keywords: ['kapwa', 'shared journey details'],
    response: "Kapwa (Shared Journey) is our premier 3 Days, 2 Nights experience for ₱7,200. It's designed for groups of 10 and involves a multi-day mountain trek with professional guides and tribal storytelling.",
    recommendations: ['Difficulty level?', 'What to bring?', 'Show all packages']
  },
  booking: {
    keywords: ['book', 'reservation', 'how to book', 'schedule', 'cancel', 'reschedule'],
    response: "You can book directly through our 'Packages' or 'Create' pages. For cancellations or rescheduling, please contact us at least 48 hours in advance via your profile or our support team.",
    recommendations: ['Payment methods', 'Cancellation policy', 'Contact info']
  },
  payment: {
    keywords: ['payment', 'pay', 'gcash', 'credit card', 'bank transfer', 'cost'],
    response: "We accept GCash, bank transfers, and major credit cards via our secure booking portal.",
    recommendations: ['Is it secure?', 'Do you accept cash?', 'Refund policy']
  },
  trekking: {
    keywords: ['trek', 'mountain', 'hiking', 'bring', 'clothes', 'shoes', 'difficulty'],
    response: "For treks, we recommend comfortable hiking boots, a reusable water bottle, sun protection, and a light rain jacket. We have trails for all skill levels, from gentle forest paths to challenging mountain treks.",
    recommendations: ['Beginner trails', 'What to bring?', 'Weather policy']
  },
  family: {
    keywords: ['children', 'kids', 'family', 'age', 'suitable'],
    response: "Most of our experiences are family-friendly! However, some mountain treks have age restrictions for safety. Please check specific package details.",
    recommendations: ['Family packages', 'Pet policy', 'Safety for kids']
  },
  transportation: {
    keywords: ['shuttle', 'transport', 'car', 'pick up', 'bus', 'drive'],
    response: "Yes, we provide shuttle services from designated pick-up points for most of our packages to ensure a hassle-free journey.",
    recommendations: ['Pick-up points', 'Parking availability', 'Driving directions']
  },
  weather: {
    keywords: ['rain', 'weather', 'storm', 'cancel weather', 'safety'],
    response: "Safety is our priority. In case of severe weather, we will offer to reschedule your booking or provide a full refund.",
    recommendations: ['Refund policy', 'Rescheduling', 'Current weather']
  },
  pets: {
    keywords: ['pet', 'dog', 'cat', 'animal'],
    response: "While we love animals, most of our eco-sites prohibit pets to protect the local wildlife. Please check with us for specific exceptions.",
    recommendations: ['Eco-rules', 'Why no pets?', 'Contact support']
  }
};

const SupportChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi there! 👋 Welcome to TAHAK Support. How can we help you with your healing journey today?", sender: 'bot' },
    { id: 2, text: "You can ask about our packages, booking, or our story.", sender: 'bot' },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [recommendations, setRecommendations] = useState(['What is TAHAK?', 'Show me packages', 'How to book?', 'What to bring?']);
  
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const findResponse = (input) => {
    const lowInput = input.toLowerCase();
    
    // Check for direct matches or keywords
    for (const key in KNOWLEDGE_BASE) {
      const entry = KNOWLEDGE_BASE[key];
      if (entry.keywords.some(keyword => lowInput.includes(keyword))) {
        return {
          text: entry.response,
          recommendations: entry.recommendations
        };
      }
    }

    return {
      text: "I'm not sure I understand. Could you try rephrasing? You can ask about our packages, location, or booking process.",
      recommendations: ['Show me packages', 'Where is it located?', 'Contact Support']
    };
  };

  const handleSend = (textToSend) => {
    const text = textToSend || message;
    if (!text.trim()) return;

    // Add user message
    const newUserMsg = { id: Date.now(), text, sender: 'user' };
    setMessages(prev => [...prev, newUserMsg]);
    setMessage('');
    
    // Show typing indicator
    setIsTyping(true);

    // Simulate bot thinking
    setTimeout(() => {
      const response = findResponse(text);
      const newBotMsg = { id: Date.now() + 1, text: response.text, sender: 'bot' };
      setMessages(prev => [...prev, newBotMsg]);
      setRecommendations(response.recommendations);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[10000]">
      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-[380px] max-w-[90vw] h-[600px] max-h-[80vh] bg-white rounded-3xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden animate__animated animate__fadeInUp animate__faster">
          {/* Header */}
          <div className="bg-emerald-600 p-6 text-white shrink-0">
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
          <div className="flex-1 overflow-y-auto p-6 bg-gray-50 space-y-6 no-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {messages.map((msg, index) => {
              const isLastBotMessage = msg.sender === 'bot' && index === messages.findLastIndex(m => m.sender === 'bot');
              
              return (
                <div key={msg.id} className="space-y-3">
                  <div className={`flex ${msg.sender === 'bot' ? 'justify-start' : 'justify-end'}`}>
                    <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
                      msg.sender === 'bot' 
                        ? 'bg-white text-gray-700 shadow-sm rounded-tl-none border border-gray-100' 
                        : 'bg-emerald-600 text-white shadow-md rounded-tr-none'
                    }`}>
                      {msg.text.split('\n').map((line, i) => (
                        <React.Fragment key={i}>
                          {line}
                          {i < msg.text.split('\n').length - 1 && <br />}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>

                  {/* Suggestions under the latest bot message */}
                  {isLastBotMessage && !isTyping && recommendations.length > 0 && (
                    <div className="flex flex-wrap gap-2 pl-2">
                      {recommendations.slice(0, 3).map((rec, i) => (
                        <button
                          key={i}
                          onClick={() => handleSend(rec)}
                          className="text-[10px] bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-100 px-3 py-1.5 rounded-full transition-all flex items-center gap-1 group animate__animated animate__fadeInUp animate__faster"
                          style={{ animationDelay: `${i * 0.1}s` }}
                        >
                          {rec}
                          <ChevronRight size={10} className="opacity-40 group-hover:opacity-100 transition-opacity" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white px-4 py-2 rounded-full shadow-sm flex gap-1 items-center border border-gray-100">
                  <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce" />
                  <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-gray-100 flex items-center gap-2 shrink-0">
            <input 
              type="text" 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 bg-gray-100 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
            />
            <button 
              onClick={() => handleSend()}
              disabled={!message.trim() || isTyping}
              className={`p-3 rounded-xl transition-all shadow-lg ${
                !message.trim() || isTyping 
                ? 'bg-gray-200 text-gray-400 shadow-none' 
                : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-900/10'
              }`}
            >
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
