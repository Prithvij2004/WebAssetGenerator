import { useProject } from '@/context/ProjectContext';
import { ChatInterface } from '@/components/chat/ChatInterface';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export function WorkspacePage() {
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
            Please select or create a project to start working
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
    <div className="h-[calc(100vh-200px)]">
      <div className="mb-4">
        <Button variant="outline" size="sm" onClick={() => navigate('/')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Projects
        </Button>
      </div>

      <Card className="h-full">
        <ChatInterface />
      </Card>
    </div>
  );
}
