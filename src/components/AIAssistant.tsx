import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, X, Sparkles, Minimize2, Maximize2, RotateCcw, AlertCircle } from 'lucide-react';
import { api } from '../services/api';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

interface AIAssistantProps {
  initialPrompt?: string | null;
  onClearInitialPrompt?: () => void;
}

export const AIAssistant: React.FC<AIAssistantProps> = ({
  initialPrompt,
  onClearInitialPrompt
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: 'Hello 3rd-Year BTLED-ICT Technician! I am your **CSSENTIAL AI Learning Assistant**. Ask me anything regarding computer assembly, ESD safety precautions, BIOS/UEFI configuration, Windows installation, or hardware fault diagnosis.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Trigger from external component (e.g. Activity hint)
  useEffect(() => {
    if (initialPrompt) {
      setIsOpen(true);
      setIsMinimized(false);
      handleSendPrompt(`I need guidance regarding this scenario: ${initialPrompt}`);
      if (onClearInitialPrompt) onClearInitialPrompt();
    }
  }, [initialPrompt]);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isMinimized]);

  const handleSendPrompt = async (textToSend: string) => {
    const query = textToSend.trim();
    if (!query || isLoading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await api.askAI(query, 'BTLED-ICT Computer System Installation and Configuration');
      const aiMessage: Message = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: response.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (err: any) {
      const errorMessage: Message = {
        id: `err-${Date.now()}`,
        sender: 'ai',
        text: 'Sorry, I encountered a temporary connection issue. Please check your network or try asking your question again.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendPrompt(inputValue);
  };

  const handleClearHistory = () => {
    setMessages([
      {
        id: 'welcome-reset',
        sender: 'ai',
        text: 'Chat history cleared. How can I help you with Computer System Installation and Configuration today?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const quickPrompts = [
    'Explain POST beep codes',
    'How to apply thermal paste correctly',
    'Troubleshoot: No display on monitor',
    'BIOS vs UEFI differences'
  ];

  return (
    <>
      {/* Floating Launcher Button */}
      {!isOpen && (
        <button
          id="open-ai-assistant-btn"
          onClick={() => setIsOpen(true)}
          className="fixed bottom-5 right-5 z-40 bg-blue-700 hover:bg-blue-800 text-white rounded-full p-4 shadow-xl flex items-center gap-2.5 transition-all transform hover:scale-105 active:scale-95 cursor-pointer group"
          title="Need help with installation or troubleshooting? Ask CSSENTIAL AI"
        >
          <div className="relative">
            <Bot className="w-6 h-6" />
            <Sparkles className="w-3 h-3 text-yellow-300 absolute -top-1 -right-1 animate-pulse" />
          </div>
          <span className="text-xs font-black tracking-wide hidden sm:inline-block pr-1">
            CSSENTIAL AI ASSISTANT
          </span>
        </button>
      )}

      {/* Floating Chat Modal */}
      {isOpen && (
        <div
          className={`fixed bottom-4 right-4 z-50 w-[92vw] sm:w-[420px] bg-white rounded-2xl shadow-2xl border border-blue-200 overflow-hidden flex flex-col transition-all duration-200 ${
            isMinimized ? 'h-14' : 'h-[540px]'
          }`}
        >
          {/* Header */}
          <div className="bg-blue-800 text-white px-4 py-3 flex items-center justify-between shadow-xs select-none">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-blue-700 flex items-center justify-center border border-blue-400">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="text-xs font-black tracking-wide flex items-center gap-1.5">
                  <span>CSSENTIAL AI TUTOR</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                </h3>
                <span className="text-[10px] text-blue-200 block">
                  Computer System Installation AI
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1 text-blue-200">
              <button
                onClick={handleClearHistory}
                className="p-1 hover:text-white hover:bg-blue-700/50 rounded-md transition-colors cursor-pointer"
                title="Reset conversation"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1 hover:text-white hover:bg-blue-700/50 rounded-md transition-colors cursor-pointer"
                title={isMinimized ? 'Expand' : 'Minimize'}
              >
                {isMinimized ? <Maximize2 className="w-3.5 h-3.5" /> : <Minimize2 className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:text-white hover:bg-blue-700/50 rounded-md transition-colors cursor-pointer"
                title="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Messages Scroll Area */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-50 text-xs">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${
                      msg.sender === 'user' ? 'items-end' : 'items-start'
                    }`}
                  >
                    <div
                      className={`max-w-[88%] p-3 rounded-2xl leading-relaxed whitespace-pre-wrap ${
                        msg.sender === 'user'
                          ? 'bg-blue-700 text-white rounded-br-xs'
                          : 'bg-white border border-gray-200 text-gray-800 rounded-bl-xs shadow-2xs'
                      }`}
                    >
                      {msg.text}
                    </div>
                    <span className="text-[9px] text-gray-400 font-mono mt-1 px-1">
                      {msg.timestamp}
                    </span>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex items-center gap-2 text-xs text-gray-500 bg-white border border-gray-200 p-3 rounded-2xl rounded-bl-xs w-fit shadow-2xs animate-pulse">
                    <Bot className="w-3.5 h-3.5 text-blue-600 animate-spin" />
                    <span>Analyzing technical curriculum...</span>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Prompts Chips */}
              <div className="px-3 py-2 bg-white border-t border-gray-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                {quickPrompts.map((prompt, i) => (
                  <button
                    key={i}
                    onClick={() => handleSendPrompt(prompt)}
                    disabled={isLoading}
                    className="shrink-0 text-[10px] font-semibold bg-blue-50 hover:bg-blue-100 text-blue-800 px-2.5 py-1 rounded-full border border-blue-200 transition-colors cursor-pointer"
                  >
                    {prompt}
                  </button>
                ))}
              </div>

              {/* Input Form */}
              <form
                onSubmit={handleFormSubmit}
                className="p-3 bg-white border-t border-gray-200 flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask about installation, BIOS, or hardware..."
                  disabled={isLoading}
                  className="flex-1 px-3 py-2 text-xs border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-600 outline-hidden bg-gray-50"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isLoading}
                  className={`p-2 rounded-xl text-white transition-all ${
                    inputValue.trim() && !isLoading
                      ? 'bg-blue-700 hover:bg-blue-800 cursor-pointer shadow-xs'
                      : 'bg-gray-300 cursor-not-allowed'
                  }`}
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </>
          )}
        </div>
      )}
    </>
  );
};
