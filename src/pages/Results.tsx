
import React, { useState, useEffect } from 'react';
import { 
  Download, FileText, Check, X, AlertTriangle, ChevronDown, ChevronUp, FileSearch, ListFilter, Code, Brain
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from 'sonner';
import XssExplainer from '@/components/educational/XssExplainer';
import ModelComparisonChart from '@/components/comparison/ModelComparisonChart';

interface ScanResult {
  url: string;
  vulnerable: boolean;
  type: 'Page' | 'Domain';
  vulnerabilities: number;
  severity: 'High' | 'Medium' | 'Low';
  details: {
    riskFactors: string[];
    payload?: string;
  };
}

interface ScanStep {
  id: string;
  title: string;
  status: 'pending' | 'active' | 'completed' | 'skipped';
  timestamp?: string;
}

const Results = () => {
  const [results, setResults] = useState<ScanResult[]>([]);
  const [selectedResult, setSelectedResult] = useState<ScanResult | null>(null);
  const [email, setEmail] = useState('');
  const [showExportOptions, setShowExportOptions] = useState(false);
  const [showReportDialog, setShowReportDialog] = useState(false);

  // Define scanning steps
  const [scanSteps, setScanSteps] = useState<ScanStep[]>([
    { id: 'validate', title: 'Validating Input', status: 'pending' },
    { id: 'crawl', title: 'Crawling Domain / Collecting Pages', status: 'pending' },
    { id: 'filter', title: 'Filtering Accessible URLs (Live Check)', status: 'pending' },
    { id: 'extract', title: 'Extracting DOM Features', status: 'pending' },
    { id: 'predict', title: 'AI-Based Vulnerability Prediction', status: 'pending' },
    { id: 'test', title: 'Running Real XSS Tests', status: 'pending' },
    { id: 'report', title: 'Generating AI-Based Report', status: 'pending' },
  ]);
  
  const [scanLogs, setScanLogs] = useState<{ message: string; timestamp: string }[]>([]);

  useEffect(() => {
    // Simulate loading results
    const mockResults: ScanResult[] = [
      {
        url: 'https://example.com',
        vulnerable: true,
        type: 'Page',
        vulnerabilities: 3,
        severity: 'High',
        details: {
          riskFactors: [
            'Unsanitized user input directly injected into innerHTML',
            'Event handlers constructed from query parameters',
            'DOM manipulation with untrusted data sources'
          ],
          payload: 'location.hash.substring(1)'
        }
      },
      {
        url: 'https://example.com/login',
        vulnerable: true,
        type: 'Page',
        vulnerabilities: 1,
        severity: 'Medium',
        details: {
          riskFactors: [
            'Unsanitized inputs from localStorage used in DOM'
          ]
        }
      },
      {
        url: 'https://example.com/about',
        vulnerable: false,
        type: 'Page',
        vulnerabilities: 0,
        severity: 'Low',
        details: {
          riskFactors: []
        }
      }
    ];

    // Simulate scanning steps and logs
    const simulateScan = async () => {
      // Run through each step
      for (let i = 0; i < scanSteps.length; i++) {
        // Update current step to active
        setScanSteps(prev => prev.map((step, idx) => 
          idx === i ? { ...step, status: 'active' } : step
        ));
        
        // Add logs specific to the step
        switch(i) {
          case 0: // Validating Input
            addLog('Scanner initialized and parameters validated');
            await wait(1000);
            break;
          case 1: // Crawling
            addLog('Initializing crawler...');
            await wait(800);
            addLog('Crawling https://example.com...');
            await wait(1200);
            break;
          case 2: // Filtering
            addLog('Discovered 12 pages for analysis');
            await wait(1000);
            break;
          case 3: // Extracting
            addLog('Analyzing page: https://example.com/');
            await wait(800);
            addLog('Extracting DOM event handlers and JavaScript sinks');
            await wait(1000);
            break;
          case 4: // AI Prediction
            addLog('Loading detection model...');
            await wait(1200);
            addLog('Running AI predictions on extracted features');
            await wait(1500);
            break;
          case 5: // Running Tests
            addLog('Testing potential XSS vectors');
            await wait(1500);
            addLog('Verifying vulnerability on https://example.com');
            await wait(1000);
            break;
          case 6: // Generating Report
            addLog('Compiling scan results');
            await wait(800);
            addLog('Generating AI-based security recommendations');
            await wait(1200);
            break;
        }
        
        // Mark step as completed
        setScanSteps(prev => prev.map((step, idx) => 
          idx === i ? { ...step, status: 'completed' } : step
        ));

        // If this is the last step, set the results and show report dialog
        if (i === scanSteps.length - 1) {
          setTimeout(() => {
            setResults(mockResults);
            setShowReportDialog(true);
          }, 500);
        }
      }
    };
    
    simulateScan();
  }, []);

  const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  
  const addLog = (message: string) => {
    const now = new Date();
    const timestamp = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
    setScanLogs(prev => [...prev, { message, timestamp }]);
  };

  const subscribeToAlerts = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('You have been subscribed to alerts');
    setEmail('');
  };

  const handleExport = (format: string) => {
    toast.success(`Exporting results as ${format}`);
    setShowExportOptions(false);
  };

  const scanSummary = {
    totalPages: results.length,
    vulnerablePages: results.filter(r => r.vulnerable).length,
    scanTime: '24.7s',
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'High':
        return <span className="px-2 py-1 text-xs rounded-full bg-red-500 text-white">High</span>;
      case 'Medium':
        return <span className="px-2 py-1 text-xs rounded-full bg-yellow-500 text-black">Medium</span>;
      case 'Low':
        return <span className="px-2 py-1 text-xs rounded-full bg-green-500 text-white">Low</span>;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="space-y-4 mb-10">
        <h1 className="text-3xl font-bold">Scan Results</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-card border-border/40">
            <CardContent className="p-6 flex flex-col items-center justify-center">
              <div className="text-5xl font-bold mb-2">{scanSummary.totalPages}</div>
              <p className="text-muted-foreground">Pages Scanned</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border/40">
            <CardContent className="p-6 flex flex-col items-center justify-center">
              <div className="text-5xl font-bold mb-2 text-red-500">{scanSummary.vulnerablePages}</div>
              <p className="text-muted-foreground">Vulnerable Pages</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border/40">
            <CardContent className="p-6 flex flex-col items-center justify-center">
              <div className="text-5xl font-bold mb-2">{scanSummary.scanTime}</div>
              <p className="text-muted-foreground">Total Scan Time</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Educational Section */}
      <div className="mb-10">
        <XssExplainer />
      </div>

      {/* Model Comparison Chart */}
      <div className="mb-10">
        <ModelComparisonChart />
      </div>

      {/* Live Scan Log */}
      <Card className="mb-10 border-border/40">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle className="text-xl">Live Scan Log</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="mb-6 px-6 pt-4">
            <div className="flex flex-wrap gap-2 mb-4">
              {scanSteps.map((step) => (
                <div 
                  key={step.id}
                  className={`flex items-center space-x-1 px-3 py-1 rounded-full text-xs 
                    ${step.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 
                      step.status === 'active' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 animate-pulse' : 
                      'bg-gray-100 text-gray-600 dark:bg-gray-800/50 dark:text-gray-400'}`}
                >
                  {step.status === 'completed' ? <Check className="w-3 h-3" /> : 
                   step.status === 'active' ? <span className="w-2 h-2 bg-blue-500 rounded-full"></span> : 
                   <span className="w-2 h-2 bg-gray-400 rounded-full"></span>}
                  <span>{step.title}</span>
                </div>
              ))}
            </div>
          </div>
          
          <ScrollArea className="h-[300px] px-6 pb-6">
            <div className="space-y-2">
              {scanLogs.map((log, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border/30"
                >
                  <span className="text-sm">{log.message}</span>
                  <span className="text-xs text-muted-foreground">{log.timestamp}</span>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Detected Vulnerabilities</h2>
        <div className="relative">
          <Button 
            variant="outline" 
            onClick={() => setShowExportOptions(!showExportOptions)}
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Export
            {showExportOptions ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
          
          {showExportOptions && (
            <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-md shadow-lg z-10">
              <div 
                className="p-2 hover:bg-muted cursor-pointer flex items-center gap-2"
                onClick={() => handleExport('PDF')}
              >
                <FileText className="h-4 w-4" />
                Export as PDF
              </div>
              <div 
                className="p-2 hover:bg-muted cursor-pointer flex items-center gap-2"
                onClick={() => handleExport('JSON')}
              >
                <FileText className="h-4 w-4" />
                Export as JSON
              </div>
            </div>
          )}
        </div>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="all">All ({results.length})</TabsTrigger>
          <TabsTrigger value="vulnerable">Vulnerable ({results.filter(r => r.vulnerable).length})</TabsTrigger>
          <TabsTrigger value="safe">Safe ({results.filter(r => !r.vulnerable).length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {results.map((result) => (
            <ResultCard 
              key={result.url} 
              result={result} 
              onSelect={() => setSelectedResult(result)}
            />
          ))}
        </TabsContent>

        <TabsContent value="vulnerable" className="space-y-4">
          {results.filter(r => r.vulnerable).map((result) => (
            <ResultCard 
              key={result.url} 
              result={result} 
              onSelect={() => setSelectedResult(result)}
            />
          ))}
        </TabsContent>

        <TabsContent value="safe" className="space-y-4">
          {results.filter(r => !r.vulnerable).map((result) => (
            <ResultCard 
              key={result.url} 
              result={result} 
              onSelect={() => setSelectedResult(result)}
            />
          ))}
        </TabsContent>
      </Tabs>

      {selectedResult && (
        <Dialog open={!!selectedResult} onOpenChange={() => setSelectedResult(null)}>
          <DialogContent className="sm:max-w-xl">
            <DialogHeader>
              <DialogTitle>Vulnerability Details</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4 mt-4">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-medium break-all">{selectedResult.url}</h3>
                {getSeverityBadge(selectedResult.severity)}
              </div>
              
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-muted-foreground">Risk Factors</h4>
                <ul className="space-y-2">
                  {selectedResult.details.riskFactors.length > 0 ? (
                    selectedResult.details.riskFactors.map((factor, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                        <span>{factor}</span>
                      </li>
                    ))
                  ) : (
                    <li className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>No vulnerabilities detected</span>
                    </li>
                  )}
                </ul>
              </div>

              {selectedResult.details.payload && (
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-muted-foreground">Potential Payload Vector</h4>
                  <pre className="bg-muted p-3 rounded-md text-xs overflow-x-auto">
                    {selectedResult.details.payload}
                  </pre>
                </div>
              )}

              <div className="flex justify-end space-x-4 pt-4">
                <Button variant="outline" onClick={() => setSelectedResult(null)}>
                  Close
                </Button>
                {selectedResult.vulnerable && (
                  <Button>
                    Run Manual Test
                  </Button>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* AI Report Dialog */}
      <Dialog open={showReportDialog} onOpenChange={setShowReportDialog}>
        <DialogContent className="sm:max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-primary" />
              AI-Generated Security Report
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6 mt-4">
            <div className="p-4 bg-muted/50 rounded-lg border border-border/40">
              <h3 className="text-lg font-semibold mb-2">Executive Summary</h3>
              <p className="text-sm">
                The security scan detected <strong className="text-red-500">{results.filter(r => r.vulnerable).length} vulnerable pages</strong> out 
                of {results.length} analyzed URLs. These vulnerabilities are predominantly DOM-based XSS issues that could allow 
                attackers to execute arbitrary JavaScript in users' browsers, potentially leading to credential theft, 
                session hijacking, or data exfiltration.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-3">Vulnerability Assessment</h3>
              
              <div className="space-y-4">
                {results.filter(r => r.vulnerable).map((result, idx) => (
                  <Card key={idx} className="border-red-200 bg-red-50/30 dark:bg-red-900/10">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="font-medium text-red-700 dark:text-red-400">{result.url}</h4>
                        {getSeverityBadge(result.severity)}
                      </div>
                      
                      <div className="mb-3">
                        <h5 className="text-sm font-medium mb-1">Analysis:</h5>
                        <p className="text-sm">
                          This page is vulnerable to DOM-based XSS attacks due to unsanitized user input being directly 
                          inserted into the document. The vulnerability allows attackers to inject malicious scripts that 
                          execute in users' browsers.
                        </p>
                      </div>
                      
                      <div className="mb-3">
                        <h5 className="text-sm font-medium mb-1">Top Influencing Features:</h5>
                        <ul className="text-xs list-disc pl-5 space-y-1">
                          {result.details.riskFactors.map((factor, i) => (
                            <li key={i}>{factor}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h5 className="text-sm font-medium mb-1">Recommendation:</h5>
                        <p className="text-sm text-red-700 dark:text-red-400">
                          Implement proper output encoding and use safe DOM manipulation methods like textContent 
                          instead of innerHTML. Consider using a trusted library like DOMPurify to sanitize user input 
                          before rendering it to the DOM.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                {results.filter(r => !r.vulnerable).length > 0 && (
                  <Card className="border-green-200 bg-green-50/30 dark:bg-green-900/10">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="font-medium text-green-700 dark:text-green-400">Safe Pages</h4>
                        <span className="px-2 py-1 text-xs rounded-full bg-green-500 text-white">
                          {results.filter(r => !r.vulnerable).length} pages
                        </span>
                      </div>
                      
                      <div className="mb-3">
                        <p className="text-sm">
                          The following pages were found to be secure against DOM-based XSS attacks:
                        </p>
                        <ul className="text-xs list-disc pl-5 space-y-1 mt-2">
                          {results.filter(r => !r.vulnerable).map((result, i) => (
                            <li key={i}>{result.url}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h5 className="text-sm font-medium mb-1">Recommendation:</h5>
                        <p className="text-sm text-green-700 dark:text-green-400">
                          Continue following secure coding practices. Maintain regular security assessments as new 
                          features are developed to ensure continued protection.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
            
            <div className="p-4 bg-muted/50 rounded-lg border border-border/40">
              <h3 className="text-lg font-semibold mb-2">Overall Security Recommendations</h3>
              <ul className="text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <Code className="h-4 w-4 mt-1 text-primary flex-shrink-0" />
                  <span>Implement Content Security Policy (CSP) to provide an additional layer of protection against XSS attacks.</span>
                </li>
                <li className="flex items-start gap-2">
                  <FileSearch className="h-4 w-4 mt-1 text-primary flex-shrink-0" />
                  <span>Conduct regular security reviews of JavaScript code handling user-supplied data.</span>
                </li>
                <li className="flex items-start gap-2">
                  <ListFilter className="h-4 w-4 mt-1 text-primary flex-shrink-0" />
                  <span>Use input validation for all user-supplied data, especially URL parameters and form inputs.</span>
                </li>
              </ul>
            </div>
            
            <div className="flex justify-end space-x-4 pt-4">
              <Button variant="outline" onClick={() => setShowReportDialog(false)}>
                Close
              </Button>
              <Button onClick={() => {
                setShowReportDialog(false);
                toast.success("Security report downloaded");
              }}>
                <Download className="h-4 w-4 mr-2" />
                Download Report
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      <Card className="mt-10 border-border/40">
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-4">Get Vulnerability Alerts</h3>
          <p className="text-muted-foreground mb-4">
            We'll only contact you for report updates and new detections.
          </p>
          <form onSubmit={subscribeToAlerts} className="flex items-center gap-4">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-background"
              required
            />
            <Button type="submit">Subscribe</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

interface ResultCardProps {
  result: ScanResult;
  onSelect: () => void;
}

const ResultCard = ({ result, onSelect }: ResultCardProps) => {
  return (
    <Card className="bg-card border-border/40 hover:border-gray-600 transition-colors">
      <CardContent className="p-0">
        <div className="p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              {result.vulnerable ? (
                <span className="h-2 w-2 bg-red-500 rounded-full" />
              ) : (
                <span className="h-2 w-2 bg-green-500 rounded-full" />
              )}
              <span className="text-sm text-muted-foreground">{result.type}</span>
            </div>
            <h3 className="font-medium truncate max-w-md" title={result.url}>{result.url}</h3>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              {result.vulnerable ? (
                <div className="flex items-center">
                  <X className="h-5 w-5 text-red-500 mr-2" />
                  <span className="text-red-500 font-medium">Vulnerable</span>
                </div>
              ) : (
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-green-500 font-medium">Safe</span>
                </div>
              )}
            </div>
            
            <Button onClick={onSelect} variant="outline" size="sm">
              Details
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Results;
