import * as React from 'react';
import { cn } from '@/lib/utils';

const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        'flex min-h-[80px] w-full border-brutal border-brutal-border bg-brutal-bg px-4 py-3',
        'font-mono text-brutal-fg placeholder:text-gray-400',
        'outline-none focus:border-brutal-accent',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'resize-none',
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

Textarea.displayName = 'Textarea';

export { Textarea };
