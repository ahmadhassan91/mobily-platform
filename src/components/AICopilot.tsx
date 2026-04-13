'use client';

import { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Sparkles, User, Package, TrendingUp } from 'lucide-react';
import clsx from 'clsx';

type Message = {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  actionCard?: {
    type: 'transfer' | 'po';
    title: string;
    details: string;
  };
};

const predefinedScript = [
  "Can you tell me which retail outlets in Jeddah are running low on Data SIMs?",
  "Draft a transfer request for 2,000 units from the West Hub to the Corniche Branch.",
  "What is our current M2M IoT pool capacity?"
];

export default function AICopilot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg-0',
      sender: 'ai',
      text: 'Hello Hassan. I am your Supply Intelligence Copilot. You can ask me to analyze stock, execute transfers, or draft purchase orders.'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMsg: Message = { id: Date.now().toString(), sender: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI thinking and generating a specific response
    setTimeout(() => {
      let aiResponse: Message = { id: (Date.now() + 1).toString(), sender: 'ai', text: '' };

      const lowerText = text.toLowerCase();
      if (lowerText.includes('jeddah') || lowerText.includes('data sim')) {
        aiResponse.text = "Currently, only the Corniche Branch in Jeddah is critically low on Data SIMs (4G). They have under 24 hours of stock remaining based on an average velocity of 50 units/day.";
      } else if (lowerText.includes('transfer') || lowerText.includes('draft')) {
        aiResponse.text = "I have drafted the transfer request for your approval. This will pull from the West Hub which currently has 6,200 units (healthy).";
        aiResponse.actionCard = {
          type: 'transfer',
          title: 'Transfer Order Drafted',
          details: '2,000 x SIM-D-001 (WH-02 → OUT-004)'
        };
      } else if (lowerText.includes('m2m') || lowerText.includes('capacity')) {
        aiResponse.text = "Our M2M / IoT number pool currently has total capacity of 1.2M. We have 380,000 units allocated and 200,000 reserved. You have roughly 51% free runway remaining.";
      } else {
        aiResponse.text = "I've analyzed the platform data. The action has been logged and the Oracle Fusion interface will process it in the next sync batch.";
      }

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={clsx(
          "fixed bottom-6 right-6 z-40 p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 group",
          isOpen ? "opacity-0 pointer-events-none translate-y-10" : "opacity-100 translate-y-0",
          "bg-gradient-to-r from-[#00A5D9] to-blue-600 text-white border-2 border-white/20"
        )}
      >
        <Sparkles size={24} className="relative z-10" />
        <span className="absolute inset-0 rounded-full animate-ping bg-[#00A5D9] opacity-20" />
      </button>

      {/* Chat Window */}
      <div
        className={clsx(
          "fixed bottom-6 right-6 z-50 w-[380px] h-[600px] max-h-[85vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden transition-all duration-500 origin-bottom-right bg-[var(--bg-card)] border border-[var(--border-color)]",
          isOpen ? "scale-100 opacity-100" : "scale-50 opacity-0 pointer-events-none"
        )}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#00A5D9] to-[#0083B0] p-5 flex items-center justify-between text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10 scale-150 rounded-full blur-3xl -top-1/2 -left-1/2" />
          <div className="relative z-10 flex items-center gap-3">
             <div className="p-2 bg-white/20 rounded-xl backdrop-blur-md">
               <Bot size={20} className="text-white" />
             </div>
             <div>
               <h3 className="font-bold text-sm tracking-tight flex items-center gap-2">
                 Supply Copilot
                 <span className="px-1.5 py-0.5 rounded-full bg-emerald-500 text-white text-[9px] uppercase tracking-widest">Active</span>
               </h3>
               <p className="text-xs text-white/80 font-medium leading-none">Powered by Oracle AI</p>
             </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="relative z-10 p-2 rounded-full hover:bg-white/20 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Message Area */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {messages.map((msg) => (
            <div key={msg.id} className={clsx("flex gap-3 max-w-[85%]", msg.sender === 'user' ? "ml-auto flex-row-reverse" : "")}>
              
              <div className={clsx(
                "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-white",
                msg.sender === 'ai' ? "bg-gradient-to-br from-[#00A5D9] to-blue-600 shadow-md shadow-[#00A5D9]/20" : "bg-slate-700"
              )}>
                {msg.sender === 'ai' ? <Bot size={14} /> : <User size={14} />}
              </div>

              <div className="flex flex-col gap-2 relative group">
                <div className={clsx(
                  "p-3.5 text-sm shadow-sm rounded-2xl",
                  msg.sender === 'user' 
                    ? "bg-[#0f172a] text-white rounded-tr-none" 
                    : "bg-[var(--bg-surface)] text-[var(--text-main)] border border-[var(--border-color)] rounded-tl-none font-medium leading-relaxed"
                )}>
                  {msg.text}
                </div>

                {msg.actionCard && (
                  <div className="animate-fade-in bg-gradient-to-br from-[#00A5D9]/10 to-[var(--bg-surface)] border border-[#00A5D9]/30 rounded-2xl overflow-hidden mt-1 p-4 shadow-sm">
                     <div className="flex items-center gap-2 mb-2 text-[#00A5D9]">
                        {msg.actionCard.type === 'transfer' ? <Package size={16} /> : <TrendingUp size={16} />}
                        <h4 className="font-bold text-xs uppercase tracking-wider">{msg.actionCard.title}</h4>
                     </div>
                     <p className="text-[var(--text-main)] font-semibold text-sm mb-3">
                       {msg.actionCard.details}
                     </p>
                     <button className="w-full bg-[#00A5D9] text-white py-2 rounded-xl text-xs font-bold shadow-md shadow-[#00A5D9]/20 hover:scale-[1.02] active:scale-95 transition-all">
                       Approve & Sync to Oracle
                     </button>
                  </div>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3 max-w-[85%] animate-fade-in">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00A5D9] to-blue-600 text-white flex items-center justify-center shadow-md">
                <Bot size={14} />
              </div>
              <div className="px-4 py-3 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl rounded-tl-none flex items-center gap-1.5 h-10 shadow-sm">
                <span className="w-1.5 h-1.5 bg-[#00A5D9] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}/>
                <span className="w-1.5 h-1.5 bg-[#00A5D9] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}/>
                <span className="w-1.5 h-1.5 bg-[#00A5D9] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}/>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Queries */}
        {messages.length === 1 && (
          <div className="px-4 pb-2 space-y-2">
            <p className="text-[10px] uppercase font-bold text-[var(--text-muted)] tracking-wider px-1">Suggested Scenarios</p>
            <div className="flex overflow-x-auto gap-2 pb-2 hide-scrollbar">
              {predefinedScript.map((script, i) => (
                <button
                  key={i}
                  onClick={() => setInputText(script)}
                  className="whitespace-nowrap px-3 py-1.5 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-full text-xs font-semibold text-[var(--text-main)] hover:border-[#00A5D9] transition-colors flex-shrink-0"
                >
                  {script.substring(0, 25)}...
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="p-4 bg-[var(--bg-surface)] border-t border-[var(--border-color)]">
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(inputText); }}
            className="flex items-center gap-2 relative bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl pr-2 focus-within:border-[#00A5D9] focus-within:ring-2 focus-within:ring-[#00A5D9]/20 transition-all shadow-inner"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask the AI copilot..."
              className="flex-1 bg-transparent border-none py-3 pl-4 text-sm outline-none text-[var(--text-main)] placeholder-[var(--text-muted)] font-medium"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="p-2 bg-[#00A5D9] text-white rounded-xl disabled:opacity-50 disabled:bg-[var(--bg-surface)] disabled:text-[var(--text-muted)] transition-all hover:scale-105 active:scale-95 shadow-sm"
            >
              <Send size={16} className={clsx(!inputText.trim() ? "" : "-ml-0.5 mt-0.5")} />
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
