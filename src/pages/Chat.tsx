
import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Avatar } from '@/components/ui/avatar';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

interface SuggestedTopic {
  id: string;
  title: string;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hi! I'm your cybersecurity assistant. How can I help you with DOM XSS vulnerabilities today?",
      sender: 'assistant',
      timestamp: new Date('2023-07-15T02:34:00')
    }
  ]);
  
  const [inputValue, setInputValue] = useState('');
  
  const suggestedTopics: SuggestedTopic[] = [
    { id: '1', title: 'What is DOM XSS?' },
    { id: '2', title: 'How to prevent DOM XSS?' },
    { id: '3', title: 'Common attack vectors' },
    { id: '4', title: 'DOM XSS severity and risk' },
    { id: '5', title: 'Example of DOM XSS' }
  ];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Simulate assistant response (in real app, this would be an API call)
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: getAssistantResponse(inputValue),
        sender: 'assistant',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    }, 1000);
  };

  const handleTopicClick = (topic: string) => {
    setInputValue(topic);
    
    // Auto submit after a short delay
    setTimeout(() => {
      const userMessage: Message = {
        id: Date.now().toString(),
        content: topic,
        sender: 'user',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, userMessage]);
      
      // Simulate assistant response
      setTimeout(() => {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: getAssistantResponse(topic),
          sender: 'assistant',
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, assistantMessage]);
      }, 1000);
    }, 300);
    
    setInputValue('');
  };

  // Helper function to format time
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getAssistantResponse = (message: string) => {
    // Simple response logic - would be replaced by actual AI in a real app
    if (message.toLowerCase().includes('what is dom xss')) {
      return "DOM-based XSS (Document Object Model-based Cross-Site Scripting) is a type of security vulnerability that occurs when client-side scripts manipulate the DOM in an unsafe way. Unlike traditional XSS where malicious scripts are embedded in HTML responses from the server, DOM XSS executes entirely on the client side, making it harder to detect and mitigate.";
    } else if (message.toLowerCase().includes('how to prevent')) {
      return "To prevent DOM XSS: 1) Use safe DOM APIs like textContent instead of innerHTML, 2) Sanitize user inputs before using them in DOM operations, 3) Implement a strict Content Security Policy (CSP), 4) Use trusted libraries that automatically encode/escape data, 5) Validate all inputs on both client and server sides, and 6) Regularly test your application with security scanning tools.";
    } else if (message.toLowerCase().includes('attack vectors') || message.toLowerCase().includes('common attack')) {
      return "Common DOM XSS attack vectors include: 1) URL fragments and query parameters, 2) document.location manipulation, 3) localStorage/sessionStorage data usage without sanitization, 4) eval() statements with user-controlled input, 5) Direct DOM manipulation via innerHTML, outerHTML, and 6) Event handlers created from untrusted data.";
    } else if (message.toLowerCase().includes('severity') || message.toLowerCase().includes('risk')) {
      return "DOM XSS vulnerabilities are typically rated as medium to high severity. The risk depends on the context, but can lead to session hijacking, credential theft, data exfiltration, and malicious actions performed on behalf of the user. Modern browsers implement some protections, but DOM XSS remains dangerous because it executes with the privileges of the application.";
    } else if (message.toLowerCase().includes('example')) {
      return "Here's a simple DOM XSS example: A website that takes a parameter from the URL like 'https://example.com/page?name=value' and inserts it directly into the page using code like document.getElementById('greeting').innerHTML = 'Hello, ' + name. If the parameter contains malicious JavaScript like '<script>sendCookiesToAttacker()</script>', it would execute in the victim's browser when the content is inserted into the DOM.";
    } else {
      return "I'd be happy to help you understand more about DOM XSS vulnerabilities. Could you specify what aspect you'd like to know more about? Common topics include prevention techniques, attack vectors, risk assessment, or specific examples.";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          {/* Chat interface */}
          <div className="flex flex-col h-[calc(100vh-200px)]">
            <div className="space-y-4 mb-6">
              <h1 className="text-3xl font-bold">Security Assistant</h1>
              <p className="text-muted-foreground">Ask questions about DOM XSS vulnerabilities</p>
            </div>
            
            <div className="flex-1 overflow-y-auto mb-4 pr-2 space-y-6">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    {message.sender === 'assistant' && (
                      <Avatar className="h-10 w-10 mr-4 bg-gray-700">
                        <div className="flex h-full w-full items-center justify-center bg-gray-700">
                          <span className="text-xl">🔒</span>
                        </div>
                      </Avatar>
                    )}
                    
                    <div>
                      <div
                        className={`rounded-xl p-4 ${
                          message.sender === 'user'
                            ? 'bg-gray-700 text-white'
                            : 'bg-gray-800 border border-gray-700'
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                      </div>
                      <div
                        className={`text-xs text-muted-foreground mt-1 ${
                          message.sender === 'user' ? 'text-right' : ''
                        }`}
                      >
                        {formatTime(message.timestamp)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <form onSubmit={handleSendMessage} className="mt-auto">
              <div className="flex items-center space-x-2">
                <Input
                  type="text"
                  placeholder="Type your security question..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit" size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </div>
        </div>
        
        <div className="space-y-6">
          {/* Suggested topics */}
          <Card className="border-border/40 bg-card">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">Suggested Topics</h2>
              <div className="space-y-2">
                {suggestedTopics.map((topic) => (
                  <Button
                    key={topic.id}
                    variant="outline"
                    className="w-full justify-start text-left"
                    onClick={() => handleTopicClick(topic.title)}
                  >
                    {topic.title}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Recent scans section */}
          <Card className="border-border/40 bg-card">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">No Recent Scans</h2>
              <p className="text-muted-foreground mb-4">
                No scan results found. Run a scan to get personalized advice about your site's
                vulnerabilities.
              </p>
              <Button className="w-full">Start a Scan</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Chat;
