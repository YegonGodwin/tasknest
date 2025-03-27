
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import ProjectForm from "@/components/ProjectForm";
import { Button } from "@/components/ui/button";

const CreateProject = () => {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4 bg-gradient-to-b from-background to-secondary/30">
      <div className="page-container">
        <div className="mb-8">
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="mb-6 -ml-3 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Link to="/">
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
          
          <motion.div 
            className="text-center mb-14"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold tracking-tight mb-3">
              Create New Project
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Set up a new project to start tracking tasks and collaborating with your team
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <ProjectForm />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CreateProject;
