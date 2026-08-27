import React from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: Array<{ value: string; label: string }>;
  placeholder?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, options, placeholder, id, ...props }, ref) => {
    const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={selectId} className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
            {label} {props.required && <span className="text-rose-500">*</span>}
          </label>
        )}
        <div className="relative">
          <select
            id={selectId}
            ref={ref}
            className={cn(
              'block w-full appearance-none rounded-xl border text-xs sm:text-sm font-semibold text-slate-900 bg-slate-50/80 hover:bg-white focus:bg-white pl-3.5 pr-10 py-2.5 transition duration-150 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-0 disabled:bg-slate-100 disabled:cursor-not-allowed cursor-pointer',
              error
                ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-200'
                : 'border-slate-200 hover:border-blue-400 focus:border-blue-600 focus:ring-blue-500/20',
              className
            )}
            {...props}
          >
            {placeholder && <option value="" className="text-slate-400">{placeholder}</option>}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value} className="py-2 text-slate-900 font-semibold bg-white">
                {opt.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>
        {error && <p className="mt-1 text-xs text-rose-600 font-bold">{error}</p>}
      </div>
    );
  }
);
Select.displayName = 'Select';

