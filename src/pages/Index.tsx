
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Shield, AlertTriangle, FileText, Clock, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

const Index = () => {
  const [url, setUrl] = useState('');
  const [scanType, setScanType] = useState('single');
  const [options, setOptions] = useState({
    aiDetection: true,
    realTesting: false,
    aiReport: true
  });
  const navigate = useNavigate();

  const handleScanStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    // Store scan configuration in session storage
    sessionStorage.setItem('scanConfig', JSON.stringify({
      url,
      scanType,
      options
    }));

    // Navigate to the progress page
    navigate('/progress');
  };

  const handleOptionChange = (option: keyof typeof options) => {
    setOptions(prev => ({
      ...prev,
      [option]: !prev[option]
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      {/* Hero Section */}
      <div className="space-y-2 text-center mb-12">
        <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-4">
          <Shield className="h-6 w-6 text-primary mr-2" />
          <span className="text-sm font-medium text-primary">Advanced Security Scanner</span>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Detect DOM-based XSS Vulnerabilities With Precision
        </h1>
        <p className="text-lg text-muted-foreground mt-4 px-4 max-w-3xl mx-auto">
          Our advanced security scanner identifies potential cross-site scripting vulnerabilities in
          your website with detailed reporting and remediation guidance.
        </p>
      </div>

      {/* Main Scan Card */}
      <Card className="border-border/40 bg-card shadow-lg">
        <CardContent className="p-6 md:p-8">
          <form onSubmit={handleScanStart} className="space-y-8">
            <div className="space-y-3">
              <h3 className="text-xl font-medium">Enter URL to Scan</h3>
              <div className="relative">
                <Input 
                  type="text" 
                  placeholder="https://example.com" 
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="pl-4 pr-10 py-6 text-base bg-background border-border"
                />
                <Search className="absolute right-3 top-3 h-5 w-5 text-muted-foreground" />
              </div>
              <p className="text-xs text-muted-foreground">Enter a full URL including http:// or https://</p>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-medium">Scan Type</h3>
              <RadioGroup 
                value={scanType} 
                onValueChange={setScanType}
                className="flex flex-col sm:flex-row gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="single" id="single" />
                  <Label htmlFor="single" className="cursor-pointer">Single Page Scan</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="full" id="full" />
                  <Label htmlFor="full" className="cursor-pointer">Full Domain Scan</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-medium">Scan Options</h3>
              <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-3">
                <div className="flex items-start space-x-3 p-3 rounded-md border border-border bg-card">
                  <Checkbox 
                    id="ai-detection" 
                    checked={options.aiDetection}
                    onCheckedChange={() => handleOptionChange('aiDetection')}
                  />
                  <div className="space-y-1">
                    <Label 
                      htmlFor="ai-detection" 
                      className="text-base font-medium cursor-pointer flex items-center"
                    >
                      AI Detection
                    </Label>
                    <p className="text-sm text-muted-foreground">Use AI to improve detection accuracy</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3 rounded-md border border-border bg-card">
                  <Checkbox 
                    id="real-testing" 
                    checked={options.realTesting}
                    onCheckedChange={() => handleOptionChange('realTesting')}
                  />
                  <div className="space-y-1">
                    <Label 
                      htmlFor="real-testing" 
                      className="text-base font-medium cursor-pointer flex items-center"
                    >
                      Real Testing
                    </Label>
                    <p className="text-sm text-muted-foreground">Execute safe payload tests</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3 rounded-md border border-border bg-card">
                  <Checkbox 
                    id="ai-report" 
                    checked={options.aiReport}
                    onCheckedChange={() => handleOptionChange('aiReport')}
                  />
                  <div className="space-y-1">
                    <Label 
                      htmlFor="ai-report" 
                      className="text-base font-medium cursor-pointer flex items-center"
                    >
                      AI Generated Report
                    </Label>
                    <p className="text-sm text-muted-foreground">Generate detailed analysis</p>
                  </div>
                </div>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full py-6 text-lg bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
              disabled={!url}
            >
              Start Scanning
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Features Section */}
      <div className="mt-20">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold">Why Choose Our XSS Scanner</h2>
          <p className="text-muted-foreground mt-2">Advanced detection with enterprise-grade security features</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-border/40 bg-card/80 hover:shadow-md transition-shadow">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">AI-Powered Detection</h3>
              <p className="text-muted-foreground">Uses machine learning models trained on thousands of real-world vulnerabilities.</p>
            </CardContent>
          </Card>
          
          <Card className="border-border/40 bg-card/80 hover:shadow-md transition-shadow">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <AlertTriangle className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Zero False Positives</h3>
              <p className="text-muted-foreground">Advanced verification ensures you only see genuine security issues.</p>
            </CardContent>
          </Card>
          
          <Card className="border-border/40 bg-card/80 hover:shadow-md transition-shadow">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Detailed Reports</h3>
              <p className="text-muted-foreground">Get comprehensive analysis with remediation steps for each vulnerability.</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Stats Section */}
      <div className="mt-20 p-8 bg-secondary rounded-xl text-white">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold">Trusted By Security Professionals</h2>
          <p className="text-secondary-foreground/80 mt-2">Join thousands of companies protecting their web applications</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">1.2M+</div>
            <p className="text-secondary-foreground/80">Websites Scanned</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">98.3%</div>
            <p className="text-secondary-foreground/80">Detection Accuracy</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">14,000+</div>
            <p className="text-secondary-foreground/80">Vulnerabilities Found</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">2,400+</div>
            <p className="text-secondary-foreground/80">Enterprise Clients</p>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="mt-20 mb-10">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold">What Security Teams Say</h2>
          <p className="text-muted-foreground mt-2">Hear from our users who rely on our tool every day</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-border/40 bg-card/80">
            <CardContent className="p-6">
              <p className="italic mb-4">"This scanner has become an essential part of our security pipeline. The AI detection capabilities have caught vulnerabilities our other tools missed."</p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Sarah Johnson</p>
                  <p className="text-sm text-muted-foreground">CISO, Tech Solutions Inc.</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-border/40 bg-card/80">
            <CardContent className="p-6">
              <p className="italic mb-4">"The detailed reports and remediation guidance have significantly reduced our time-to-fix for critical XSS vulnerabilities across our platforms."</p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Michael Chen</p>
                  <p className="text-sm text-muted-foreground">Security Engineer, Global Finance</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex justify-center mt-12">
        <Button variant="outline" className="text-muted-foreground">
          Learn More About Our Technology
        </Button>
      </div>
    </div>
  );
};

export default Index;
