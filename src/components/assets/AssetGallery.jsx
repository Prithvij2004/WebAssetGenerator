import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useProject } from '@/context/ProjectContext';
import { Download, Edit, Trash2, Volume2, Image } from 'lucide-react';
import { AssetEditor } from '../editor/AssetEditor';
import { downloadFile } from '@/lib/utils';

export function AssetGallery() {
  const { currentProject, deleteAsset } = useProject();
  const [editingAsset, setEditingAsset] = useState(null);
  const [editorOpen, setEditorOpen] = useState(false);

  const handleEdit = (asset) => {
    setEditingAsset(asset);
    setEditorOpen(true);
  };

  const handleSaveEdit = (editedAsset) => {
    // In a full implementation, update the asset in the project
    console.log('Saved edited asset:', editedAsset);
  };

  const handleDownload = (asset) => {
    const timestamp = new Date().getTime();

    if (asset.type === 'sound') {
      const blob = asset.audioBlob;
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `sound-effect-${timestamp}.mp3`;
      link.click();
      URL.revokeObjectURL(url);
    } else {
      const content = `${asset.type.toUpperCase()} DESCRIPTION\n\n${asset.description}\n\nPROMPT\n${asset.prompt || 'N/A'}`;
      downloadFile(content, `${asset.type}-${timestamp}.txt`, 'text/plain');
    }
  };

  const playAudio = (asset) => {
    if (asset.audioUrl) {
      const audio = new Audio(asset.audioUrl);
      audio.play();
    }
  };

  if (!currentProject) {
    return (
      <div className="text-center py-12">
        <p className="font-mono text-gray-600">Select a project to view assets</p>
      </div>
    );
  }

  const assets = currentProject.assets || [];

  if (assets.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="font-mono text-gray-600">No assets yet. Use the chat to generate some!</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {assets.map((asset) => (
          <Card key={asset.id}>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                {asset.type === 'sound' ? (
                  <Volume2 className="h-4 w-4" />
                ) : (
                  <Image className="h-4 w-4" />
                )}
                {asset.type.toUpperCase()}
              </CardTitle>
            </CardHeader>

            <CardContent>
              <p className="font-mono text-xs text-gray-600 mb-4 line-clamp-3">
                {asset.description}
              </p>

              <div className="flex gap-2 flex-wrap">
                {asset.type === 'sound' ? (
                  <Button size="sm" variant="outline" onClick={() => playAudio(asset)}>
                    <Volume2 className="h-3 w-3 mr-1" />
                    Play
                  </Button>
                ) : (
                  <Button size="sm" variant="outline" onClick={() => handleEdit(asset)}>
                    <Edit className="h-3 w-3 mr-1" />
                    Edit
                  </Button>
                )}

                <Button size="sm" variant="outline" onClick={() => handleDownload(asset)}>
                  <Download className="h-3 w-3 mr-1" />
                  Save
                </Button>

                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => {
                    if (confirm('Delete this asset?')) {
                      deleteAsset(asset.id);
                    }
                  }}
                >
                  <Trash2 className="h-3 w-3 mr-1" />
                  Delete
                </Button>
              </div>

              <p className="font-mono text-xs text-gray-500 mt-4">
                {new Date(asset.createdAt).toLocaleString()}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <AssetEditor
        asset={editingAsset}
        open={editorOpen}
        onOpenChange={setEditorOpen}
        onSave={handleSaveEdit}
      />
    </>
  );
}
