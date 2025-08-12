import { NavLink } from "react-router-dom";
import { Utensils, Camera, List, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const linkCls = ({ isActive }: { isActive: boolean }) =>
  cn(
    "px-3 py-2 rounded-md text-sm font-medium transition-colors",
    isActive ? "bg-accent text-accent-foreground" : "hover:bg-accent hover:text-accent-foreground"
  );

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto flex h-14 items-center justify-between">
        <div className="flex items-center gap-2">
          <Utensils className="h-5 w-5 text-primary" aria-hidden="true" />
          <NavLink to="/" className="text-sm font-semibold">
            Servana
          </NavLink>
        </div>
        <div className="hidden md:flex items-center gap-1">
          <NavLink to="/listings" className={linkCls} end>
            <div className="flex items-center gap-2">
              <List className="h-4 w-4" /> <span>Listings</span>
            </div>
          </NavLink>
          <NavLink to="/listings#capture" className={linkCls}>
            <div className="flex items-center gap-2">
              <Camera className="h-4 w-4" /> <span>Capture</span>
            </div>
          </NavLink>
        </div>
        <div className="flex items-center gap-2">
          <NavLink to="/auth/login">
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
              Log in
            </Button>
          </NavLink>
          <NavLink to="/auth/signup">
            <Button size="sm" className="inline-flex">
              Sign up
            </Button>
          </NavLink>
          <NavLink to="/profile/me" className="ml-1">
            <Button variant="outline" size="icon" aria-label="Profile">
              <User className="h-4 w-4" />
            </Button>
          </NavLink>
        </div>
      </nav>
    </header>
  );
}
