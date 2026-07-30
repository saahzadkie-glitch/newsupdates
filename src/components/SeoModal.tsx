import React, { useState } from 'react';
import { Article } from '../types';
import { X, Search, Share2, Code, FileText, Check, Copy, ExternalLink, Globe } from 'lucide-react';

interface SeoModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentArticle?: Article;
}

export const SeoModal: React.FC<SeoModalProps> = ({ isOpen, onClose, currentArticle }) => {
  const [activeTab, setActiveTab] = useState<'preview' | 'schema' | 'sitemap' | 'robots'>('preview');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const siteUrl = window.location.origin;
  const title = currentArticle ? currentArticle.metaTitle : 'PulseAI - Autonomous News & Blogging Engine';
  const description = currentArticle
    ? currentArticle.metaDescription
    : 'Latest AI-curated breaking news from around the world across Tech, Science, Crypto, and Business.';
  const image = currentArticle
    ? currentArticle.featuredImage
    : 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80';
  const url = currentArticle ? `${siteUrl}/article/${currentArticle.slug}` : siteUrl;

  // Generate Schema.org JSON-LD
  const schemaJson = currentArticle
    ? {
        '@context': 'https://schema.org',
        '@type': 'NewsArticle',
        headline: currentArticle.title,
        description: currentArticle.summary,
        image: [currentArticle.featuredImage],
        datePublished: currentArticle.publicationDate,
        dateModified: currentArticle.updatedAt || currentArticle.publicationDate,
        author: {
          '@type': 'Person',
          name: currentArticle.author.name
        },
        publisher: {
          '@type': 'Organization',
          name: 'PulseAI News Platform',
          logo: {
            '@type': 'ImageObject',
            url: `${siteUrl}/logo.png`
          }
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': url
        }
      }
    : {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'PulseAI News',
        url: siteUrl
      };

  const schemaString = JSON.stringify(schemaJson, null, 2);

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>hourly</changefreq>
    <priority>1.0</priority>
  </url>
  ${
    currentArticle
      ? `
  <url>
    <loc>${url}</loc>
    <lastmod>${new Date(currentArticle.publicationDate).toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>`
      : ''
  }
</urlset>`;

  const robotsTxt = `User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/

Sitemap: ${siteUrl}/sitemap.xml`;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950">
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-indigo-500" />
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              SEO Engine & Metadata Inspector
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 bg-slate-100/70 dark:bg-slate-900 px-4 gap-2 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('preview')}
            className={`py-3 px-3 border-b-2 flex items-center gap-1.5 transition ${
              activeTab === 'preview'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Search className="w-3.5 h-3.5" /> Google & Social Snippets
          </button>
          <button
            onClick={() => setActiveTab('schema')}
            className={`py-3 px-3 border-b-2 flex items-center gap-1.5 transition ${
              activeTab === 'schema'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Code className="w-3.5 h-3.5" /> Schema.org (JSON-LD)
          </button>
          <button
            onClick={() => setActiveTab('sitemap')}
            className={`py-3 px-3 border-b-2 flex items-center gap-1.5 transition ${
              activeTab === 'sitemap'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5" /> XML Sitemap
          </button>
          <button
            onClick={() => setActiveTab('robots')}
            className={`py-3 px-3 border-b-2 flex items-center gap-1.5 transition ${
              activeTab === 'robots'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5" /> Robots.txt
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {activeTab === 'preview' && (
            <div className="space-y-6">
              {/* Google Search Card Preview */}
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Google Search Result Preview
                </span>
                <div className="p-4 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
                  <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 truncate">
                    <span>{siteUrl}</span>
                    <span>› article</span>
                  </div>
                  <div className="text-base font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer truncate font-serif">
                    {title}
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                    {description}
                  </p>
                </div>
              </div>

              {/* Open Graph Facebook Card Preview */}
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Open Graph (Facebook / LinkedIn / Slack) Card
                </span>
                <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
                  <img src={image} alt="OG Card" className="w-full h-44 object-cover" />
                  <div className="p-3 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 space-y-1">
                    <div className="text-[10px] uppercase font-mono text-slate-400">{siteUrl.replace('https://', '')}</div>
                    <div className="text-sm font-bold text-slate-900 dark:text-white truncate">{title}</div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">{description}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'schema' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400">JSON-LD Structured Data</span>
                <button
                  onClick={() => handleCopy(schemaString)}
                  className="flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy JSON'}</span>
                </button>
              </div>
              <pre className="p-4 rounded-xl bg-slate-950 text-emerald-400 text-xs font-mono overflow-x-auto border border-slate-800">
                {schemaString}
              </pre>
            </div>
          )}

          {activeTab === 'sitemap' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400">XML Sitemap (/sitemap.xml)</span>
                <button
                  onClick={() => handleCopy(sitemapXml)}
                  className="flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy XML'}</span>
                </button>
              </div>
              <pre className="p-4 rounded-xl bg-slate-950 text-indigo-300 text-xs font-mono overflow-x-auto border border-slate-800">
                {sitemapXml}
              </pre>
            </div>
          )}

          {activeTab === 'robots' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400">Robots.txt Rules</span>
                <button
                  onClick={() => handleCopy(robotsTxt)}
                  className="flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy Text'}</span>
                </button>
              </div>
              <pre className="p-4 rounded-xl bg-slate-950 text-amber-300 text-xs font-mono overflow-x-auto border border-slate-800">
                {robotsTxt}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
