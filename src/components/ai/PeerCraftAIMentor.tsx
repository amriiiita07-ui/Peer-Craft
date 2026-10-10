import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  Bot,
  X,
  Send,
  Trash2,
  HelpCircle,
  Lightbulb,
  Bug,
  GraduationCap,
  Copy,
  Check,
  Maximize2,
  Minimize2,
  FileCode,
  Globe,
  ExternalLink,
  Search,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const PeerCraftAIMentor: React.FC = () => {
  const {
    aiMessages,
    aiMentorMode,
    setAiMentorMode,
    isAiMentorOpen,
    setIsAiMentorOpen,
    selectedQuestionContext,
    setSelectedQuestionContext,
    sendAiMessage,
    clearAiMessages,
    isAiThinking,
  } = useApp();

  const [inputText, setInputText] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const defaultPrompts = [
    'Explain this problem in simple terms',
    'Give me a hint without revealing the solution',
    'Help me find the optimal approach',
    'Explain time and space complexity',
    'Help debug my code',
    'Walk me through an example',
  ];

  const tinyFishPrompts = [
    'Search LeetCode optimal Two Sum solutions',
    'Search React 19 documentation',
    'Search Dijkstra algorithm explanation',
    'Search dynamic programming patterns',
    'Search Python binary search templates',
  ];

  const suggestedPrompts = aiMentorMode === 'TinyFish' ? tinyFishPrompts : defaultPrompts;

  useEffect(() => {
    if (isAiMentorOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [aiMessages, isAiMentorOpen, isAiThinking]);

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim()) return;
    sendAiMessage(inputText);
    setInputText('');
  };

  const handlePromptClick = (prompt: string) => {
    sendAiMessage(prompt);
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (!isAiMentorOpen) {
    return (
      <button
        onClick={() => setIsAiMentorOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-[#173D2A] hover:bg-[#102B20] text-white p-3.5 rounded-full shadow-lg border border-[#E4EDCF]/40 flex items-center gap-2.5 transition-all duration-200 group hover:scale-105"
        title="Open PeerCraft AI Mentor"
      >
        <div className="relative">
          <Bot className="w-5 h-5 text-[#E4EDCF]" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#EFC66B] rounded-full animate-ping" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#EFC66B] rounded-full" />
        </div>
        <span className="text-xs font-bold tracking-tight pr-1 hidden sm:inline">
          AI Mentor
        </span>
      </button>
    );
  }

  return (
    <div
      className={`fixed z-50 bg-[#FAFCF5] border border-[#DCE6D2] rounded-2xl shadow-2xl flex flex-col transition-all duration-300 overflow-hidden ${
        isExpanded
          ? 'inset-4 md:inset-10'
          : 'bottom-4 right-4 md:bottom-6 md:right-6 w-[95vw] md:w-[450px] h-[600px] max-h-[85vh]'
      }`}
    >
      {/* Header */}
      <div className="bg-[#173D2A] text-white p-3.5 flex items-center justify-between border-b border-[#102B20]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#26783C] flex items-center justify-center text-[#EFC66B]">
            {aiMentorMode === 'TinyFish' ? (
              <Globe className="w-4 h-4 text-[#A8DADC]" />
            ) : (
              <Bot className="w-4 h-4" />
            )}
          </div>
          <div>
            <div className="font-bold text-sm leading-tight flex items-center gap-1.5">
              PeerCraft AI Mentor
              <span className={`text-[9px] uppercase font-semibold px-1.5 py-0.5 rounded ${
                aiMentorMode === 'TinyFish'
                  ? 'bg-[#1D5E7A] text-[#D8F3DC] border border-[#52B788]/40'
                  : 'bg-[#26783C] text-[#E4EDCF]'
              }`}>
                {aiMentorMode === 'TinyFish' ? '🐟 TinyFish Live' : `${aiMentorMode} Mode`}
              </span>
            </div>
            <div className="text-[10px] text-[#A2BA95] leading-tight">
              {aiMentorMode === 'TinyFish'
                ? 'Powered by TinyFish Web Search API (Live)'
                : 'Your coding companion, available when you need guidance.'}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1 text-[#A2BA95]">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 hover:text-white hover:bg-[#102B20] rounded"
            title={isExpanded ? 'Collapse' : 'Expand'}
          >
            {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={clearAiMessages}
            className="p-1 hover:text-white hover:bg-[#102B20] rounded"
            title="Clear Chat"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setIsAiMentorOpen(false)}
            className="p-1 hover:text-white hover:bg-[#102B20] rounded ml-1"
            title="Close Assistant"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Mode Selector Tabs */}
      <div className="bg-[#EAF1DC] px-2.5 py-1.5 flex items-center justify-between text-xs border-b border-[#DCE6D2] overflow-x-auto hide-scrollbar gap-1">
        <span className="text-[11px] font-semibold text-[#173D2A] flex items-center gap-1 flex-shrink-0">
          <Sparkles className="w-3 h-3 text-[#26783C]" /> Mode:
        </span>
        <div className="flex items-center gap-1 flex-nowrap">
          {/* 1. Learn */}
          <button
            onClick={() => setAiMentorMode('Learn')}
            className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors flex items-center gap-1 whitespace-nowrap ${
              aiMentorMode === 'Learn'
                ? 'bg-[#173D2A] text-white shadow-xs'
                : 'text-[#1D3024] hover:bg-[#DCE6D2]'
            }`}
          >
            <GraduationCap className="w-3 h-3" /> Learn
          </button>

          {/* 2. TinyFish (Beside Learn) */}
          <button
            onClick={() => setAiMentorMode('TinyFish')}
            className={`px-2 py-0.5 rounded text-[11px] font-medium transition-all flex items-center gap-1 whitespace-nowrap ${
              aiMentorMode === 'TinyFish'
                ? 'bg-[#1D5E7A] text-white shadow-xs ring-1 ring-[#52B788]'
                : 'text-[#10435B] bg-[#D4EAF2]/50 hover:bg-[#C2E2EE]'
            }`}
            title="TinyFish Live Web Search & Agent API"
          >
            <Globe className="w-3 h-3 text-[#38A3A5]" />
            <span className="font-semibold">🐟 TinyFish</span>
          </button>

          {/* 3. Hint */}
          <button
            onClick={() => setAiMentorMode('Hint')}
            className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors flex items-center gap-1 whitespace-nowrap ${
              aiMentorMode === 'Hint'
                ? 'bg-[#173D2A] text-white shadow-xs'
                : 'text-[#1D3024] hover:bg-[#DCE6D2]'
            }`}
          >
            <Lightbulb className="w-3 h-3 text-[#EFC66B]" /> Hint
          </button>

          {/* 4. Debug */}
          <button
            onClick={() => setAiMentorMode('Debug')}
            className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors flex items-center gap-1 whitespace-nowrap ${
              aiMentorMode === 'Debug'
                ? 'bg-[#173D2A] text-white shadow-xs'
                : 'text-[#1D3024] hover:bg-[#DCE6D2]'
            }`}
          >
            <Bug className="w-3 h-3" /> Debug
          </button>
        </div>
      </div>

      {/* Attached Context Banner */}
      {selectedQuestionContext && (
        <div className="bg-[#E4EDCF]/60 px-3 py-1.5 text-[11px] flex items-center justify-between border-b border-[#DCE6D2] text-[#173D2A]">
          <div className="flex items-center gap-1.5 truncate">
            <FileCode className="w-3.5 h-3.5 text-[#26783C] flex-shrink-0" />
            <span className="font-semibold truncate">Context:</span>
            <span className="truncate">{selectedQuestionContext.title} ({selectedQuestionContext.platform})</span>
          </div>
          <button
            onClick={() => setSelectedQuestionContext(null)}
            className="text-[#687769] hover:text-[#D94A4A] ml-2 flex-shrink-0"
            title="Detach context"
          >
            ✕
          </button>
        </div>
      )}

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-3.5 space-y-3.5 text-xs bg-[#FAFCF5]">
        {aiMessages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-[92%] rounded-xl p-3 shadow-2xs relative group ${
                msg.role === 'user'
                  ? 'bg-[#173D2A] text-white rounded-br-xs'
                  : msg.mode === 'TinyFish'
                  ? 'bg-[#F0F7FA] text-[#0F2D38] border border-[#BCE1EE] rounded-bl-xs'
                  : 'bg-[#EEF4E3] text-[#1D3024] border border-[#DCE6D2] rounded-bl-xs'
              }`}
            >
              {msg.role === 'assistant' && (
                <div className="flex items-center justify-between mb-1.5 pb-1 border-b border-black/10 text-[10px] text-[#687769]">
                  <span className="font-bold flex items-center gap-1 text-[#173D2A]">
                    {msg.mode === 'TinyFish' ? (
                      <span className="text-[#10435B] flex items-center gap-1 font-bold">
                        <Globe className="w-3 h-3 text-[#2B7A78]" /> TinyFish Web Agent
                      </span>
                    ) : (
                      `AI Mentor (${msg.mode || 'Guidance'})`
                    )}
                  </span>
                  <button
                    onClick={() => handleCopy(msg.id, msg.content)}
                    className="hover:text-[#173D2A] transition-colors"
                    title="Copy response"
                  >
                    {copiedId === msg.id ? (
                      <Check className="w-3 h-3 text-[#26783C]" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                  </button>
                </div>
              )}

              {/* Render content */}
              <div className="space-y-1.5 leading-relaxed whitespace-pre-wrap font-sans">
                {msg.content}
              </div>

              {/* Render structured TinyFish search results if available */}
              {msg.searchResults && msg.searchResults.length > 0 && (
                <div className="mt-2.5 pt-2 border-t border-[#BCE1EE]/60 space-y-1.5">
                  <div className="text-[10px] font-bold text-[#10435B] flex items-center gap-1">
                    <Search className="w-3 h-3 text-[#2B7A78]" /> Web Sources:
                  </div>
                  <div className="grid grid-cols-1 gap-1.5">
                    {msg.searchResults.slice(0, 4).map((item, i) => (
                      <a
                        key={i}
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-white/80 hover:bg-white border border-[#BCE1EE] hover:border-[#2B7A78] text-[#10435B] transition-all block group"
                      >
                        <div className="font-semibold text-[11px] text-[#0A5C67] group-hover:text-[#063B43] flex items-center justify-between gap-1">
                          <span className="truncate">{item.title}</span>
                          <ExternalLink className="w-3 h-3 flex-shrink-0 opacity-70 group-hover:opacity-100" />
                        </div>
                        {item.snippet && (
                          <div className="text-[10px] text-[#556970] line-clamp-2 mt-0.5">
                            {item.snippet}
                          </div>
                        )}
                        <div className="text-[9px] text-[#849CA3] mt-1 flex items-center gap-1.5">
                          {item.site_name && <span className="font-mono bg-[#E2F0F7] px-1 rounded">{item.site_name}</span>}
                          {item.date && <span>{item.date}</span>}
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              <div
                className={`text-[9px] mt-1 text-right ${
                  msg.role === 'user' ? 'text-[#A2BA95]' : 'text-[#687769]'
                }`}
              >
                {msg.createdAt}
              </div>
            </div>
          </div>
        ))}

        {isAiThinking && (
          <div className="flex items-center gap-2 text-[#26783C] text-xs py-2 px-3 bg-[#EEF4E3] rounded-lg border border-[#DCE6D2] w-fit">
            {aiMentorMode === 'TinyFish' ? (
              <>
                <Globe className="w-3.5 h-3.5 text-[#1D5E7A] animate-spin" />
                <span className="font-medium text-[#1D5E7A] animate-pulse">
                  Querying TinyFish live search API...
                </span>
              </>
            ) : (
              <>
                <Bot className="w-3.5 h-3.5 animate-bounce" />
                <span className="font-medium animate-pulse">PeerCraft AI is analyzing algorithmic logic...</span>
              </>
            )}
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Prompt Chips */}
      <div className="px-3 py-1.5 bg-[#F3F7EA] border-t border-[#DCE6D2] overflow-x-auto hide-scrollbar flex items-center gap-1.5 flex-nowrap">
        {suggestedPrompts.slice(0, 4).map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handlePromptClick(prompt)}
            className="text-[10px] px-2.5 py-1 rounded-full bg-[#FAFCF5] hover:bg-[#E4EDCF] text-[#173D2A] border border-[#DCE6D2] whitespace-nowrap transition-colors flex-shrink-0"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input area */}
      <form
        onSubmit={handleSend}
        className="p-2.5 bg-[#FAFCF5] border-t border-[#DCE6D2] flex items-center gap-2"
      >
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={
            aiMentorMode === 'Learn'
              ? 'Ask for concept breakdown or approach...'
              : aiMentorMode === 'TinyFish'
              ? 'Search live web solutions, docs & code via TinyFish...'
              : aiMentorMode === 'Hint'
              ? 'Ask for progressive hints without spoilers...'
              : 'Paste code or edge case error...'
          }
          className="flex-1 px-3 py-2 text-xs bg-[#EAF1DC]/60 focus:bg-white border border-[#DCE6D2] focus:border-[#26783C] rounded-input text-[#1D3024] placeholder-[#687769] outline-none"
        />
        <button
          type="submit"
          disabled={!inputText.trim() || isAiThinking}
          className="p-2 bg-[#26783C] hover:bg-[#1C622F] disabled:opacity-40 text-white rounded-input transition-colors flex-shrink-0"
          title="Send message"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
};

