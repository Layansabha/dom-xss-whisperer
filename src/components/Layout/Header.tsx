
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Bell, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Logo from '../common/Logo';

const Header = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path 
      ? 'bg-accent/10 text-accent font-medium' 
      : 'text-gray-400 hover:text-accent transition-colors';
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <div className="flex items-center gap-2 mr-6">
          <Logo />
          <span className="text-xl font-bold text-accent">Trio</span>
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
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="ml-4">
          <Button className="bg-accent text-accent-foreground hover:bg-accent/80">
            New Scan
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
