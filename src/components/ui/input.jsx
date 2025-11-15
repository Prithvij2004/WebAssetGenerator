import * as React from 'react';
import { cn } from '@/lib/utils';

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        'flex w-full border-brutal border-brutal-border bg-brutal-bg px-4 py-3',
        'font-mono text-brutal-fg placeholder:text-gray-400',
        'outline-none focus:border-brutal-accent',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

Input.displayName = 'Input';

export { Input };
