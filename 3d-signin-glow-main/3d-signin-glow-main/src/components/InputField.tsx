
import { InputHTMLAttributes, forwardRef, useState } from 'react';
import { cn } from '@/lib/utils';

export interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ className, label, type, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(false);

    return (
      <div className="relative w-full mb-4 input-highlight">
        <input
          type={type}
          className={cn(
            "w-full bg-transparent border-none outline-none py-3 px-4 text-foreground transition-all duration-300",
            "focus:outline-none focus:ring-0",
            "placeholder:text-transparent",
            hasValue || isFocused ? "pt-6 pb-2" : "py-3",
            className
          )}
          ref={ref}
          onFocus={() => setIsFocused(true)}
          onBlur={(e) => {
            setIsFocused(false);
            setHasValue(e.target.value !== '');
          }}
          onChange={(e) => setHasValue(e.target.value !== '')}
          placeholder={label}
          {...props}
        />
        <label
          className={cn(
            "absolute left-4 transition-all duration-300 pointer-events-none text-muted-foreground",
            hasValue || isFocused 
              ? "top-1 text-xs" 
              : "top-1/2 -translate-y-1/2 text-base"
          )}
        >
          {label}
        </label>
      </div>
    );
  }
);

InputField.displayName = "InputField";

export { InputField };
