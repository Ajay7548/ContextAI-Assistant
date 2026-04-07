import React, { useRef, useEffect } from 'react';
import { Bot, User } from 'lucide-react';

const Chathistory = ({ messages, loading }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  return (
    <div className="flex-1 w-full overflow-y-auto scroll-smooth flex flex-col items-center">
      <div className="w-full max-w-3xl p-4 md:p-6 pb-6">
        {messages.map((msg, idx) => (
          <div 
            key={idx} 
            className={`flex gap-4 mb-8 text-base animate-fade-in ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.role === 'assistant' && (
              <div className="w-10 h-10 rounded-full bg-linear-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/20 text-white">
                <Bot size={20} />
              </div>
            )}
            
            <div 
              className={`max-w-[85%] h-full rounded-2xl px-5 py-3.5 shadow-sm leading-relaxed
                ${msg.role === 'user' 
                  ? 'bg-[#2d3139] text-white border border-[#3f4451]' 
                  : 'bg-transparent text-gray-200'
                }`}
            >
              {msg.content}
            </div>

            {msg.role === 'user' && (
              <div className="w-10 h-10 rounded-full bg-[#1a1d24] border border-[#2d3139] flex items-center justify-center shrink-0 text-gray-400">
                <User size={20} />
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex gap-4 mb-8 animate-fade-in">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/20 text-white">
              <Bot size={20} />
            </div>
             <div className="px-5 py-4 flex items-center gap-1.5 h-12">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-500 typing-dot"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-blue-500 typing-dot"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-blue-500 typing-dot"></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default Chathistory;