"use client";

import { useState, useEffect } from "react";
import { Send, User, Calendar, Heart, Reply } from "lucide-react";

interface Comment {
  id: string;
  author: string;
  avatar?: string;
  content: string;
  timestamp: string;
  likes: number;
  isLiked: boolean;
  replies?: Comment[];
}

interface CommentSectionProps {
  articleSlug: string;
}

export default function CommentSection({ articleSlug }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showReplyForm, setShowReplyForm] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");

  // Load comments from localStorage
  useEffect(() => {
    const savedComments = localStorage.getItem(`comments-${articleSlug}`);
    if (savedComments) {
      setComments(JSON.parse(savedComments));
    }
  }, [articleSlug]);

  // Save comments to localStorage
  const saveComments = (updatedComments: Comment[]) => {
    localStorage.setItem(`comments-${articleSlug}`, JSON.stringify(updatedComments));
    setComments(updatedComments);
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || isSubmitting) return;

    setIsSubmitting(true);

    const comment: Comment = {
      id: Date.now().toString(),
      author: "Anonymous Reader",
      content: newComment.trim(),
      timestamp: new Date().toISOString(),
      likes: 0,
      isLiked: false,
      replies: [],
    };

    const updatedComments = [...comments, comment];
    saveComments(updatedComments);
    setNewComment("");
    setIsSubmitting(false);
  };

  const handleSubmitReply = async (parentId: string, e: React.FormEvent) => {
    e.preventDefault();
    if (!replyContent.trim() || isSubmitting) return;

    setIsSubmitting(true);

    const reply: Comment = {
      id: Date.now().toString(),
      author: "Anonymous Reader",
      content: replyContent.trim(),
      timestamp: new Date().toISOString(),
      likes: 0,
      isLiked: false,
    };

    const updatedComments = comments.map(comment => {
      if (comment.id === parentId) {
        return {
          ...comment,
          replies: [...(comment.replies || []), reply],
        };
      }
      return comment;
    });

    saveComments(updatedComments);
    setReplyContent("");
    setShowReplyForm(null);
    setIsSubmitting(false);
  };

  const handleLikeComment = (commentId: string, isReply: boolean = false, parentId?: string) => {
    const updatedComments = comments.map(comment => {
      if (isReply && parentId === comment.id) {
        return {
          ...comment,
          replies: comment.replies?.map(reply => 
            reply.id === commentId 
              ? {
                  ...reply,
                  isLiked: !reply.isLiked,
                  likes: reply.isLiked ? reply.likes - 1 : reply.likes + 1,
                }
              : reply
          ),
        };
      } else if (!isReply && comment.id === commentId) {
        return {
          ...comment,
          isLiked: !comment.isLiked,
          likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
        };
      }
      return comment;
    });

    saveComments(updatedComments);
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <section id="comments-section" className="max-w-3xl mx-auto mt-16">
      <div className="border-t border-zinc-200 dark:border-zinc-700 pt-12">
        <h2 className="font-serif text-3xl text-zinc-900 dark:text-zinc-100 mb-8">
          Reader Comments
        </h2>

        {/* Comment Form */}
        <form onSubmit={handleSubmitComment} className="mb-12">
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="h-12 w-12 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center">
                <User className="h-6 w-6 text-zinc-500" />
              </div>
            </div>
            <div className="flex-1">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Share your thoughts on this article..."
                className="w-full p-4 border border-zinc-300 dark:border-zinc-600 rounded-xl bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 resize-none"
                rows={4}
                disabled={isSubmitting}
              />
              <div className="flex justify-end mt-3">
                <button
                  type="submit"
                  disabled={!newComment.trim() || isSubmitting}
                  className="flex items-center gap-2 px-6 py-2 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105"
                >
                  <Send className="h-4 w-4" />
                  {isSubmitting ? "Posting..." : "Post Comment"}
                </button>
              </div>
            </div>
          </div>
        </form>

        {/* Comments List */}
        <div className="space-y-8">
          {comments.length === 0 ? (
            <div className="text-center py-12">
              <MessageCircle className="h-12 w-12 text-zinc-300 dark:text-zinc-600 mx-auto mb-4" />
              <p className="text-zinc-500 dark:text-zinc-400">
                No comments yet. Be the first to share your thoughts!
              </p>
            </div>
          ) : (
            comments.map((comment) => (
              <div key={comment.id} className="space-y-4">
                {/* Main Comment */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center">
                      <User className="h-5 w-5 text-zinc-500" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-medium text-zinc-900 dark:text-zinc-100">
                          {comment.author}
                        </span>
                        <span className="text-xs text-zinc-400 flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatTimestamp(comment.timestamp)}
                        </span>
                      </div>
                      <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                        {comment.content}
                      </p>
                    </div>
                    <div className="flex items-center gap-4 mt-3">
                      <button
                        onClick={() => handleLikeComment(comment.id)}
                        className={`flex items-center gap-1 text-sm transition-colors duration-200 ${
                          comment.isLiked 
                            ? 'text-red-500' 
                            : 'text-zinc-500 hover:text-red-500'
                        }`}
                      >
                        <Heart className={`h-4 w-4 ${comment.isLiked ? 'fill-current' : ''}`} />
                        {comment.likes}
                      </button>
                      <button
                        onClick={() => setShowReplyForm(showReplyForm === comment.id ? null : comment.id)}
                        className="flex items-center gap-1 text-sm text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors duration-200"
                      >
                        <Reply className="h-4 w-4" />
                        Reply
                      </button>
                    </div>

                    {/* Reply Form */}
                    {showReplyForm === comment.id && (
                      <form 
                        onSubmit={(e) => handleSubmitReply(comment.id, e)}
                        className="mt-4 ml-4"
                      >
                        <div className="flex gap-3">
                          <div className="h-8 w-8 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center flex-shrink-0">
                            <User className="h-4 w-4 text-zinc-500" />
                          </div>
                          <div className="flex-1">
                            <textarea
                              value={replyContent}
                              onChange={(e) => setReplyContent(e.target.value)}
                              placeholder="Write a reply..."
                              className="w-full p-3 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 resize-none"
                              rows={2}
                              disabled={isSubmitting}
                            />
                            <div className="flex justify-end mt-2">
                              <button
                                type="submit"
                                disabled={!replyContent.trim() || isSubmitting}
                                className="px-4 py-1 text-sm bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                              >
                                {isSubmitting ? "Posting..." : "Reply"}
                              </button>
                            </div>
                          </div>
                        </div>
                      </form>
                    )}

                    {/* Replies */}
                    {comment.replies && comment.replies.length > 0 && (
                      <div className="ml-4 mt-4 space-y-3">
                        {comment.replies.map((reply) => (
                          <div key={reply.id} className="flex gap-3">
                            <div className="h-8 w-8 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center flex-shrink-0">
                              <User className="h-4 w-4 text-zinc-500" />
                            </div>
                            <div className="flex-1">
                              <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-3">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="font-medium text-sm text-zinc-900 dark:text-zinc-100">
                                    {reply.author}
                                  </span>
                                  <span className="text-xs text-zinc-400 flex items-center gap-1">
                                    <Calendar className="h-3 w-3" />
                                    {formatTimestamp(reply.timestamp)}
                                  </span>
                                </div>
                                <p className="text-sm text-zinc-700 dark:text-zinc-300">
                                  {reply.content}
                                </p>
                              </div>
                              <button
                                onClick={() => handleLikeComment(reply.id, true, comment.id)}
                                className={`flex items-center gap-1 text-xs mt-1 transition-colors duration-200 ${
                                  reply.isLiked 
                                    ? 'text-red-500' 
                                    : 'text-zinc-500 hover:text-red-500'
                                }`}
                              >
                                <Heart className={`h-3 w-3 ${reply.isLiked ? 'fill-current' : ''}`} />
                                {reply.likes}
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
