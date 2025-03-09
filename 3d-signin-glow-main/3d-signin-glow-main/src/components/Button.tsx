
import { cn } from '@/lib/utils';
import { ButtonHTMLAttributes, forwardRef } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    return (
      <button
        className={cn(
          "relative inline-flex items-center justify-center rounded-md text-sm font-medium transition-all",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          "disabled:opacity-50 disabled:pointer-events-none",
          "active:scale-[0.98] transform",
          
          // Base styles with 3D effect
          "hover:-translate-y-0.5 hover:shadow-lg",
          
          // Variants
          variant === 'default' && 
            "bg-primary text-primary-foreground shadow-md hover:bg-primary/90",
          variant === 'outline' && 
            "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
          variant === 'ghost' && 
            "hover:bg-accent hover:text-accent-foreground",
          
          // Sizes
          size === 'default' && "h-10 py-2 px-6",
          size === 'sm' && "h-9 px-4",
          size === 'lg' && "h-11 px-8",
          
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };
