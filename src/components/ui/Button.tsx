import React, { forwardRef } from 'react';
import { clsx } from 'clsx';
import { Loader2, Check } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline' | 'accent';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  loading?: boolean;
  success?: boolean;
  icon?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      variant = 'primary',
      size = 'md',
      loading = false,
      success = false,
      disabled = false,
      icon,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium transition-all duration-120 rounded-[8px] cursor-pointer select-none border disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none active:scale-[0.985]';

    const variants = {
      primary:
        'bg-[#2F4A3F] text-[#FBF9F4] border-[#263D34] hover:bg-[#263D34] active:bg-[#1E3129] shadow-[0_1px_2px_rgba(42,33,27,0.08)]',
      secondary:
        'bg-[#FBF9F4] text-[#2A211B] border-[#CFC5B2] hover:bg-[#EFE9DD] hover:border-[#2A211B] active:bg-[#E3EBE5]',
      outline:
        'bg-transparent text-[#2A211B] border-[#CFC5B2] hover:bg-[#EFE9DD] active:bg-[#E3EBE5]',
      ghost:
        'bg-transparent text-[#5E5249] border-transparent hover:bg-[#EFE9DD] hover:text-[#2A211B]',
      danger:
        'bg-[#A63D2F] text-white border-[#872D21] hover:bg-[#872D21] active:bg-[#682016]',
      accent:
        'bg-[#B08D57] text-[#2A211B] border-[#9B7A47] hover:bg-[#9B7A47] hover:text-white',
    };

    const sizes = {
      sm: 'text-[13px] px-2.5 py-1.5 gap-1.5 min-h-[32px]',
      md: 'text-[14px] px-3.5 py-2 gap-2 min-h-[38px]',
      lg: 'text-[15px] px-5 py-2.5 gap-2.5 min-h-[44px]',
      icon: 'p-2 min-h-[36px] min-w-[36px] aspect-square',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={clsx(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {loading ? (
          <Loader2 className="w-4 h-4 animate-spin text-current" />
        ) : success ? (
          <Check className="w-4 h-4 text-emerald-600 animate-in fade-in zoom-in duration-200" />
        ) : (
          <>
            {icon && <span className="shrink-0">{icon}</span>}
            {children}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
