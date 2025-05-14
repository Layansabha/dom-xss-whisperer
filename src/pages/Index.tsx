
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
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
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="space-y-2 text-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Detect DOM-based XSS Vulnerabilities With Precision
        </h1>
        <p className="text-lg text-muted-foreground mt-4 px-4">
          Our advanced security scanner identifies potential cross-site scripting vulnerabilities in
          your website with detailed reporting and remediation guidance.
        </p>
      </div>

      <Card className="border-border/40 bg-card/60 backdrop-blur-sm">
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
              className="w-full py-6 text-lg bg-gray-800 hover:bg-gray-700 transition-colors"
              disabled={!url}
            >
              Start Scanning
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="flex justify-center mt-12">
        <Button variant="outline" className="text-muted-foreground">
          Learn More
        </Button>
      </div>
    </div>
  );
};

export default Index;
