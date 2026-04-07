import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2 } from 'lucide-react';

const Chatbox = ({ onSendMessage, loading }) => {
  const [input, setInput] = useState('');
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;
    onSendMessage(input);
    setInput('');
  };

  useEffect(() => {
    if (!loading && inputRef.current) {
      inputRef.current.focus();
    }
  }, [loading]);

  return (
    <div className="w-full shrink-0 bg-gradient-to-t from-[var(--background)] via-[var(--background)] to-transparent pt-4 pb-6 px-4 z-10">
       <div className="w-full max-w-3xl mx-auto">
         <form 
           onSubmit={handleSubmit}
           className="relative flex items-end glass rounded-2xl p-2 shadow-2xl transition-shadow focus-within:shadow-blue-500/10 focus-within:border-[#3f4451]"
         >
           <input
             ref={inputRef}
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
  );
};

export default Chatbox;