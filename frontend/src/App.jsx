import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, Sparkles } from 'lucide-react';
import axios from 'axios';

function App() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! I am ContextAI. Ask me anything about the documents in my knowledge base.' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input;
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setInput('');
    setLoading(true);

    try {
      // Direct call to ContextAI backend
      const response = await axios.post('http://localhost:4000/chat', {
        question: userMessage
      });
      
      setMessages(prev => [...prev, { role: 'assistant', content: response.data.answer }]);
    } catch (error) {
      console.error("Error communicating with backend:", error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Sorry, I encountered an error. Please make sure the backend server and AI services are running.' 
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-[var(--background)] text-[var(--foreground)] selection:bg-[var(--accent)] selection:text-white">
      
      {/* Sidebar (Optional presentation element) */}
      <div className="w-64 hidden md:flex flex-col border-r border-[#2d3139] glass">
        <div className="p-5 border-b border-[#2d3139]">
          <div className="flex items-center gap-2 text-xl font-semibold tracking-tight">
            <Sparkles className="w-6 h-6 text-blue-500" />
            ContextAI
          </div>
        </div>
        <div className="p-4 flex-1">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">Knowledge Base</div>
          <div className="flex flex-col gap-2">
            <div className="p-3 bg-[#2d3139] rounded-lg text-sm text-gray-300 border border-[#3f4451]">
              Refund Policies
            </div>
           
          </div>
        </div>
        <div className="p-4 text-xs text-center text-gray-600 border-t border-[#2d3139]">
          Powered by Llama 3 & HuggingFace
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col items-center">
        {/* Chat History */}
        <div className="flex-1 w-full max-w-3xl overflow-y-auto p-4 md:p-6 pb-32 scroll-smooth">
          {messages.map((msg, idx) => (
            <div 
              key={idx} 
              className={`flex gap-4 mb-8 text-base animate-fade-in ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'assistant' && (
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/20 text-white">
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

        {/* Input Form */}
        <div className="w-full bg-gradient-to-t from-[var(--background)] via-[var(--background)] to-transparent pt-6 pb-6 px-4 fixed bottom-0 left-0 md:pl-64">
           <div className="max-w-3xl mx-auto">
             <form 
               onSubmit={handleSend}
               className="relative flex items-end glass rounded-2xl p-2 shadow-2xl transition-shadow focus-within:shadow-blue-500/10 focus-within:border-[#3f4451]"
             >
               <input
                 type="text"
                 value={input}
                 onChange={(e) => setInput(e.target.value)}
                 disabled={loading}
                 placeholder="Message ContextAI..."
                 className="flex-1 max-h-32 bg-transparent text-white px-4 py-3 pb-3 outline-none placeholder-gray-500 resize-none"
               />
               <button 
                 type="submit" 
                 disabled={loading || !input.trim()}
                 className={`p-3 rounded-xl m-1 transition-all ${
                   input.trim() && !loading
                    ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-500/20' 
                    : 'bg-[#2d3139] text-gray-500 cursor-not-allowed'
                 }`}
               >
                 {loading ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} strokeWidth={2.5} />}
               </button>
             </form>
             <p className="text-center text-xs text-gray-500 mt-3 font-medium">
               ContextAI can make mistakes. Consider verifying important policies.
             </p>
           </div>
        </div>
      </div>
    </div>
  );
}

export default App;
