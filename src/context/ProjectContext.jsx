import { createContext, useContext, useState, useEffect } from 'react';
import { generateId, saveToLocalStorage, getFromLocalStorage } from '@/lib/utils';

const ProjectContext = createContext();

export function ProjectProvider({ children }) {
  const [projects, setProjects] = useState([]);
  const [currentProject, setCurrentProject] = useState(null);

  // Load projects from localStorage on mount
  useEffect(() => {
    const savedProjects = getFromLocalStorage('projects', []);
    setProjects(savedProjects);

    const savedCurrentId = getFromLocalStorage('currentProjectId');
    if (savedCurrentId) {
      const project = savedProjects.find(p => p.id === savedCurrentId);
      if (project) setCurrentProject(project);
    }
  }, []);

  // Save projects to localStorage whenever they change
  useEffect(() => {
    if (projects.length > 0) {
      saveToLocalStorage('projects', projects);
    }
  }, [projects]);

  // Save current project ID to localStorage
  useEffect(() => {
    if (currentProject) {
      saveToLocalStorage('currentProjectId', currentProject.id);
    }
  }, [currentProject]);

  const createProject = (name, theme) => {
    const newProject = {
      id: generateId(),
      name,
      theme,
      createdAt: Date.now(),
      assets: [],
      chatHistory: [],
    };

    setProjects(prev => [...prev, newProject]);
    setCurrentProject(newProject);
    return newProject;
  };

  const updateProject = (projectId, updates) => {
    setProjects(prev =>
      prev.map(project =>
        project.id === projectId ? { ...project, ...updates } : project
      )
    );

    if (currentProject?.id === projectId) {
      setCurrentProject(prev => ({ ...prev, ...updates }));
    }
  };

  const deleteProject = (projectId) => {
    setProjects(prev => prev.filter(p => p.id !== projectId));

    if (currentProject?.id === projectId) {
      setCurrentProject(null);
    }
  };

  const selectProject = (projectId) => {
    const project = projects.find(p => p.id === projectId);
    if (project) {
      setCurrentProject(project);
    }
  };

  const addAsset = (asset) => {
    if (!currentProject) return;

    const newAsset = {
      id: generateId(),
      ...asset,
      createdAt: Date.now(),
    };

    const updatedAssets = [...(currentProject.assets || []), newAsset];
    updateProject(currentProject.id, { assets: updatedAssets });

    return newAsset;
  };

  const deleteAsset = (assetId) => {
    if (!currentProject) return;

    const updatedAssets = currentProject.assets.filter(a => a.id !== assetId);
    updateProject(currentProject.id, { assets: updatedAssets });
  };

  const addChatMessage = (message) => {
    if (!currentProject) return;

    const newMessage = {
      id: generateId(),
      ...message,
      timestamp: Date.now(),
    };

    const updatedHistory = [...(currentProject.chatHistory || []), newMessage];
    updateProject(currentProject.id, { chatHistory: updatedHistory });

    return newMessage;
  };

  const value = {
    projects,
    currentProject,
    createProject,
    updateProject,
    deleteProject,
    selectProject,
    addAsset,
    deleteAsset,
    addChatMessage,
  };

  return (
    <ProjectContext.Provider value={value}>
      {children}
    </ProjectContext.Provider>
  );
}

export function useProject() {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProject must be used within ProjectProvider');
  }
  return context;
}
