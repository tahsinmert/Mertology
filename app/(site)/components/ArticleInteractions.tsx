"use client";

import { useState, useEffect } from "react";
import { Heart, MessageCircle, Share2, Bookmark } from "lucide-react";

interface ArticleInteractionsProps {
  articleSlug: string;
  initialLikes?: number;
  initialComments?: number;
  initialIsLiked?: boolean;
  initialIsBookmarked?: boolean;
}

export default function ArticleInteractions({
  articleSlug,
  initialLikes = 0,
  initialComments = 0,
  initialIsLiked = false,
  initialIsBookmarked = false,
}: ArticleInteractionsProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [comments, setComments] = useState(initialComments);
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [isBookmarked, setIsBookmarked] = useState(initialIsBookmarked);
  const [isAnimating, setIsAnimating] = useState(false);

  // Load saved state from localStorage
  useEffect(() => {
    const savedLikes = localStorage.getItem(`likes-${articleSlug}`);
    const savedIsLiked = localStorage.getItem(`liked-${articleSlug}`);
    const savedIsBookmarked = localStorage.getItem(`bookmarked-${articleSlug}`);

    if (savedLikes) setLikes(parseInt(savedLikes));
    if (savedIsLiked === 'true') setIsLiked(true);
    if (savedIsBookmarked === 'true') setIsBookmarked(true);
  }, [articleSlug]);

  const handleLike = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    
    if (isLiked) {
      setLikes(prev => prev - 1);
      setIsLiked(false);
      localStorage.removeItem(`liked-${articleSlug}`);
      localStorage.setItem(`likes-${articleSlug}`, (likes - 1).toString());
    } else {
      setLikes(prev => prev + 1);
      setIsLiked(true);
      localStorage.setItem(`liked-${articleSlug}`, 'true');
      localStorage.setItem(`likes-${articleSlug}`, (likes + 1).toString());
    }

    setTimeout(() => setIsAnimating(false), 300);
  };

  const handleBookmark = () => {
    if (isBookmarked) {
      setIsBookmarked(false);
      localStorage.removeItem(`bookmarked-${articleSlug}`);
    } else {
      setIsBookmarked(true);
      localStorage.setItem(`bookmarked-${articleSlug}`, 'true');
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: document.title,
          url: window.location.href,
        });
      } catch (err) {
        // Fallback to clipboard
        navigator.clipboard.writeText(window.location.href);
      }
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const scrollToComments = () => {
    const commentsSection = document.getElementById('comments-section');
    if (commentsSection) {
      commentsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex items-center justify-center gap-8 py-8 border-t border-b border-zinc-200 dark:border-zinc-700 my-12">
      {/* Like Button */}
      <button
        onClick={handleLike}
        disabled={isAnimating}
        className={`group flex flex-col items-center gap-2 p-4 rounded-xl transition-all duration-200 hover:scale-105 ${
          isLiked 
            ? 'text-red-500 bg-red-50 dark:bg-red-950/20' 
            : 'text-zinc-500 hover:text-red-500 hover:bg-zinc-50 dark:hover:bg-zinc-800'
        }`}
        aria-label={isLiked ? 'Unlike article' : 'Like article'}
      >
        <Heart 
          className={`h-6 w-6 transition-all duration-200 ${
            isLiked 
              ? 'fill-current scale-110' 
              : 'group-hover:scale-110'
          } ${isAnimating ? 'animate-pulse' : ''}`} 
        />
        <span className="text-sm font-medium">{likes}</span>
      </button>

      {/* Comments Button */}
      <button
        onClick={scrollToComments}
        className="group flex flex-col items-center gap-2 p-4 rounded-xl text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all duration-200 hover:scale-105"
        aria-label="View comments"
      >
        <MessageCircle className="h-6 w-6 group-hover:scale-110 transition-transform duration-200" />
        <span className="text-sm font-medium">{comments}</span>
      </button>

      {/* Bookmark Button */}
      <button
        onClick={handleBookmark}
        className={`group flex flex-col items-center gap-2 p-4 rounded-xl transition-all duration-200 hover:scale-105 ${
          isBookmarked 
            ? 'text-amber-500 bg-amber-50 dark:bg-amber-950/20' 
            : 'text-zinc-500 hover:text-amber-500 hover:bg-zinc-50 dark:hover:bg-zinc-800'
        }`}
        aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark article'}
      >
        <Bookmark 
          className={`h-6 w-6 transition-all duration-200 ${
            isBookmarked 
              ? 'fill-current scale-110' 
              : 'group-hover:scale-110'
          }`} 
        />
        <span className="text-sm font-medium">Save</span>
      </button>

      {/* Share Button */}
      <button
        onClick={handleShare}
        className="group flex flex-col items-center gap-2 p-4 rounded-xl text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all duration-200 hover:scale-105"
        aria-label="Share article"
      >
        <Share2 className="h-6 w-6 group-hover:scale-110 transition-transform duration-200" />
        <span className="text-sm font-medium">Share</span>
      </button>
    </div>
  );
}
