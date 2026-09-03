import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Check } from 'lucide-react';

export interface DropdownOption {
  value: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  description?: string;
}

interface CustomDropdownProps {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  options: DropdownOption[];
  placeholder?: string;
  className?: string;
  buttonClassName?: string;
  menuClassName?: string;
  disabled?: boolean;
}

export const CustomDropdown: React.FC<CustomDropdownProps> = ({
  id,
  value,
  onChange,
  options,
  placeholder = 'Seleccionar opción...',
  className = '',
  buttonClassName = '',
  menuClassName = '',
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      {/* Trigger Button */}
      <button
        type="button"
        id={id}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={`w-full min-h-[46px] flex items-center justify-between px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl bg-white border text-left transition-all duration-200 cursor-pointer ${
          isOpen
            ? 'border-[#97F2CC] ring-2 ring-[#97F2CC]/30 shadow-sm'
            : 'border-black/[0.08] hover:border-black/20'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${buttonClassName}`}
      >
        <div className="flex items-center space-x-2.5 min-w-0 flex-1 mr-2">
          {selectedOption?.icon && (
            <span className="w-5 h-5 rounded-lg bg-[#F5F7F8] border border-black/5 flex items-center justify-center shrink-0 text-[#121212]">
              <selectedOption.icon className="w-3.5 h-3.5 text-[#121212]" />
            </span>
          )}
          <span
            className={`text-xs sm:text-sm truncate font-medium ${
              selectedOption ? 'text-[#121212]' : 'text-zinc-400'
            }`}
          >
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </div>

        <ChevronDown
          className={`w-4 h-4 shrink-0 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-[#121212]' : 'text-zinc-400'
          }`}
        />
      </button>

      {/* Dropdown Menu Popover (Responsive, Never truncates on Mobile or Desktop) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            role="listbox"
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className={`absolute z-50 left-0 sm:left-auto sm:right-0 w-full min-w-full sm:min-w-[280px] max-w-[calc(100vw-32px)] mt-1.5 max-h-72 overflow-y-auto bg-white/98 backdrop-blur-md border border-black/[0.08] rounded-2xl p-1.5 shadow-[0_16px_40px_rgba(0,0,0,0.14)] scrollbar-thin scrollbar-thumb-zinc-200 ${menuClassName}`}
          >
            <div className="space-y-1">
              {options.map((option) => {
                const isSelected = option.value === value;
                const IconComponent = option.icon;

                return (
                  <button
                    key={option.value}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => handleSelect(option.value)}
                    className={`w-full min-h-[44px] flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-xs sm:text-sm transition-all duration-150 cursor-pointer ${
                      isSelected
                        ? 'bg-[#97F2CC]/25 border border-[#97F2CC]/60 text-[#121212] font-semibold shadow-xs'
                        : 'text-zinc-700 hover:bg-[#97F2CC]/15 hover:text-[#121212] border border-transparent'
                    }`}
                  >
                    <div className="flex items-center space-x-2.5 min-w-0 flex-1 mr-2">
                      {IconComponent && (
                        <span
                          className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                            isSelected
                              ? 'bg-[#97F2CC] text-[#121212]'
                              : 'bg-zinc-100 text-zinc-600'
                          }`}
                        >
                          <IconComponent className="w-3.5 h-3.5" />
                        </span>
                      )}
                      <div className="min-w-0 flex-1">
                        <div className="text-xs sm:text-sm leading-snug font-medium text-left break-words">
                          {option.label}
                        </div>
                        {option.description && (
                          <div className="text-[10px] font-mono text-zinc-400 font-normal mt-0.5">
                            {option.description}
                          </div>
                        )}
                      </div>
                    </div>

                    {isSelected && (
                      <span className="w-5 h-5 rounded-full bg-[#121212] flex items-center justify-center shrink-0 ml-1.5">
                        <Check className="w-3 h-3 text-[#97F2CC]" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
