import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useProject } from '@/context/ProjectContext';

export function CreateProject({ open, onOpenChange }) {
  const [name, setName] = useState('');
  const [theme, setTheme] = useState('');
  const { createProject } = useProject();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim() || !theme.trim()) {
      alert('Please fill in all fields');
      return;
    }

    createProject(name.trim(), theme.trim());
    setName('');
    setTheme('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent onClose={() => onOpenChange(false)}>
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <label className="font-mono text-sm font-bold uppercase mb-2 block">
              Project Name
            </label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="My Awesome App"
              required
            />
          </div>

          <div>
            <label className="font-mono text-sm font-bold uppercase mb-2 block">
              Theme Description
            </label>
            <Textarea
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              placeholder="Describe the theme for your project assets..."
              rows={4}
              required
            />
          </div>

          <div className="flex gap-2 justify-end pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Create</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
