import React, { ButtonHTMLAttributes } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Helper to merge tailwind classes safely
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', isLoading, children, ...props }, ref) => {
    
    // Base Styles (The "Senior" logic: Separate layout from theme)
    const baseStyles = "group relative inline-flex items-center justify-center rounded font-medium transition-all duration-300 active:scale-[0.98] disabled:opacity-70 disabled:pointer-events-none";
    
    const variants = {
      primary: "bg-slate-900 hover:bg-blue-600 text-white px-8 py-2.5 shadow-xl shadow-blue-900/10",
      outline: "border-2 border-slate-900 hover:bg-slate-900 hover:text-white px-8 py-[10px]", // Adjusted for border width
      ghost: "hover:bg-slate-100 text-slate-900 px-8 py-3",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], className)}
        disabled={isLoading}
        {...props}
      >
        {isLoading ? (
          <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
        ) : null}
        <span className="relative z-10">{children}</span>
      </button>
    );
  }
);

Button.displayName = "Button";