
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Bell, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Logo from '../common/Logo';

const Header = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path 
      ? 'bg-primary/10 text-primary font-medium' 
      : 'text-foreground/70 hover:text-primary transition-colors';
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <div className="flex items-center gap-2 mr-6">
          <Logo />
          <span className="text-xl font-bold text-primary">Trio</span>
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
          <Button variant="ghost" size="icon" className="text-foreground/70 hover:text-foreground">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-foreground/70 hover:text-foreground">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-foreground/70 hover:text-foreground">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="ml-4">
          <Button className="bg-primary text-primary-foreground hover:bg-primary/80">
            New Scan
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
