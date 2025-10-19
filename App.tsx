
import React, { useState } from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Chatbot from './components/Chatbot';
import { ChatIcon } from './components/icons/ChatIcon';

function App() {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  return (
    <div className="bg-stone-100 min-h-screen font-sans text-gray-800">
      <Header />
      <main className="p-4 sm:p-6 lg:p-8">
        <Dashboard />
      </main>
      
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsChatbotOpen(!isChatbotOpen)}
          className="bg-brand-green-700 text-white p-4 rounded-full shadow-lg hover:bg-brand-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-green-700 transition-transform transform hover:scale-110"
          aria-label="Alternar Chatbot"
        >
          <ChatIcon className="w-8 h-8" />
        </button>
      </div>

      <Chatbot isOpen={isChatbotOpen} onClose={() => setIsChatbotOpen(false)} />
    </div>
  );
}

export default App;
