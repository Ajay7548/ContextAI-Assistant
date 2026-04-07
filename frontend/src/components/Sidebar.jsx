import { Sparkles } from 'lucide-react'
import React from 'react'

const Sidebar = () => {
  return (
   <>
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
   </>
  )
}

export default Sidebar