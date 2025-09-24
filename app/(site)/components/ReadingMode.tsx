"use client";

import { useState, useEffect } from "react";
import { BookOpen, X, Maximize2, Minimize2 } from "lucide-react";
import ReadingProgress from "./ReadingProgress";

interface ReadingModeProps {
  children: React.ReactNode;
  title: string;
  author: string;
  publishedAt: string;
}

export default function ReadingMode({ children, title, author, publishedAt }: ReadingModeProps) {
  const [isReadingMode, setIsReadingMode] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerId = "reading-mode-scroll";

  const toggleReadingMode = () => {
    setIsReadingMode(!isReadingMode);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // Handle fullscreen change events
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Prevent body scroll when in reading mode
  useEffect(() => {
    if (isReadingMode) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isReadingMode]);

  if (!isReadingMode) {
    return (
      <>
        {/* Reading Mode Toggle Button */}
        <button
          onClick={toggleReadingMode}
          className="fixed bottom-6 right-6 z-40 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 group"
          aria-label="Enter reading mode"
        >
          <BookOpen className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
        </button>
        {children}
      </>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-white dark:bg-zinc-900">
      <ReadingProgress targetId={containerId} />
      {/* Reading Mode Header */}
      <div className="sticky top-0 z-10 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-700 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleReadingMode}
              className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors duration-200"
              aria-label="Exit reading mode"
            >
              <X className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
            </button>
            <div>
              <h1 className="font-serif text-xl text-zinc-900 dark:text-zinc-100 line-clamp-1">
                {title}
              </h1>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                {author} • {publishedAt}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={toggleFullscreen}
              className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors duration-200"
              aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
            >
              {isFullscreen ? (
                <Minimize2 className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
              ) : (
                <Maximize2 className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Reading Mode Content */}
      <div id={containerId} className="max-w-4xl mx-auto px-6 py-8 overflow-y-auto h-full">
        <div className="prose-custom prose-columns">
          {children}
        </div>
      </div>
    </div>
  );
}
