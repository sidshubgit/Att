
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { generateChatResponse } from '../services/geminiService';
import { BotIcon, UserIcon, SendIcon, SparklesIcon } from './Icons';

const ChatBubble: React.FC<{ message: ChatMessage }> = ({ message }) => {
  const isModel = message.role === 'model';
  return (
    <div className={`flex items-start gap-3 my-4 ${isModel ? '' : 'flex-row-reverse'}`}>
      <div className={`p-2 rounded-full ${isModel ? 'bg-indigo-500' : 'bg-gray-600'}`}>
        {isModel ? <BotIcon className="w-5 h-5 text-white" /> : <UserIcon className="w-5 h-5 text-white" />}
      </div>
      <div className={`p-3 rounded-lg max-w-sm md:max-w-md lg:max-w-lg break-words ${isModel ? 'bg-gray-800' : 'bg-indigo-700'}`}>
        <p className="text-white">{message.content}</p>
      </div>
    </div>
  );
};

export const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 'initial', role: 'model', content: "Hello! I'm the campus assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isThinkingMode, setIsThinkingMode] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatContainerRef.current?.scrollTo(0, chatContainerRef.current.scrollHeight);
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = { id: Date.now().toString(), role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Format history for the service
    const history = messages.map(msg => ({
      role: msg.role,
      parts: [{ text: msg.content }],
    }));
    
    const responseContent = await generateChatResponse(input, history, isThinkingMode);
    
    const modelMessage: ChatMessage = { id: (Date.now() + 1).toString(), role: 'model', content: responseContent };
    setMessages(prev => [...prev, modelMessage]);
    setIsLoading(false);
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-lg flex flex-col h-[600px] w-full max-w-2xl mx-auto border border-gray-700">
      <div className="p-4 border-b border-gray-700 flex justify-between items-center">
        <h2 className="text-xl font-bold text-white">Campus Assistant</h2>
        <div className="flex items-center space-x-2">
            <SparklesIcon className={`transition-colors duration-300 ${isThinkingMode ? 'text-yellow-400' : 'text-gray-500'}`} />
            <span className={`text-sm font-medium ${isThinkingMode ? 'text-white' : 'text-gray-400'}`}>Thinking Mode</span>
            <button
                onClick={() => setIsThinkingMode(!isThinkingMode)}
                className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500 ${isThinkingMode ? 'bg-indigo-600' : 'bg-gray-600'}`}
            >
                <span className={`inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 ${isThinkingMode ? 'translate-x-5' : 'translate-x-0'}`} />
            </button>
        </div>
      </div>
      <div ref={chatContainerRef} className="flex-1 p-4 overflow-y-auto">
        {messages.map(msg => <ChatBubble key={msg.id} message={msg} />)}
        {isLoading && (
            <div className="flex items-start gap-3 my-4">
                <div className="p-2 rounded-full bg-indigo-500">
                    <BotIcon className="w-5 h-5 text-white" />
                </div>
                <div className="p-3 rounded-lg bg-gray-800 flex items-center space-x-2">
                    <span className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse [animation-delay:-0.3s]"></span>
                    <span className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse [animation-delay:-0.15s]"></span>
                    <span className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></span>
                </div>
            </div>
        )}
      </div>
      <div className="p-4 border-t border-gray-700">
        <form onSubmit={handleSendMessage} className="flex items-center gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question..."
            className="flex-1 bg-gray-700 border border-gray-600 rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-indigo-600 text-white p-2 rounded-lg disabled:bg-gray-500 disabled:cursor-not-allowed hover:bg-indigo-500 transition-colors"
          >
            <SendIcon className="w-6 h-6" />
          </button>
        </form>
      </div>
    </div>
  );
};
