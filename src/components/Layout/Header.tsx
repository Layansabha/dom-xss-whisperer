
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, Bell, Settings, LogIn, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Logo from '../common/Logo';
import { Command, CommandInput } from '@/components/ui/command';
import { toast } from "@/components/ui/sonner";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem('user');
    setIsLoggedIn(!!user);
  }, [location]); // Re-check when location changes
  
  const isActive = (path: string) => {
    return location.pathname === path 
      ? 'bg-primary/10 text-primary font-medium' 
      : 'text-foreground/70 hover:text-primary transition-colors';
  };

  const handleAuthAction = () => {
    if (isLoggedIn) {
      navigate('/signout');
    } else {
      navigate('/signin');
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-secondary text-white backdrop-blur supports-[backdrop-filter]:bg-secondary/95">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <div className="flex items-center gap-2 mr-6">
          <Logo />
          <span className="text-xl font-bold text-white">Trio</span>
        </div>

        <nav className="flex items-center space-x-2 md:space-x-4 flex-1">
          <Link to="/" className={`px-3 py-2 rounded-md text-sm ${isActive('/')}`}>
            Home
          </Link>
          <Link to="/history" className={`px-3 py-2 rounded-md text-sm ${isActive('/history')}`}>
            History
          </Link>
          <Link to="/results" className={`px-3 py-2 rounded-md text-sm ${isActive('/results')}`}>
            Results
          </Link>
          <Link to="/chat" className={`px-3 py-2 rounded-md text-sm ${isActive('/chat')}`}>
            Chat
          </Link>
        </nav>

        <div className="flex items-center space-x-2">
          {searchOpen ? (
            <div className="relative">
              <Command className="rounded-lg border border-primary/20 shadow-md bg-secondary/95">
                <CommandInput 
                  placeholder="Search vulnerabilities..." 
                  className="h-9 text-sm text-white" 
                  onBlur={() => setSearchOpen(false)}
                  autoFocus
                />
              </Command>
            </div>
          ) : (
            <Button 
              variant="outline" 
              size="icon" 
              className="text-white/80 hover:text-white border-primary/20 hover:border-primary hover:bg-primary/10"
              onClick={() => setSearchOpen(true)}
            >
              <Search className="h-5 w-5" />
            </Button>
          )}
          <Button variant="ghost" size="icon" className="text-white/80 hover:text-white">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-white/80 hover:text-white">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="ml-4 flex items-center">
          <Button 
            variant={isLoggedIn ? "outline" : "default"}
            className={isLoggedIn 
              ? "border-primary/20 hover:border-primary hover:bg-primary/10 text-white"
              : "bg-primary text-primary-foreground hover:bg-primary/90 font-medium"
            }
            onClick={handleAuthAction}
          >
            {isLoggedIn ? (
              <>
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </>
            ) : (
              <>
                <LogIn className="mr-2 h-4 w-4" />
                Sign In
              </>
            )}
          </Button>
          
          {!isLoggedIn && (
            <Button
              className="ml-2 bg-primary text-primary-foreground hover:bg-primary/90 font-medium hidden md:flex"
              onClick={() => {
                toast.info("New scan feature requires authentication", {
                  description: "Please sign in to start a new scan"
                });
                navigate('/signin');
              }}
            >
              New Scan
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
