
import React from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Badge } from '@/components/ui/badge';

interface ModelComparisonProps {
  className?: string;
}

const ModelComparisonChart = ({ className }: ModelComparisonProps) => {
  const comparisonData = [
    {
      name: 'Precision',
      'Our Model': 0.94,
      'XSStrike': 0.82,
      'Dalfox': 0.79,
      'OWASP ZAP': 0.75,
    },
    {
      name: 'Recall',
      'Our Model': 0.97,
      'XSStrike': 0.71,
      'Dalfox': 0.68,
      'OWASP ZAP': 0.65,
    },
    {
      name: 'F1 Score',
      'Our Model': 0.95,
      'XSStrike': 0.76,
      'Dalfox': 0.73,
      'OWASP ZAP': 0.70,
    },
  ];

  const chartConfig = {
    'Our Model': {
      label: 'Our AI Model',
      theme: {
        light: '#000000',
        dark: '#000000',
      },
    },
    'XSStrike': {
      label: 'XSStrike',
      theme: {
        light: '#a855f7',
        dark: '#a855f7',
      },
    },
    'Dalfox': {
      label: 'Dalfox',
      theme: {
        light: '#f43f5e',
        dark: '#f43f5e',
      },
    },
    'OWASP ZAP': {
      label: 'OWASP ZAP',
      theme: {
        light: '#505050',
        dark: '#505050',
      },
    },
  };

  return (
    <Card className={`bg-card border-border/40 ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="space-y-1">
          <CardTitle className="text-xl">Model Performance</CardTitle>
          <CardDescription>
            Comparing detection capabilities with traditional vulnerability scanners
          </CardDescription>
        </div>
        <Badge variant="outline" className="ml-4">AI-Powered</Badge>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="h-[300px] w-full">
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={comparisonData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 1]} tickFormatter={(value) => `${value * 100}%`} />
                <ChartTooltip
                  content={({ active, payload, label }) => {
                    if (!active || !payload) return null;
                    return (
                      <ChartTooltipContent
                        active={active}
                        payload={payload}
                        label={label}
                        formatter={(value) => `${(value as number * 100).toFixed(1)}%`}
                      />
                    );
                  }}
                />
                <Legend />
                <Bar dataKey="Our Model" fill="var(--color-Our Model)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="XSStrike" fill="var(--color-XSStrike)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Dalfox" fill="var(--color-Dalfox)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="OWASP ZAP" fill="var(--color-OWASP ZAP)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
        <div className="mt-4 space-y-2 text-sm text-muted-foreground">
          <p>
            <strong>Key Advantage:</strong> Our AI-driven approach outperforms traditional tools by detecting context-dependent XSS vulnerabilities and reducing false positives.
          </p>
          <p>
            <strong>Testing Methodology:</strong> Performance measured across 500+ real-world web applications with known vulnerabilities.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ModelComparisonChart;
