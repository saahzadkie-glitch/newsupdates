import { Article, Category, AdPlacement, AutoPublisherSettings, PublishingLog, NewsletterSubscriber } from '../types';
import { INITIAL_ARTICLES, INITIAL_CATEGORIES, INITIAL_ADS, INITIAL_SETTINGS, INITIAL_LOGS } from '../data/initialData';

const KEYS = {
  ARTICLES: 'pulseai_articles_v1',
  CATEGORIES: 'pulseai_categories_v1',
  ADS: 'pulseai_ads_v1',
  SETTINGS: 'pulseai_settings_v1',
  LOGS: 'pulseai_logs_v1',
  SUBSCRIBERS: 'pulseai_subscribers_v1',
  BOOKMARKS: 'pulseai_bookmarks_v1',
  HISTORY: 'pulseai_history_v1',
  LIKES: 'pulseai_likes_v1'
};

export class StorageService {
  static getArticles(): Article[] {
    try {
      const data = localStorage.getItem(KEYS.ARTICLES);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.error('Error loading articles', e);
    }
    this.saveArticles(INITIAL_ARTICLES);
    return INITIAL_ARTICLES;
  }

  static saveArticles(articles: Article[]): void {
    try {
      localStorage.setItem(KEYS.ARTICLES, JSON.stringify(articles));
    } catch (e) {
      console.error('Error saving articles', e);
    }
  }

  static addArticle(article: Article): Article[] {
    const current = this.getArticles();
    const updated = [article, ...current];
    this.saveArticles(updated);
    return updated;
  }

  static updateArticle(updatedArticle: Article): Article[] {
    const current = this.getArticles();
    const updated = current.map(a => a.id === updatedArticle.id ? updatedArticle : a);
    this.saveArticles(updated);
    return updated;
  }

  static deleteArticle(id: string): Article[] {
    const current = this.getArticles();
    const updated = current.filter(a => a.id !== id);
    this.saveArticles(updated);
    return updated;
  }

  static getCategories(): Category[] {
    try {
      const data = localStorage.getItem(KEYS.CATEGORIES);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.error('Error loading categories', e);
    }
    this.saveCategories(INITIAL_CATEGORIES);
    return INITIAL_CATEGORIES;
  }

  static saveCategories(categories: Category[]): void {
    try {
      localStorage.setItem(KEYS.CATEGORIES, JSON.stringify(categories));
    } catch (e) {
      console.error('Error saving categories', e);
    }
  }

  static getAds(): AdPlacement[] {
    try {
      const data = localStorage.getItem(KEYS.ADS);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.error('Error loading ads', e);
    }
    this.saveAds(INITIAL_ADS);
    return INITIAL_ADS;
  }

  static saveAds(ads: AdPlacement[]): void {
    try {
      localStorage.setItem(KEYS.ADS, JSON.stringify(ads));
    } catch (e) {
      console.error('Error saving ads', e);
    }
  }

  static getSettings(): AutoPublisherSettings {
    try {
      const data = localStorage.getItem(KEYS.SETTINGS);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.error('Error loading settings', e);
    }
    this.saveSettings(INITIAL_SETTINGS);
    return INITIAL_SETTINGS;
  }

  static saveSettings(settings: AutoPublisherSettings): void {
    try {
      localStorage.setItem(KEYS.SETTINGS, JSON.stringify(settings));
    } catch (e) {
      console.error('Error saving settings', e);
    }
  }

  static getLogs(): PublishingLog[] {
    try {
      const data = localStorage.getItem(KEYS.LOGS);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.error('Error loading logs', e);
    }
    this.saveLogs(INITIAL_LOGS);
    return INITIAL_LOGS;
  }

  static saveLogs(logs: PublishingLog[]): void {
    try {
      localStorage.setItem(KEYS.LOGS, JSON.stringify(logs));
    } catch (e) {
      console.error('Error saving logs', e);
    }
  }

  static addLog(log: Omit<PublishingLog, 'id'>): PublishingLog[] {
    const current = this.getLogs();
    const newEntry: PublishingLog = {
      ...log,
      id: 'log-' + Date.now()
    };
    const updated = [newEntry, ...current].slice(0, 50); // keep last 50 logs
    this.saveLogs(updated);
    return updated;
  }

  static getSubscribers(): NewsletterSubscriber[] {
    try {
      const data = localStorage.getItem(KEYS.SUBSCRIBERS);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.error('Error loading subscribers', e);
    }
    const defaults: NewsletterSubscriber[] = [
      { id: 'sub-1', email: 'alex.dev@techcorp.io', subscribedAt: new Date(Date.now() - 86400000 * 3).toISOString(), categories: ['technology', 'ai'], status: 'active' },
      { id: 'sub-2', email: 'investor.sarah@capital.com', subscribedAt: new Date(Date.now() - 86400000 * 5).toISOString(), categories: ['finance', 'business', 'cryptocurrency'], status: 'active' }
    ];
    localStorage.setItem(KEYS.SUBSCRIBERS, JSON.stringify(defaults));
    return defaults;
  }

  static addSubscriber(email: string, categories: string[]): NewsletterSubscriber[] {
    const current = this.getSubscribers();
    if (current.some(s => s.email.toLowerCase() === email.toLowerCase())) {
      return current;
    }
    const newSub: NewsletterSubscriber = {
      id: 'sub-' + Date.now(),
      email,
      subscribedAt: new Date().toISOString(),
      categories: categories as any,
      status: 'active'
    };
    const updated = [newSub, ...current];
    try {
      localStorage.setItem(KEYS.SUBSCRIBERS, JSON.stringify(updated));
    } catch (e) {}
    return updated;
  }

  static getBookmarks(): string[] {
    try {
      const data = localStorage.getItem(KEYS.BOOKMARKS);
      if (data) return JSON.parse(data);
    } catch (e) {}
    return [];
  }

  static toggleBookmark(articleId: string): string[] {
    const bookmarks = this.getBookmarks();
    const exists = bookmarks.includes(articleId);
    const updated = exists ? bookmarks.filter(id => id !== articleId) : [...bookmarks, articleId];
    localStorage.setItem(KEYS.BOOKMARKS, JSON.stringify(updated));
    return updated;
  }

  static getHistory(): string[] {
    try {
      const data = localStorage.getItem(KEYS.HISTORY);
      if (data) return JSON.parse(data);
    } catch (e) {}
    return [];
  }

  static addToHistory(articleId: string): string[] {
    const history = this.getHistory().filter(id => id !== articleId);
    const updated = [articleId, ...history].slice(0, 30);
    localStorage.setItem(KEYS.HISTORY, JSON.stringify(updated));
    return updated;
  }
}
