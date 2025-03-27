
import { Briefcase } from "lucide-react";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-2 text-xl font-semibold tracking-tight transition-colors hover:text-primary">
      <Briefcase className="h-6 w-6" />
      <span>TaskNest</span>
    </Link>
  );
};

export default Logo;
