
import { useState } from 'react';
import { ThreeDCard } from '@/components/ThreeDCard';
import { GeminiChat } from '@/components/GeminiChat';
import { toast } from "@/components/ui/use-toast";

const Index = () => {
  return (
    <div className="min-h-screen w-full overflow-hidden relative bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-indigo-950">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="shape absolute top-[15%] left-[10%] w-64 h-64 rounded-full bg-blue-200/20 dark:bg-blue-500/10 animate-float" style={{ animationDelay: '0s' }}></div>
        <div className="shape absolute top-[40%] right-[15%] w-96 h-96 rounded-full bg-indigo-200/20 dark:bg-indigo-500/10 animate-float" style={{ animationDelay: '-3s' }}></div>
        <div className="shape absolute bottom-[10%] left-[20%] w-72 h-72 rounded-full bg-purple-200/20 dark:bg-purple-500/10 animate-float" style={{ animationDelay: '-6s' }}></div>
      </div>

      <div className="container px-4 sm:px-6 mx-auto flex flex-col min-h-screen py-8">
        <div className="text-center mb-8">
          <div className="inline-block mb-4 relative">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-primary">
                <path d="M12 2a7 7 0 0 1 7 7v1a7 7 0 0 1-7 7v0a7 7 0 0 1-7-7v-1a7 7 0 0 1 7-7z"></path>
                <path d="M19 15v2a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4v-2"></path>
                <line x1="16" y1="4" x2="19" y2="7"></line>
                <line x1="8" y1="4" x2="5" y2="7"></line>
              </svg>
            </div>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Gemini AI Chat
          </h1>
          <p className="mt-2 text-muted-foreground">
            Ask me anything and get AI-powered responses
          </p>
        </div>
        
        <div className="flex-grow w-full max-w-4xl mx-auto">
          <ThreeDCard className="p-4 h-[70vh] overflow-hidden">
            <GeminiChat />
          </ThreeDCard>
        </div>
      </div>
    </div>
  );
};

export default Index;
