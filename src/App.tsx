import { useState } from 'react';
import ChatInput from './components/ChatInput';
import ChatMessage from './components/ChatMessage';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const App = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSend = async (message: string) => {
    const userMessage: Message = { role: 'user', content: message };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const res = await fetch('/.netlify/functions/sendMessage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }

      const data = await res.json();
      if (data.response) {
        const assistantMessage: Message = { role: 'assistant', content: data.response };
        setMessages((prev) => [...prev, assistantMessage]);
      } else {
        console.error('Function error:', data.error);
      }
    } catch (error) {
      console.error('Error communicating with OpenAI:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gloomy-background text-gloomy-text font-gloomy">
      <div className="w-full max-w-2xl bg-gloomy-background shadow-lg rounded-lg p-6 border border-gloomy-accent">
        <h1 className="text-3xl font-bold mb-6 text-gloomy-text">Gloomy Bot</h1>
        <div className="space-y-4 mb-4 overflow-y-auto max-h-[60vh]">
          {messages.map((msg, idx) => (
            <ChatMessage key={idx} role={msg.role} content={msg.content} />
          ))}
        </div>
        <ChatInput onSend={handleSend} />
      </div>
    </div>
  );
};

export default App;
