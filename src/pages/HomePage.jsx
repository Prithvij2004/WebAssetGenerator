import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ProjectList } from '@/components/project/ProjectList';
import { CreateProject } from '@/components/project/CreateProject';
import { useProject } from '@/context/ProjectContext';
import { Plus, Zap, Palette, Music } from 'lucide-react';

export function HomePage() {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const { currentProject } = useProject();
  const navigate = useNavigate();

  const handleCreateAndNavigate = () => {
    setCreateDialogOpen(true);
  };

  const features = [
    {
      icon: Palette,
      title: 'Logos & Icons',
      description: 'Generate custom logos and icons with AI, tailored to your project theme',
    },
    {
      icon: Music,
      title: 'Sound Effects',
      description: 'Create unique audio assets and UI sounds that match your design',
    },
    {
      icon: Zap,
      title: 'AI Chat',
      description: 'Conversational interface to refine and iterate on your asset designs',
    },
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center py-12 border-b-brutal border-brutal-border">
        <h2 className="font-display text-5xl font-bold uppercase mb-4">
          Generate Assets
        </h2>
        <p className="font-mono text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          AI-powered tool for web developers to create logos, icons, and sound effects
          with brutal minimalistic design
        </p>
        <Button size="lg" onClick={handleCreateAndNavigate} className="gap-2">
          <Plus className="h-5 w-5" />
          Create New Project
        </Button>
      </section>

      {/* Features */}
      <section>
        <h3 className="font-display text-2xl font-bold uppercase mb-6">Features</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index}>
                <CardHeader>
                  <div className="mb-2">
                    <Icon className="h-8 w-8" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-mono text-sm text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Projects */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-display text-2xl font-bold uppercase">Your Projects</h3>
          <Button onClick={handleCreateAndNavigate} size="sm" className="gap-2">
            <Plus className="h-4 w-4" />
            New Project
          </Button>
        </div>
        <ProjectList />
      </section>

      {/* Quick Actions */}
      {currentProject && (
        <section className="border-t-brutal border-brutal-border pt-8">
          <Card className="bg-brutal-fg text-brutal-bg">
            <CardContent className="py-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-display text-lg font-bold uppercase mb-2">
                    Current Project: {currentProject.name}
                  </h4>
                  <p className="font-mono text-sm opacity-80">
                    Theme: {currentProject.theme}
                  </p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => navigate('/workspace')}
                  className="text-brutal-bg border-brutal-bg hover:bg-brutal-bg hover:text-brutal-fg"
                >
                  Open Workspace
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      )}

      <CreateProject open={createDialogOpen} onOpenChange={setCreateDialogOpen} />
    </div>
  );
}
