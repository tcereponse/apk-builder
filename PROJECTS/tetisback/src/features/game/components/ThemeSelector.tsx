import React from 'react';
import { useTheme } from '@/app/contexts/ThemeContext';
import { Palette } from 'lucide-react';
export default function ThemeSelector() {
const { theme, setTheme } = useTheme();
const themes = ['light', 'dark', 'diamond'] as const;
return (
    <div className="flex items-center gap-2 bg-gray-800 p-2 rounded-lg border border-gray-600">
      <Palette size={18} className="text-gray-400" />
      {themes.map((t) => (
        <button
          key={t}
          onClick={() => setTheme(t)}
          className={`px-3 py-1 rounded text-sm capitalize transition-colors ${theme === t ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
        >
          {t}
        </button>
      ))}
    </div>
  );
}