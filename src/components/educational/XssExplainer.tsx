
import React from 'react';
import { AlertTriangle, Code, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const XssExplainer = () => {
  return (
    <Card className="bg-card border-border/40">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl flex items-center gap-2">
          <Code className="h-5 w-5 text-primary" />
          Understanding DOM-Based XSS
        </CardTitle>
        <CardDescription>
          Learn how cross-site scripting affects web applications and why detection matters
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="p-4 rounded-lg bg-muted flex flex-col items-center text-center space-y-2">
              <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center mb-2">
                <Code className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium">What Is DOM-Based XSS?</h3>
              <p className="text-sm text-muted-foreground">
                A vulnerability where malicious code executes through the browser's Document Object Model without server interaction
              </p>
            </div>
            
            <div className="p-4 rounded-lg bg-muted flex flex-col items-center text-center space-y-2">
              <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center mb-2">
                <AlertTriangle className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium">Why It's Dangerous</h3>
              <p className="text-sm text-muted-foreground">
                Attackers can steal user data, session cookies, and perform actions on behalf of victims
              </p>
            </div>
            
            <div className="p-4 rounded-lg bg-muted flex flex-col items-center text-center space-y-2">
              <div className="h-12 w-12 rounded-full bg-destructive/20 flex items-center justify-center mb-2">
                <ExternalLink className="h-6 w-6 text-destructive" />
              </div>
              <h3 className="font-medium">Common Attack Vectors</h3>
              <p className="text-sm text-muted-foreground">
                URL fragments, client-side storage, and post-message handlers commonly exploited by attackers
              </p>
            </div>
          </div>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="example">
              <AccordionTrigger>How DOM-XSS Attacks Work</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    DOM-based XSS occurs when JavaScript takes data from an attacker-controllable source (like the URL) 
                    and passes it to a sink that supports dynamic code execution.
                  </p>
                  
                  <div className="bg-muted p-3 rounded-md text-xs font-mono overflow-x-auto">
                    <span className="text-red-500">// Vulnerable code example</span><br />
                    <span className="text-muted-foreground">const value = location.hash.substring(1);</span><br />
                    <span className="text-muted-foreground">document.getElementById('output').innerHTML = value;</span>
                  </div>
                  
                  <p className="text-sm text-muted-foreground">
                    This code takes data from the URL hash without sanitization and inserts it into the DOM,
                    allowing attackers to inject and execute malicious scripts.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="prevention">
              <AccordionTrigger>Prevention Techniques</AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                  <li>Use context-aware output encoding (e.g., DOMPurify library)</li>
                  <li>Implement Content Security Policy (CSP) headers</li>
                  <li>Avoid directly inserting user-controllable data into dangerous sinks</li>
                  <li>Validate and sanitize all client inputs before processing</li>
                  <li>Regular security testing and vulnerability scanning</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </CardContent>
    </Card>
  );
};

export default XssExplainer;
