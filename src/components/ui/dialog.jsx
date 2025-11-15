import * as React from 'react';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

const Dialog = ({ open, onOpenChange, children }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black/50"
        onClick={() => onOpenChange(false)}
      />
      <div className="relative z-50">{children}</div>
    </div>
  );
};

const DialogContent = React.forwardRef(({ className, children, onClose, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'border-brutal border-brutal-border bg-brutal-bg p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto',
      className
    )}
    {...props}
  >
    {onClose && (
      <button
        onClick={onClose}
        className="absolute right-4 top-4 border-brutal border-brutal-border p-2 hover:bg-brutal-fg hover:text-brutal-bg"
      >
        <X className="h-4 w-4" />
      </button>
    )}
    {children}
  </div>
));
DialogContent.displayName = 'DialogContent';

const DialogHeader = ({ className, ...props }) => (
  <div className={cn('flex flex-col space-y-2 pb-4', className)} {...props} />
);
DialogHeader.displayName = 'DialogHeader';

const DialogTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn('font-display text-xl font-bold uppercase tracking-wide', className)}
    {...props}
  />
));
DialogTitle.displayName = 'DialogTitle';

const DialogDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p ref={ref} className={cn('font-mono text-sm text-gray-600', className)} {...props} />
));
DialogDescription.displayName = 'DialogDescription';

export { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription };
