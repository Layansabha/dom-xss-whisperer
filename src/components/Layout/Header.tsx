
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Bell, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Logo from '../common/Logo';

const Header = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path ? 'bg-secondary text-primary' : 'text-gray-400 hover:text-primary';
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="flex items-center gap-2 mr-6">
          <Logo />
          <span className="text-xl font-bold">Trio</span>
        </div>

        <nav className="flex items-center space-x-2 md:space-x-4 flex-1">
          <Link to="/" className={`px-3 py-2 rounded-md text-sm font-medium ${isActive('/')}`}>
            Home
          </Link>
          <Link to="/history" className={`px-3 py-2 rounded-md text-sm font-medium ${isActive('/history')}`}>
            History
          </Link>
          <Link to="/results" className={`px-3 py-2 rounded-md text-sm font-medium ${isActive('/results')}`}>
            Results
          </Link>
          <Link to="/chat" className={`px-3 py-2 rounded-md text-sm font-medium ${isActive('/chat')}`}>
            Chat
          </Link>
        </nav>

        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="ml-4">
          <Button className="bg-background text-primary border border-border hover:bg-secondary">
            New Scan
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
