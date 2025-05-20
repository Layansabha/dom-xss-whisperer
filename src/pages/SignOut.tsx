
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, LogOut } from 'lucide-react';
import { toast } from "@/components/ui/sonner";

const SignOut = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Remove user data from localStorage
    localStorage.removeItem('user');
    
    // Show a success message
    toast.success("Signed out successfully", {
      description: "You have been securely logged out of your account",
    });
    
    // Redirect to home page after a short delay
    const timer = setTimeout(() => {
      navigate('/');
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col justify-center items-center min-h-[calc(100vh-4rem)]">
      <Shield className="h-16 w-16 text-primary/50 mb-4" />
      <h1 className="text-2xl font-bold mb-2">Signing out...</h1>
      <p className="text-muted-foreground">You will be redirected shortly</p>
      <div className="mt-6 h-1 w-64 bg-secondary/50 rounded-full overflow-hidden">
        <div className="h-full bg-primary animate-pulse rounded-full" />
      </div>
    </div>
  );
};

export default SignOut;
