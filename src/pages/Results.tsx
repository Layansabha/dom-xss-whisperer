
import React, { useState, useEffect } from 'react';
import { 
  Download, FileText, Check, X, AlertTriangle, ChevronDown, ChevronUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

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

const Results = () => {
  const [results, setResults] = useState<ScanResult[]>([]);
  const [selectedResult, setSelectedResult] = useState<ScanResult | null>(null);
  const [email, setEmail] = useState('');
  const [showExportOptions, setShowExportOptions] = useState(false);

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

    setTimeout(() => {
      setResults(mockResults);
    }, 500);
  }, []);

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
