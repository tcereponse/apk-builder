import React, { useCallback } from 'react';
import { ChevronDown, X } from 'lucide-react';
export interface FilterOption {
value: string;
label: string;
}
export interface FilterDropdownProps {
label: string;
value: string;
options: FilterOption[];
onChange: (value: string) => void;
placeholder?: string;
className?: string;
}
export function FilterDropdown({
label,
value,
options,
onChange,
placeholder = 'Tous',
className = '',
}: FilterDropdownProps) {
const [isOpen, setIsOpen] = React.useState(false);
const handleSelect = useCallback(
(optionValue: string) => {
onChange(optionValue);
setIsOpen(false);
},
[onChange]
);
const handleClear = useCallback(
(e: React.MouseEvent) => {
e.stopPropagation();
onChange('');
},
[onChange]
);
const selectedLabel = options.find((o) => o.value === value)?.label || placeholder;
return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium
          glass hover:bg-white/10 transition-all duration-200
          ${value ? 'text-sky-400 border-sky-400/20' : 'text-slate-300'}
        `}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span>{label}</span>
        <span className="text-zinc-500">|</span>
        <span className="max-w-[80px] truncate">{selectedLabel}</span>
        {value ? (
          <button
            onClick={handleClear}
            className="ml-0.5 text-zinc-500 hover:text-slate-200 transition-colors"
            aria-label="Effacer le filtre"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        ) : (
          <ChevronDown
            className={`w-3.5 h-3.5 transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        )}
      </button>{isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}{isOpen && (
        <div
          className="absolute left-0 top-full mt-1 z-50 min-w-[160px] py-1.5 rounded-xl
            glass-dark border border-white/10 shadow-glass-xl
            max-h-[240px] overflow-y-auto"
          role="listbox"
        >
          <button
            onClick={() => handleSelect('')}
            className={`
              w-full text-left px-4 py-2 text-sm transition-colors
              ${!value ? 'text-sky-400 bg-white/5' : 'text-slate-300 hover:bg-white/5'}
            `}
            role="option"
            aria-selected={!value}
          >
            {placeholder}
          </button>
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className={`
                w-full text-left px-4 py-2 text-sm transition-colors
                ${value === option.value ? 'text-sky-400 bg-white/5' : 'text-slate-300 hover:bg-white/5'}
              `}
              role="option"
              aria-selected={value === option.value}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}