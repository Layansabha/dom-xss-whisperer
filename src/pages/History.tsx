
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';

interface ScanHistory {
  id: string;
  date: string;
  time: string;
  targetUrl: string;
  type: 'Page' | 'Domain';
  vulnerabilities: number;
  severity: 'High' | 'Medium' | 'Low';
}

const History = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [severityFilter, setSeverityFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  // Mock history data
  const scanHistory: ScanHistory[] = [
    {
      id: '1',
      date: 'Jul 10, 2023',
      time: '06:30 PM',
      targetUrl: 'https://example.com',
      type: 'Page',
      vulnerabilities: 3,
      severity: 'High'
    },
    {
      id: '2',
      date: 'Jul 9, 2023',
      time: '01:15 PM',
      targetUrl: 'https://test-site.org',
      type: 'Domain',
      vulnerabilities: 1,
      severity: 'Medium'
    },
    {
      id: '3',
      date: 'Jul 8, 2023',
      time: '05:45 PM',
      targetUrl: 'https://example.com/login',
      type: 'Page',
      vulnerabilities: 0,
      severity: 'Low'
    },
    {
      id: '4',
      date: 'Jul 7, 2023',
      time: '02:20 PM',
      targetUrl: 'https://demo.testfire.net',
      type: 'Domain',
      vulnerabilities: 5,
      severity: 'High'
    },
    {
      id: '5',
      date: 'Jul 6, 2023',
      time: '12:00 PM',
      targetUrl: 'https://securitytesting.com',
      type: 'Page',
      vulnerabilities: 2,
      severity: 'Medium'
    }
  ];

  // Filter history based on search and filters
  const filteredHistory = scanHistory.filter(item => {
    // Search filter
    if (searchQuery && !item.targetUrl.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Severity filter
    if (severityFilter !== 'all' && item.severity.toLowerCase() !== severityFilter.toLowerCase()) {
      return false;
    }
    
    // Type filter
    if (typeFilter !== 'all' && item.type.toLowerCase() !== typeFilter.toLowerCase()) {
      return false;
    }
    
    return true;
  });

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
      <div className="space-y-4 mb-8">
        <h1 className="text-3xl font-bold">Scan History</h1>
        <p className="text-muted-foreground">View and analyze your past security scans</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Input
            type="text"
            placeholder="Search by URL..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
        </div>
        <div className="flex gap-4">
          <Select value={severityFilter} onValueChange={setSeverityFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Severities" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Severities</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="page">Page</SelectItem>
              <SelectItem value="domain">Domain</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card className="border-border/40">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-muted/40">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Time
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Target URL
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Type
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Vulnerabilities
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Severity
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredHistory.length > 0 ? (
                filteredHistory.map((scan) => (
                  <tr key={scan.id} className="hover:bg-muted/40 transition-colors">
                    <td className="px-4 py-4 text-sm">{scan.date}</td>
                    <td className="px-4 py-4 text-sm">{scan.time}</td>
                    <td className="px-4 py-4 text-sm font-medium max-w-xs truncate" title={scan.targetUrl}>
                      {scan.targetUrl}
                    </td>
                    <td className="px-4 py-4 text-sm">{scan.type}</td>
                    <td className="px-4 py-4 text-sm">{scan.vulnerabilities}</td>
                    <td className="px-4 py-4">
                      {getSeverityBadge(scan.severity)}
                    </td>
                    <td className="px-4 py-4 text-sm">
                      <div className="space-x-2">
                        <Button variant="ghost" size="sm" onClick={() => navigate('/results')}>
                          View
                        </Button>
                        <Button variant="ghost" size="sm">
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-muted-foreground">
                    No scan history found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="p-4 text-sm text-muted-foreground border-t border-border">
          Your scan history
        </div>
      </Card>
    </div>
  );
};

export default History;
