import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CalendarIcon, Users, Clock } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { useProjects } from "@/contexts/ProjectContext";
import { useNavigate } from "react-router-dom";

const ProjectForm = () => {
  const { toast } = useToast();
  const { addProject } = useProjects();
  const navigate = useNavigate();
  const [date, setDate] = useState<Date>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    priority: "",
    team: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name) {
      toast({
        title: "Error",
        description: "Project name is required",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Create the new project
    addProject({
      name: formData.name,
      description: formData.description,
      dueDate: date,
      priority: formData.priority || undefined,
      team: formData.team || undefined,
    });
    
    // Show success toast
    toast({
      title: "Success",
      description: "Project created successfully!",
    });
    
    // Reset form and redirect
    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({
        name: "",
        description: "",
        priority: "",
        team: "",
      });
      setDate(undefined);
      navigate("/projects");
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto">
      <div className="space-y-8 animate-fade-up">
        <Card className="card-gradient border-0 shadow-md overflow-hidden">
          <CardHeader className="pb-4 bg-white/50 backdrop-blur-sm">
            <CardTitle className="text-2xl">Project Details</CardTitle>
            <CardDescription>
              Provide the basic information about your new project
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 p-8">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">Project Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Enter project name"
                value={formData.name}
                onChange={handleChange}
                className="transition-all duration-200 focus:ring-2 focus:ring-primary/20 shadow-sm"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-medium">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Describe your project"
                value={formData.description}
                onChange={handleChange}
                className="min-h-[120px] transition-all duration-200 focus:ring-2 focus:ring-primary/20 shadow-sm"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Due Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal border-input transition-all duration-200 focus:ring-2 focus:ring-primary/20 shadow-sm"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : "Select a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="space-y-2">
                <Label className="text-sm font-medium">Priority</Label>
                <Select
                  onValueChange={(value) => handleSelectChange("priority", value)}
                  value={formData.priority}
                >
                  <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-primary/20 shadow-sm">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-gradient border-0 shadow-md overflow-hidden animate-fade-up animation-delay-100">
          <CardHeader className="pb-4 bg-white/50 backdrop-blur-sm">
            <CardTitle className="text-2xl">Team Settings</CardTitle>
            <CardDescription>
              Define who will be working on this project
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 p-8">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Assign Team</Label>
              <Select
                onValueChange={(value) => handleSelectChange("team", value)}
                value={formData.team}
              >
                <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-primary/20 shadow-sm">
                  <SelectValue placeholder="Select team" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="design">Design Team</SelectItem>
                  <SelectItem value="development">Development Team</SelectItem>
                  <SelectItem value="marketing">Marketing Team</SelectItem>
                  <SelectItem value="product">Product Team</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-secondary/40 p-6">
            <div className="flex items-center text-sm text-muted-foreground w-full sm:w-auto">
              <Clock className="mr-2 h-4 w-4 text-primary/70" />
              <span>Projects are automatically tracked once created</span>
            </div>
            <Button 
              type="submit" 
              className="w-full sm:w-auto button-hover transition-all duration-300 bg-primary hover:bg-primary/90"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating..." : "Create Project"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </form>
  );
};

export default ProjectForm;
