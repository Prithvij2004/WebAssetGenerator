import * as React from 'react';
import { cn } from '@/lib/utils';

const Button = React.forwardRef(({ className, variant = 'default', size = 'default', ...props }, ref) => {
  const variants = {
    default: 'bg-brutal-fg text-brutal-bg hover:bg-brutal-accent hover:text-brutal-fg',
    outline: 'bg-brutal-bg text-brutal-fg hover:bg-brutal-fg hover:text-brutal-bg',
    ghost: 'hover:bg-brutal-fg hover:text-brutal-bg',
    destructive: 'bg-red-600 text-white hover:bg-red-700',
  };

  const sizes = {
    default: 'px-6 py-3',
    sm: 'px-4 py-2 text-sm',
    lg: 'px-8 py-4 text-lg',
    icon: 'h-10 w-10',
  };

  return (
    <button
      className={cn(
        'inline-flex items-center justify-center font-bold uppercase tracking-wide',
        'border-brutal border-brutal-border transition-colors',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        variants[variant],
        sizes[size],
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

Button.displayName = 'Button';

export { Button };
