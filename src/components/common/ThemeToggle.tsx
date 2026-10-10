import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '', showLabel = false }) => {
  const { theme, toggleTheme } = useApp();
  const isDark = theme === 'dark';

  return (
    <div className={`flex items-center gap-2 select-none ${className}`}>
      {showLabel && (
        <span className="text-xs font-bold text-[#173D2A] dark:text-[#ECF5EE]">
          {isDark ? '🌙 Night Theme' : '☀️ Day Theme'}
        </span>
      )}
      {/* Small Left/Right Theme Slider Switch */}
      <button
        type="button"
        onClick={toggleTheme}
        className={`relative inline-flex h-7 w-14 items-center rounded-full p-0.5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#26783C]/40 shadow-inner cursor-pointer border ${
          isDark
            ? 'bg-[#14261C] border-[#2A5C3C]'
            : 'bg-[#E5EED6] border-[#CADCB8]'
        }`}
        title={isDark ? 'Switch to Day Theme (Light)' : 'Switch to Night Theme (Dark)'}
        aria-label="Toggle Day and Night Theme"
      >
        {/* Track Icons - Left Sun, Right Moon */}
        <div className="flex w-full items-center justify-between px-1.5 text-[11px] pointer-events-none">
          <Sun
            className={`w-3.5 h-3.5 transition-all duration-300 ${
              isDark ? 'text-[#566B58] opacity-40 scale-90' : 'text-[#D99A1E] opacity-100 scale-100'
            }`}
          />
          <Moon
            className={`w-3.5 h-3.5 transition-all duration-300 ${
              isDark ? 'text-[#68D391] opacity-100 scale-100' : 'text-[#8A9B89] opacity-40 scale-90'
            }`}
          />
        </div>

        {/* Sliding Thumb (Left on Day, Right on Night) */}
        <span
          className={`absolute top-0.5 flex h-6 w-6 items-center justify-center rounded-full shadow-md transition-all duration-300 ease-out ${
            isDark
              ? 'left-[30px] bg-gradient-to-br from-[#2E8555] to-[#173D2A] text-white border border-[#3E9F6B]'
              : 'left-0.5 bg-white text-[#D99A1E] border border-[#CADCB8]'
          }`}
        >
          {isDark ? (
            <Moon className="w-3.5 h-3.5 text-[#E4EDCF] fill-[#E4EDCF]" />
          ) : (
            <Sun className="w-3.5 h-3.5 text-[#EFC66B] fill-[#EFC66B]" />
          )}
        </span>
      </button>
    </div>
  );
};

