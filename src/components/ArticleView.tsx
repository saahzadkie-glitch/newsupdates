import React, { useState, useEffect } from 'react';
import { Article, AdPlacement } from '../types';
import { AdBanner } from './AdBanner';
import { RelatedProducts } from './RelatedProducts';
import {
  Clock,
  Eye,
  Bookmark,
  Share2,
  Volume2,
  VolumeX,
  Sparkles,
  MessageSquare,
  ThumbsUp,
  ArrowLeft,
  Check,
  HelpCircle,
  Play,
  Pause,
  ChevronDown,
  ChevronUp,
  Twitter,
  Linkedin,
  Facebook,
  Copy,
  UserCheck
} from 'lucide-react';

interface ArticleViewProps {
  article: Article;
  allArticles: Article[];
  onSelectArticle: (article: Article) => void;
  onBack: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (articleId: string) => void;
  inArticleAd?: AdPlacement;
}

export const ArticleView: React.FC<ArticleViewProps> = ({
  article,
  allArticles,
  onSelectArticle,
  onBack,
  isBookmarked,
  onToggleBookmark,
  inArticleAd
}) => {
  const [readingProgress, setReadingProgress] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioLoading, setAudioLoading] = useState(false);
  const [audioObject, setAudioObject] = useState<HTMLAudioElement | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [likesCount, setLikesCount] = useState(article.likesCount || 12);
  const [hasLiked, setHasLiked] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [comments, setComments] = useState(article.comments || []);
  const [newCommentText, setNewCommentText] = useState('');
  const [newCommentName, setNewCommentName] = useState('');

  // Dynamic SEO document title and meta description for article
  useEffect(() => {
    const originalTitle = document.title;
    const metaDescriptionTag = document.querySelector('meta[name="description"]');
    const originalDescription = metaDescriptionTag ? metaDescriptionTag.getAttribute('content') : '';

    const ogTitleTag = document.querySelector('meta[property="og:title"]');
    const originalOgTitle = ogTitleTag ? ogTitleTag.getAttribute('content') : '';

    const ogDescTag = document.querySelector('meta[property="og:description"]');
    const originalOgDesc = ogDescTag ? ogDescTag.getAttribute('content') : '';

    const articleTitle = `${article.title} | NEWUPDATE - AI News & Intelligence`;
    const articleSummary = article.summary || article.excerpt || article.title;

    document.title = articleTitle;

    if (metaDescriptionTag) {
      metaDescriptionTag.setAttribute('content', articleSummary);
    }
    if (ogTitleTag) {
      ogTitleTag.setAttribute('content', article.title);
    }
    if (ogDescTag) {
      ogDescTag.setAttribute('content', articleSummary);
    }

    return () => {
      document.title = originalTitle;
      if (metaDescriptionTag && originalDescription !== null) {
        metaDescriptionTag.setAttribute('content', originalDescription);
      }
      if (ogTitleTag && originalOgTitle !== null) {
        ogTitleTag.setAttribute('content', originalOgTitle);
      }
      if (ogDescTag && originalOgDesc !== null) {
        ogDescTag.setAttribute('content', originalOgDesc);
      }
    };
  }, [article]);

  // Scroll Progress listener
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setReadingProgress(Math.min(100, Math.max(0, progress)));
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cleanup audio on unmount or article change
  useEffect(() => {
    return () => {
      if (audioObject) {
        audioObject.pause();
      }
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, [article.id]);

  const handleToggleAudio = async () => {
    if (isPlayingAudio) {
      if (audioObject) {
        audioObject.pause();
      }
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      setIsPlayingAudio(false);
      return;
    }

    setAudioLoading(true);

    try {
      const res = await fetch('/api/ai/tts-narration', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: `${article.title}. ${article.summary}` })
      });
      const data = await res.json();

      if (data.success && data.audioBase64) {
        const snd = new Audio(`data:audio/mp3;base64,${data.audioBase64}`);
        setAudioObject(snd);
        snd.play();
        setIsPlayingAudio(true);
        snd.onended = () => setIsPlayingAudio(false);
      } else {
        // Fallback to Web Speech API
        if ('speechSynthesis' in window) {
          window.speechSynthesis.cancel();
          const utterance = new SpeechSynthesisUtterance(`${article.title}. ${article.summary}`);
          utterance.rate = 1.0;
          utterance.onend = () => setIsPlayingAudio(false);
          utterance.onerror = () => setIsPlayingAudio(false);
          window.speechSynthesis.speak(utterance);
          setIsPlayingAudio(true);
        }
      }
    } catch (err) {
      console.error('Audio play error', err);
      // Fallback
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(`${article.title}. ${article.summary}`);
        window.speechSynthesis.speak(utterance);
        setIsPlayingAudio(true);
        utterance.onend = () => setIsPlayingAudio(false);
      }
    } finally {
      setAudioLoading(false);
    }
  };

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = encodeURIComponent(article.title);

    if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(url)}`, '_blank');
    } else if (platform === 'linkedin') {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
    } else if (platform === 'facebook') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
    } else if (platform === 'copy') {
      navigator.clipboard.writeText(url);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleLike = () => {
    if (!hasLiked) {
      setLikesCount(prev => prev + 1);
      setHasLiked(true);
    } else {
      setLikesCount(prev => prev - 1);
      setHasLiked(false);
    }
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const newComment = {
      id: 'c-' + Date.now(),
      author: newCommentName.trim() || 'News Reader',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80',
      content: newCommentText.trim(),
      timestamp: 'Just now',
      likes: 0
    };

    setComments([newComment, ...comments]);
    setNewCommentText('');
  };

  // Find related articles
  const related = allArticles
    .filter(a => a.id !== article.id && (a.category === article.category || a.tags.some(t => article.tags.includes(t))))
    .slice(0, 3);

  const formattedDate = new Date(article.publicationDate).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <article className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors pb-16">
      {/* Top Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 z-50 bg-slate-200 dark:bg-slate-800">
        <div
          className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-150"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Main Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 md:py-10 space-y-8">
        {/* Back Button & Category Breadcrumb */}
        <div className="flex items-center justify-between text-xs font-semibold">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 hover:underline transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Articles
          </button>

          <div className="flex items-center gap-2">
            <span className="text-slate-400">Section:</span>
            <span className="px-2.5 py-1 rounded-md bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-bold uppercase tracking-wider text-[11px]">
              {article.category}
            </span>
          </div>
        </div>

        {/* Title Header Block */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400 font-medium">
            <span>{formattedDate}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-indigo-500" /> {article.readingTime} min read
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Eye className="w-3.5 h-3.5 text-indigo-500" /> {article.viewCount.toLocaleString()} reads
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white font-serif leading-tight tracking-tight">
            {article.title}
          </h1>

          {article.subtitle && (
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
              {article.subtitle}
            </p>
          )}

          {/* Author & Audio Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-b border-slate-200 dark:border-slate-800 py-4">
            {/* Author info */}
            <div className="flex items-center gap-3">
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="w-11 h-11 rounded-full object-cover border-2 border-indigo-500/50 shadow-sm"
              />
              <div>
                <div className="flex items-center gap-1.5 font-bold text-sm text-slate-900 dark:text-white">
                  <span>{article.author.name}</span>
                  <UserCheck className="w-3.5 h-3.5 text-indigo-500" />
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">{article.author.role}</p>
              </div>
            </div>

            {/* Audio Voice Narration & Bookmark Button */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleToggleAudio}
                disabled={audioLoading}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm ${
                  isPlayingAudio
                    ? 'bg-red-600 text-white animate-pulse'
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                }`}
              >
                {audioLoading ? (
                  <Sparkles className="w-4 h-4 animate-spin" />
                ) : isPlayingAudio ? (
                  <Pause className="w-4 h-4 fill-white" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
                <span>{audioLoading ? 'Generating AI Voice...' : isPlayingAudio ? 'Pause Narration' : 'Listen with AI Voice'}</span>
              </button>

              <button
                onClick={() => onToggleBookmark(article.id)}
                className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900 transition text-slate-600 dark:text-slate-300"
                title="Bookmark article"
              >
                <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-indigo-600 text-indigo-600' : ''}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Featured Photograph */}
        <div className="space-y-2">
          <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-800 max-h-[480px]">
            <img
              src={article.featuredImage}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
          {article.imageCaption && (
            <p className="text-xs text-slate-500 dark:text-slate-400 text-center italic">
              {article.imageCaption}
            </p>
          )}
        </div>

        {/* AI Executive Summary Card */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-50/80 via-purple-50/50 to-indigo-50/80 dark:from-indigo-950/40 dark:via-purple-950/30 dark:to-indigo-950/40 border border-indigo-200/80 dark:border-indigo-800/60 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-300 font-bold text-sm">
              <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>AI Executive Summary (TL;DR)</span>
            </div>
            <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-indigo-200/70 dark:bg-indigo-900/80 text-indigo-800 dark:text-indigo-200 font-extrabold">
              Gemini 3.6 Flash
            </span>
          </div>
          <p className="text-sm md:text-base text-slate-700 dark:text-slate-200 font-medium leading-relaxed">
            {article.summary}
          </p>
        </div>

        {/* Article Body Content */}
        <div className="prose dark:prose-invert max-w-none text-slate-800 dark:text-slate-200 text-base md:text-lg leading-relaxed space-y-6">
          {article.body.split('\n\n').map((paragraph, idx) => {
            if (paragraph.startsWith('### ')) {
              return (
                <h3 key={idx} className="text-xl md:text-2xl font-extrabold text-slate-900 dark:text-white pt-4 font-serif">
                  {paragraph.replace('### ', '')}
                </h3>
              );
            }
            if (paragraph.startsWith('> ')) {
              return (
                <blockquote key={idx} className="border-l-4 border-indigo-600 dark:border-indigo-400 pl-4 py-2 my-4 italic text-slate-700 dark:text-slate-300 bg-indigo-50/40 dark:bg-indigo-950/20 rounded-r-lg">
                  {paragraph.replace('> ', '')}
                </blockquote>
              );
            }
            if (paragraph.startsWith('* ')) {
              const items = paragraph.split('\n');
              return (
                <ul key={idx} className="list-disc pl-6 space-y-2">
                  {items.map((item, i) => (
                    <li key={i}>{item.replace('* ', '')}</li>
                  ))}
                </ul>
              );
            }
            return <p key={idx}>{paragraph}</p>;
          })}
        </div>

        {/* In-Article Advertisement Slot */}
        {inArticleAd && <AdBanner placement={inArticleAd} />}

        {/* Amazon Related Affiliate Products */}
        <RelatedProducts category={article.category} relatedProducts={article.relatedProducts} />

        {/* AI FAQs Section */}
        {article.faqs && article.faqs.length > 0 && (
          <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2 font-serif">
              <HelpCircle className="w-5 h-5 text-indigo-500" />
              Frequently Asked Questions (AI Generated)
            </h3>
            <div className="space-y-3">
              {article.faqs.map((faq, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div
                    key={index}
                    className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden transition"
                  >
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                      className="w-full p-4 text-left font-semibold text-sm flex items-center justify-between bg-slate-50/80 dark:bg-slate-900/60 hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-900 dark:text-white"
                    >
                      <span>{faq.question}</span>
                      {isOpen ? <ChevronUp className="w-4 h-4 text-indigo-500" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                    </button>
                    {isOpen && (
                      <div className="p-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 leading-relaxed">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tags */}
        <div className="pt-4 flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-slate-400 mr-2">Topics:</span>
          {article.tags.map(tag => (
            <span
              key={tag}
              className="px-3 py-1 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Social Sharing & Like Bar */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={handleLike}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
                hasLiked
                  ? 'bg-rose-600 text-white'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-100'
              }`}
            >
              <ThumbsUp className={`w-4 h-4 ${hasLiked ? 'fill-white' : ''}`} />
              <span>{likesCount} Applaud</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-medium mr-1">Share:</span>
            <button
              onClick={() => handleShare('twitter')}
              className="p-2 rounded-lg bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-sky-50 dark:hover:bg-sky-950 hover:text-sky-500 transition border border-slate-200 dark:border-slate-700"
              title="Share on X (Twitter)"
            >
              <Twitter className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleShare('linkedin')}
              className="p-2 rounded-lg bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-blue-950 hover:text-blue-600 transition border border-slate-200 dark:border-slate-700"
              title="Share on LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleShare('facebook')}
              className="p-2 rounded-lg bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-950 hover:text-indigo-600 transition border border-slate-200 dark:border-slate-700"
              title="Share on Facebook"
            >
              <Facebook className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleShare('copy')}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition border border-slate-200 dark:border-slate-700 text-xs font-semibold"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              <span>{copiedLink ? 'Link Copied!' : 'Copy Link'}</span>
            </button>
          </div>
        </div>

        {/* Comments Section */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 space-y-6">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2 font-serif">
            <MessageSquare className="w-5 h-5 text-indigo-500" />
            Discussion ({comments.length})
          </h3>

          {/* Comment Form */}
          <form onSubmit={handleAddComment} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
            <input
              type="text"
              placeholder="Your Name (optional)"
              value={newCommentName}
              onChange={e => setNewCommentName(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
            />
            <textarea
              rows={3}
              placeholder="Share your perspective on this news story..."
              value={newCommentText}
              onChange={e => setNewCommentText(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 resize-none"
            />
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition shadow-sm"
              >
                Post Comment
              </button>
            </div>
          </form>

          {/* Comment List */}
          <div className="space-y-4">
            {comments.map(c => (
              <div key={c.id} className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img src={c.avatar} alt={c.author} className="w-7 h-7 rounded-full object-cover" />
                    <span className="font-bold text-xs text-slate-900 dark:text-white">{c.author}</span>
                  </div>
                  <span className="text-[11px] text-slate-400">{c.timestamp}</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {c.content}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Related Articles */}
        {related.length > 0 && (
          <div className="pt-8 border-t border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white font-serif">
              Related News Stories
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {related.map(r => (
                <div
                  key={r.id}
                  onClick={() => onSelectArticle(r)}
                  className="group bg-slate-50 dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-indigo-500 transition cursor-pointer"
                >
                  <img src={r.featuredImage} alt={r.title} className="w-full h-28 rounded-lg object-cover mb-2" />
                  <span className="text-[10px] font-bold uppercase text-indigo-500">{r.category}</span>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-2 mt-1 group-hover:text-indigo-400 font-serif">
                    {r.title}
                  </h4>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Amazon Affiliate Disclosure */}
        <p className="text-center text-xs text-slate-500 dark:text-slate-400 pt-6 border-t border-slate-200 dark:border-slate-800 italic font-medium">
          As an Amazon Associate, I earn from qualifying purchases.
        </p>
      </div>
    </article>
  );
};
