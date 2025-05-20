
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Mail, ArrowLeft } from 'lucide-react';
import { toast } from "@/components/ui/sonner";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate password reset email
    setTimeout(() => {
      setIsLoading(false);
      setResetSent(true);
      toast.success("Reset email sent", {
        description: "If an account exists with that email, you will receive a password reset link",
      });
    }, 1500);
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-4rem)]">
      <Card className="w-full max-w-md border-primary/20 bg-secondary/10 backdrop-blur-sm">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-2">
            <Shield className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">Reset password</CardTitle>
          <CardDescription>
            {resetSent 
              ? "Check your email for reset instructions" 
              : "Enter your email to receive a password reset link"}
          </CardDescription>
        </CardHeader>
        {!resetSent ? (
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
                    <span>Sending reset email...</span>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Mail className="mr-2 h-4 w-4" />
                    <span>Send reset link</span>
                  </div>
                )}
              </Button>
              <div className="text-center text-sm">
                <a
                  href="#"
                  className="text-primary/90 hover:text-primary flex items-center justify-center"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/signin');
                  }}
                >
                  <ArrowLeft className="mr-1 h-3 w-3" />
                  Back to sign in
                </a>
              </div>
            </CardFooter>
          </form>
        ) : (
          <CardContent className="space-y-6">
            <div className="rounded-lg bg-primary/5 p-6 border border-primary/10">
              <p className="text-center text-sm text-muted-foreground">
                A password reset link has been sent to <span className="font-semibold">{email}</span>. 
                Please check your inbox and follow the instructions to reset your password.
              </p>
            </div>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => navigate('/signin')}
            >
              Return to sign in
            </Button>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default ForgotPassword;
