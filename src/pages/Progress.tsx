
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Loader } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ScanStage {
  name: string;
  status: 'pending' | 'running' | 'completed';
  time?: number;
  progress: number;
}

const Progress = () => {
  const navigate = useNavigate();
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [scanConfig, setScanConfig] = useState<any>(null);
  const [stages, setStages] = useState<ScanStage[]>([
    { name: 'Validating input', status: 'pending', progress: 0 },
    { name: 'Crawling website', status: 'pending', progress: 0 },
    { name: 'Checking live URLs', status: 'pending', progress: 0 },
    { name: 'Extracting DOM features', status: 'pending', progress: 0 },
    { name: 'Analyzing with AI model', status: 'pending', progress: 0 },
    { name: 'Generating report', status: 'pending', progress: 0 }
  ]);

  useEffect(() => {
    // Get scan configuration from session storage
    const config = sessionStorage.getItem('scanConfig');
    if (config) {
      setScanConfig(JSON.parse(config));
    }

    // Start the scanning simulation process
    simulateScanProcess();
  }, []);

  const simulateScanProcess = () => {
    let stageIndex = 0;
    
    const processStage = (index: number) => {
      if (index >= stages.length) {
        setTimeout(() => {
          navigate('/results');
        }, 500);
        return;
      }

      // Update current stage to running
      setStages(prevStages => {
        const newStages = [...prevStages];
        newStages[index] = { ...newStages[index], status: 'running', progress: 0 };
        return newStages;
      });
      setCurrentStageIndex(index);

      // Simulate progress updates
      let progress = 0;
      const progressInterval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
          progress = 100;
          clearInterval(progressInterval);
          
          // Mark current stage as completed
          const completionTime = (1 + Math.random() * 3).toFixed(1);
          setStages(prevStages => {
            const newStages = [...prevStages];
            newStages[index] = { 
              ...newStages[index],
              status: 'completed',
              progress: 100,
              time: parseFloat(completionTime)
            };
            return newStages;
          });

          // Process next stage after a delay
          setTimeout(() => {
            processStage(index + 1);
          }, 500);
        } else {
          // Update progress
          setStages(prevStages => {
            const newStages = [...prevStages];
            newStages[index] = { ...newStages[index], progress };
            return newStages;
          });
        }
      }, 200);
    };

    // Start with the first stage
    processStage(stageIndex);
  };

  const renderStageIcon = (stage: ScanStage) => {
    if (stage.status === 'completed') {
      return <Check className="h-5 w-5 text-green-500" />;
    } else if (stage.status === 'running') {
      return <Loader className="h-5 w-5 animate-spin text-primary" />;
    } else {
      return <div className="h-5 w-5 rounded-full border border-muted-foreground" />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <div className="space-y-4 text-center mb-8">
        <h1 className="text-3xl font-bold">Scanning In Progress</h1>
        <p className="text-muted-foreground">
          {scanConfig?.url ? `Scanning ${scanConfig.url}` : 'Processing your request'}
        </p>
      </div>

      <Card className="border-border/40 bg-card/60 backdrop-blur-sm mb-8">
        <CardContent className="p-6">
          <div className="space-y-6">
            {stages.map((stage, index) => (
              <div key={stage.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {renderStageIcon(stage)}
                    <span className={stage.status === 'completed' ? 'text-primary' : 'text-muted-foreground'}>
                      {stage.name}
                    </span>
                  </div>
                  {stage.status === 'completed' && (
                    <span className="text-sm text-muted-foreground">{stage.time}s</span>
                  )}
                </div>
                <div className="progress-container">
                  <div 
                    className="progress-bar" 
                    style={{ width: `${stage.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="text-center">
        <p className="text-sm text-muted-foreground mb-4">
          This process may take a few minutes depending on the website size and complexity.
        </p>
        <Button 
          variant="outline"
          onClick={() => navigate('/')}
          className="text-muted-foreground"
        >
          Cancel Scan
        </Button>
      </div>
    </div>
  );
};

export default Progress;
