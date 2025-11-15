import { useProject } from '@/context/ProjectContext';
import { AssetGallery } from '@/components/assets/AssetGallery';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MessageSquare } from 'lucide-react';

export function AssetsPage() {
  const { currentProject } = useProject();
  const navigate = useNavigate();

  if (!currentProject) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Card className="max-w-md text-center p-8">
          <h2 className="font-display text-xl font-bold uppercase mb-4">
            No Project Selected
          </h2>
          <p className="font-mono text-sm text-gray-600 mb-6">
            Please select or create a project to view assets
          </p>
          <Button onClick={() => navigate('/')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go to Projects
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-display text-3xl font-bold uppercase mb-2">
            {currentProject.name} Assets
          </h2>
          <p className="font-mono text-sm text-gray-600">
            Theme: {currentProject.theme}
          </p>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => navigate('/')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Projects
          </Button>
          <Button size="sm" onClick={() => navigate('/workspace')}>
            <MessageSquare className="h-4 w-4 mr-2" />
            Workspace
          </Button>
        </div>
      </div>

      <AssetGallery />
    </div>
  );
}
