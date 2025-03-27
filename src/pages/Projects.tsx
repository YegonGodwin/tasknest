
import { motion } from "framer-motion";
import { useProjects } from "@/contexts/ProjectContext";
import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, Clock, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const priorityColors = {
  low: "bg-blue-100 text-blue-800",
  medium: "bg-yellow-100 text-yellow-800",
  high: "bg-orange-100 text-orange-800",
  urgent: "bg-red-100 text-red-800",
};

const Projects = () => {
  const { projects } = useProjects();

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 bg-gradient-to-b from-background to-secondary/30">
      <div className="page-container">
        <motion.div 
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold tracking-tight mb-3">
            Your Projects
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Manage and track your team's projects in one place
          </p>
        </motion.div>

        {projects.length === 0 ? (
          <motion.div 
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-xl font-medium text-muted-foreground mb-4">No projects yet</h2>
            <Button asChild className="button-hover">
              <Link to="/create-project">Create Your First Project</Link>
            </Button>
          </motion.div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {projects.map((project) => (
              <Card key={project.id} className="card-gradient border-0 shadow-md overflow-hidden card-hover">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl">{project.name}</CardTitle>
                  <CardDescription>
                    {project.description ? project.description.substring(0, 100) + (project.description.length > 100 ? '...' : '') : 'No description'}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  {project.dueDate && (
                    <div className="flex items-center text-sm text-muted-foreground">
                      <CalendarIcon className="mr-2 h-4 w-4 text-primary/70" />
                      Due: {format(project.dueDate, "PPP")}
                    </div>
                  )}
                  {project.team && (
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Users className="mr-2 h-4 w-4 text-primary/70" />
                      Team: {project.team.replace(/^\w/, (c) => c.toUpperCase())} Team
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between bg-secondary/40 p-4">
                  {project.priority && (
                    <Badge variant="outline" className={`${priorityColors[project.priority as keyof typeof priorityColors] || ""}`}>
                      {project.priority.replace(/^\w/, (c) => c.toUpperCase())}
                    </Badge>
                  )}
                  <div className="text-xs text-muted-foreground flex items-center">
                    <Clock className="mr-1 h-3 w-3" />
                    Created {format(new Date(project.createdAt), "MM/dd/yyyy")}
                  </div>
                </CardFooter>
              </Card>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Projects;
