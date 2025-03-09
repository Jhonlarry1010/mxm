
import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/Button';
import { ThreeDCard } from '@/components/ThreeDCard';
import { toast } from "@/components/ui/use-toast";

// Define the message type
interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export function GeminiChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // API Key
  const API_KEY = 'AIzaSyBySsu2AXUscOR9_w5aVnNWsEt8P7hWNeY';
  
  // Scroll to bottom of chat
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // Add user message to chat
    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    try {
      // Call Google's Generative AI API
      const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' + API_KEY, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [{ text: input }]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          },
        })
      });
      
      const data = await response.json();
      
      if (data.candidates && data.candidates[0]?.content?.parts?.length > 0) {
        // Add AI response to chat
        const aiMessage: Message = { 
          role: 'assistant', 
          content: data.candidates[0].content.parts[0].text 
        };
        setMessages(prev => [...prev, aiMessage]);
      } else {
        throw new Error('Failed to get response from Gemini');
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to get a response from Gemini AI",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="h-full flex flex-col">
      <div className="flex-grow overflow-auto p-4">
        <div className="space-y-4">
          {messages.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>Ask Gemini AI anything...</p>
            </div>
          ) : (
            messages.map((message, index) => (
              <ThreeDCard 
                key={index}
                className={cn(
                  "p-4 max-w-[80%]",
                  message.role === 'assistant' 
                    ? "ml-auto bg-primary/10" 
                    : "mr-auto bg-white/80 dark:bg-gray-950/80"
                )}
              >
                <div className="flex items-start gap-3">
                  <div className={cn(
                    "rounded-full w-8 h-8 flex items-center justify-center",
                    message.role === 'assistant' 
                      ? "bg-primary/20 text-primary" 
                      : "bg-gray-200 dark:bg-gray-800"
                  )}>
                    {message.role === 'assistant' ? 'AI' : 'You'}
                  </div>
                  <div className="flex-1 space-y-2">
                    <p className="text-sm font-medium">
                      {message.role === 'assistant' ? 'Gemini AI' : 'You'}
                    </p>
                    <div className="prose dark:prose-invert text-sm">
                      {message.content.split('\n').map((text, i) => (
                        <p key={i}>{text}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </ThreeDCard>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      <div className="border-t p-4">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Message Gemini AI..."
            className="flex-grow p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-900"
            disabled={isLoading}
          />
          <Button 
            type="submit" 
            disabled={isLoading || !input.trim()}
          >
            {isLoading ? (
              <div className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </div>
            ) : (
              'Send'
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
