
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus, Menu, X, LogOut, LogIn, User } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import Logo from "./Logo";
import { useAuth } from "@/contexts/AuthContext";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    await signOut();
    navigate("/login");
    setIsMenuOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="page-container">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Logo />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {user && (
              <>
                <Link 
                  to="/"
                  className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
                >
                  Dashboard
                </Link>
                <Link 
                  to="/projects"
                  className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
                >
                  Projects
                </Link>
                <Link 
                  to="/tasks"
                  className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
                >
                  Tasks
                </Link>
                <Link 
                  to="/reports"
                  className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
                >
                  Reports
                </Link>
              </>
            )}
          </nav>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
            
            {user ? (
              <>
                <Button asChild variant="ghost" className="hidden md:flex">
                  <Link to="/create-project" className="button-hover">
                    <Plus className="mr-1 h-4 w-4" />
                    New Project
                  </Link>
                </Button>
                <Button variant="outline" size="icon" className="hidden md:flex" onClick={handleLogout}>
                  <LogOut className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <Button asChild variant="default" className="hidden md:flex button-hover">
                <Link to="/login">
                  <LogIn className="mr-1 h-4 w-4" />
                  Sign In
                </Link>
              </Button>
            )}
            
            {/* Mobile Menu Button */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden"
              onClick={toggleMenu}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg animate-slide-in">
          <div className="pt-2 pb-4 px-4 space-y-1">
            {user ? (
              <>
                <Link 
                  to="/"
                  className="block py-2 px-3 text-base font-medium rounded-md hover:bg-secondary"
                  onClick={toggleMenu}
                >
                  Dashboard
                </Link>
                <Link 
                  to="/projects"
                  className="block py-2 px-3 text-base font-medium rounded-md hover:bg-secondary"
                  onClick={toggleMenu}
                >
                  Projects
                </Link>
                <Link 
                  to="/tasks"
                  className="block py-2 px-3 text-base font-medium rounded-md hover:bg-secondary"
                  onClick={toggleMenu}
                >
                  Tasks
                </Link>
                <Link 
                  to="/reports"
                  className="block py-2 px-3 text-base font-medium rounded-md hover:bg-secondary"
                  onClick={toggleMenu}
                >
                  Reports
                </Link>
                <hr className="my-2 border-border" />
                <div className="flex items-center py-2 px-3">
                  <ThemeToggle />
                  <span className="ml-3">Toggle Theme</span>
                </div>
                <Link 
                  to="/create-project"
                  className="block py-2 px-3 text-base font-medium rounded-md bg-primary/10 text-primary"
                  onClick={toggleMenu}
                >
                  <Plus className="inline-block mr-1 h-4 w-4" />
                  New Project
                </Link>
                <button 
                  className="block w-full py-2 px-3 text-base font-medium rounded-md bg-destructive/10 text-destructive mt-2"
                  onClick={handleLogout}
                >
                  <LogOut className="inline-block mr-1 h-4 w-4" />
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <div className="flex items-center py-2 px-3">
                  <ThemeToggle />
                  <span className="ml-3">Toggle Theme</span>
                </div>
                <Link 
                  to="/login"
                  className="block py-2 px-3 text-base font-medium rounded-md bg-primary text-white mt-2"
                  onClick={toggleMenu}
                >
                  <LogIn className="inline-block mr-1 h-4 w-4" />
                  Sign In
                </Link>
                <Link 
                  to="/register"
                  className="block py-2 px-3 text-base font-medium rounded-md bg-secondary text-foreground mt-2"
                  onClick={toggleMenu}
                >
                  <User className="inline-block mr-1 h-4 w-4" />
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
