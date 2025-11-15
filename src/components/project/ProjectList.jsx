import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useProject } from '@/context/ProjectContext';
import { Trash2 } from 'lucide-react';

export function ProjectList() {
  const { projects, selectProject, deleteProject, currentProject } = useProject();

  if (projects.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="font-mono text-gray-600">No projects yet. Create one to get started.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {projects.map(project => (
        <Card
          key={project.id}
          className={`cursor-pointer transition-all ${
            currentProject?.id === project.id ? 'border-brutal-accent' : ''
          }`}
        >
          <CardHeader>
            <CardTitle className="text-lg flex justify-between items-start">
              <span onClick={() => selectProject(project.id)}>{project.name}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (confirm('Delete this project?')) {
                    deleteProject(project.id);
                  }
                }}
                className="border-brutal border-brutal-border p-1 hover:bg-red-600 hover:text-white"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </CardTitle>
          </CardHeader>
          <CardContent onClick={() => selectProject(project.id)}>
            <p className="font-mono text-sm text-gray-600 mb-2">
              Theme: {project.theme}
            </p>
            <p className="font-mono text-xs text-gray-500">
              Assets: {project.assets?.length || 0}
            </p>
            <p className="font-mono text-xs text-gray-500">
              Created: {new Date(project.createdAt).toLocaleDateString()}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
