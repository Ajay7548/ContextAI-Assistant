import React, { useState } from "react";
import axios from "axios";
import Sidebar from "./components/Sidebar";
import Chathistory from "./components/Chathistory";
import Chatbox from "./components/Chatbox";

function App() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hello! I am ContextAI. Ask me anything about the documents in my knowledge base.",
    },
  ]);
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async (userMessage) => {
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setLoading(true);

    try {
      // Direct call to ContextAI backend
      const backendUrl =
        import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";
      console.log("Backend URL:", backendUrl);
      const response = await axios.post(`${backendUrl}/chat`, {
        question: userMessage,
      });

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: response.data.answer },
      ]);
    } catch (error) {
      console.error("Error communicating with backend:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry, I encountered an error. Please make sure the backend server and AI services are running.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-screen bg-[var(--background)] text-[var(--foreground)] selection:bg-[var(--accent)] selection:text-white overflow-hidden">
      {/* Sidebar (Optional presentation element) */}
      <Sidebar />

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col h-full relative min-w-0">
        {/* Chat History */}
        <Chathistory messages={messages} loading={loading} />

        {/* Input Form */}
        <Chatbox onSendMessage={handleSendMessage} loading={loading} />
      </div>
    </div>
  );
}

export default App;
