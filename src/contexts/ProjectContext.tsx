
import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the project interface
export interface Project {
  id: string;
  name: string;
  description: string;
  dueDate?: Date;
  priority?: string;
  team?: string;
  createdAt: Date;
}

interface ProjectContextType {
  projects: Project[];
  addProject: (project: Omit<Project, "id" | "createdAt">) => void;
  getProject: (id: string) => Project | undefined;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider = ({ children }: { children: ReactNode }) => {
  const [projects, setProjects] = useState<Project[]>([]);

  const addProject = (projectData: Omit<Project, "id" | "createdAt">) => {
    const newProject: Project = {
      ...projectData,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    };
    
    setProjects((prevProjects) => [...prevProjects, newProject]);
    return newProject;
  };

  const getProject = (id: string) => {
    return projects.find(project => project.id === id);
  };

  return (
    <ProjectContext.Provider value={{ projects, addProject, getProject }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () => {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error("useProjects must be used within a ProjectProvider");
  }
  return context;
};
