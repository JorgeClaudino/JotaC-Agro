import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { runChat } from '../services/geminiService';
import { SendIcon } from './icons/SendIcon';
import { CloseIcon } from './icons/CloseIcon';
import { LoadingSpinner } from './icons/LoadingSpinner';

interface ChatbotProps {
  isOpen: boolean;
  onClose: () => void;
}

const Chatbot: React.FC<ChatbotProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        { id: 'initial', text: 'Olá! Eu sou o assistente da JC Agro. Como posso te ajudar com suas questões sobre o agronegócio hoje?', sender: 'ai' }
      ]);
    }
  }, [isOpen, messages.length]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (input.trim() === '' || isLoading) return;

    const userMessage: ChatMessage = { id: Date.now().toString(), text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const aiResponse = await runChat(input);
      const aiMessage: ChatMessage = { id: (Date.now() + 1).toString(), text: aiResponse, sender: 'ai' };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage: ChatMessage = { id: (Date.now() + 1).toString(), text: 'Desculpe, encontrei um erro. Por favor, tente novamente.', sender: 'ai' };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-24 right-6 w-full max-w-sm h-full max-h-[600px] bg-white rounded-lg shadow-2xl flex flex-col z-40 transform transition-all duration-300 ease-in-out origin-bottom-right scale-100">
      <header className="flex items-center justify-between p-4 bg-brand-green-700 text-white rounded-t-lg">
        <h2 className="font-bold text-lg">Assistente JC Agro</h2>
        <button onClick={onClose} className="hover:bg-brand-green-800 p-1 rounded-full">
          <CloseIcon className="w-6 h-6" />
        </button>
      </header>
      
      <div className="flex-1 p-4 overflow-y-auto bg-stone-50">
        {messages.map((msg, index) => (
          <div key={index} className={`flex mb-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`rounded-lg px-4 py-2 max-w-xs lg:max-w-md ${msg.sender === 'user' ? 'bg-brand-green-600 text-white' : 'bg-gray-200 text-gray-800'}`}>
              <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start mb-3">
             <div className="rounded-lg px-4 py-2 bg-gray-200 text-gray-800">
                <LoadingSpinner className="w-5 h-5" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Pergunte qualquer coisa..."
            className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green-500"
            disabled={isLoading}
          />
          <button onClick={handleSend} disabled={isLoading} className="bg-brand-green-700 text-white p-2 rounded-lg hover:bg-brand-green-800 disabled:bg-gray-400">
            <SendIcon className="w-6 h-6"/>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;