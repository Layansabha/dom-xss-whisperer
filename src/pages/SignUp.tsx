
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, UserPlus } from 'lucide-react';
import { toast } from "@/components/ui/sonner";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (password !== confirmPassword) {
      toast.error("Passwords do not match", {
        description: "Please ensure both passwords match",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate sign up process
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Account created successfully", {
        description: "Welcome to Trio Security Scanner",
      });
      // In a real implementation, you'd register the user with your auth system
      navigate('/signin');
    }, 1500);
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-4rem)]">
      <Card className="w-full max-w-md border-primary/20 bg-secondary/10 backdrop-blur-sm">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-2">
            <Shield className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
          <CardDescription>
            Enter your details to sign up for Trio Security Scanner
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border-primary/20 bg-secondary/5"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border-primary/20 bg-secondary/5"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="border-primary/20 bg-secondary/5"
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button 
              type="submit" 
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="h-4 w-4 mr-2 rounded-full border-2 border-t-transparent border-primary animate-spin" />
                  <span>Creating account...</span>
                </div>
              ) : (
                <div className="flex items-center">
                  <UserPlus className="mr-2 h-4 w-4" />
                  <span>Sign up</span>
                </div>
              )}
            </Button>
            <div className="text-center text-sm">
              Already have an account?{" "}
              <a
                href="#"
                className="text-primary/90 hover:text-primary"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/signin');
                }}
              >
                Sign in
              </a>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default SignUp;
