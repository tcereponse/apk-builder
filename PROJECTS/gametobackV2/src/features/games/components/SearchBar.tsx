import React, { useState, useCallback, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@shared/components/ui/Input';
import { useDebounce } from '@shared/hooks/useDebounce';
export interface SearchBarProps {
value: string;
onChange: (value: string) => void;
placeholder?: string;
className?: string;
debounceDelay?: number;
}
export function SearchBar({
value,
onChange,
placeholder = 'Rechercher un jeu...',
className = '',
debounceDelay = 300,
}: SearchBarProps) {
const [localValue, setLocalValue] = useState(value);
const debouncedValue = useDebounce(localValue, debounceDelay);
useEffect(() => {
onChange(debouncedValue);
}, [debouncedValue, onChange]);
useEffect(() => {
setLocalValue(value);
}, [value]);
const handleClear = useCallback(() => {
setLocalValue('');
onChange('');
}, [onChange]);
return (
    <div className={`relative ${className}`}>
      <Input
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        placeholder={placeholder}
        icon={<Search className="w-4 h-4" />}
        className="pr-10 bg-white/5 border-white/10 rounded-xl py-3"
      />
      {localValue && (
        <button
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-slate-300 transition-colors"
          aria-label="Effacer"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}