
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useProjects } from "@/contexts/ProjectContext";
import { Button } from "@/components/ui/button";
import { useEffect, useRef } from "react";

const Index = () => {
  const { projects } = useProjects();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Ensure video plays automatically and silently
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.error("Auto-play was prevented:", error);
      });
    }
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background video */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <video 
          ref={videoRef}
          autoPlay 
          loop 
          muted 
          playsInline
          className="absolute min-w-full min-h-full object-cover opacity-20 dark:opacity-10"
        >
          <source src="https://player.vimeo.com/external/380214854.sd.mp4?s=c7e6b3b8c05b42009e3c65787e85b8a099b900b3&profile_id=164&oauth2_token_id=57447761" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/70 to-background z-10"></div>
      
      {/* Content */}
      <div className="relative z-20 pt-24 pb-16 px-4">
        <div className="page-container">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12 mb-16">
            <motion.div 
              className="text-center md:text-left md:flex-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                Welcome to TaskNest
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto md:mx-0 mb-8">
                The smart way to manage projects and collaborate with your team
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 mb-8 md:mb-0">
                <Button asChild size="lg" className="button-hover">
                  <Link to="/create-project">
                    Create New Project
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="button-hover">
                  <Link to="/projects">
                    View Projects {projects.length > 0 && `(${projects.length})`}
                  </Link>
                </Button>
              </div>
            </motion.div>
            
            <motion.div
              className="flex-1"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2400&q=80" 
                alt="Person working on coding tasks" 
                className="w-full max-w-lg mx-auto md:ml-auto rounded-lg shadow-lg border border-border dark:border-gray-700 relative z-10"
              />
            </motion.div>
          </div>
          
          <motion.div 
            className="mt-8 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/80 dark:bg-gray-800/90 backdrop-blur-md rounded-lg shadow-md p-6 border border-border dark:border-gray-700 card-container hover-container transition-all duration-300">
                <div className="icon-bg rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Track Progress</h3>
                <p className="text-muted-foreground">Monitor your projects and tasks with a simple, intuitive interface.</p>
              </div>
              
              <div className="bg-white/80 dark:bg-gray-800/90 backdrop-blur-md rounded-lg shadow-md p-6 border border-border dark:border-gray-700 card-container hover-container transition-all duration-300">
                <div className="icon-bg rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Team Collaboration</h3>
                <p className="text-muted-foreground">Work together seamlessly with your team members on shared projects.</p>
              </div>
              
              <div className="bg-white/80 dark:bg-gray-800/90 backdrop-blur-md rounded-lg shadow-md p-6 border border-border dark:border-gray-700 card-container hover-container transition-all duration-300">
                <div className="icon-bg rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 20h9" />
                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Easy Management</h3>
                <p className="text-muted-foreground">Create, assign, and manage tasks with just a few clicks.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Index;
