import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { editLogo, adjustColor, resizeImage, rotateImage } from '@/lib/api/nanoBanana';
import { Loader2 } from 'lucide-react';

export function AssetEditor({ asset, open, onOpenChange, onSave }) {
  const [isLoading, setIsLoading] = useState(false);
  const [edits, setEdits] = useState({
    color: '#000000',
    rotation: 0,
    width: 512,
    height: 512,
  });

  if (!asset || asset.type === 'sound') {
    return null;
  }

  const handleApplyEdit = async () => {
    setIsLoading(true);

    try {
      // Mock edit for now (Nano Banana API integration)
      const result = await editLogo(asset.description, edits);

      // In a real implementation, this would return the edited image
      const editedAsset = {
        ...asset,
        description: `${asset.description}\n\nEdits applied: ${JSON.stringify(edits)}`,
        edits: edits,
      };

      onSave?.(editedAsset);
      onOpenChange(false);
    } catch (error) {
      console.error('Error editing asset:', error);
      alert('Error applying edits. Check console for details.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent onClose={() => onOpenChange(false)} className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit {asset.type}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Preview Area */}
          <div className="border-brutal border-brutal-border p-8 bg-gray-100 min-h-[300px] flex items-center justify-center">
            <div className="text-center">
              <p className="font-mono text-sm text-gray-600 mb-2">Preview</p>
              <p className="font-mono text-xs text-gray-500">
                {asset.type.toUpperCase()} CONCEPT
              </p>
            </div>
          </div>

          {/* Edit Controls */}
          <div className="space-y-4">
            <div>
              <label className="font-mono text-sm font-bold uppercase mb-2 block">
                Color
              </label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={edits.color}
                  onChange={(e) => setEdits({ ...edits, color: e.target.value })}
                  className="w-20 h-12 p-1 cursor-pointer"
                />
                <Input
                  type="text"
                  value={edits.color}
                  onChange={(e) => setEdits({ ...edits, color: e.target.value })}
                  className="flex-1"
                />
              </div>
            </div>

            <div>
              <label className="font-mono text-sm font-bold uppercase mb-2 block">
                Rotation: {edits.rotation}°
              </label>
              <Input
                type="range"
                min="0"
                max="360"
                value={edits.rotation}
                onChange={(e) => setEdits({ ...edits, rotation: parseInt(e.target.value) })}
                className="w-full"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-mono text-sm font-bold uppercase mb-2 block">
                  Width (px)
                </label>
                <Input
                  type="number"
                  value={edits.width}
                  onChange={(e) => setEdits({ ...edits, width: parseInt(e.target.value) })}
                  min="64"
                  max="2048"
                />
              </div>

              <div>
                <label className="font-mono text-sm font-bold uppercase mb-2 block">
                  Height (px)
                </label>
                <Input
                  type="number"
                  value={edits.height}
                  onChange={(e) => setEdits({ ...edits, height: parseInt(e.target.value) })}
                  min="64"
                  max="2048"
                />
              </div>
            </div>
          </div>

          {/* Note about Nano Banana */}
          <div className="border-brutal border-brutal-border bg-yellow-50 p-4">
            <p className="font-mono text-xs text-gray-700">
              <strong>Note:</strong> Logo editing uses Nano Banana API. Configure VITE_NANO_BANANA_API_KEY
              in .env for full functionality. Currently showing mock edit interface.
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-2 justify-end pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleApplyEdit} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Applying...
                </>
              ) : (
                'Apply Edits'
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
