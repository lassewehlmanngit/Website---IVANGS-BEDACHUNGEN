import { SupportedLang } from '@/shared/config/i18n';

export interface NavigationItem {
  label: string;
  href: string;
}

export interface NavigationData {
  items: NavigationItem[];
}

export interface SettingsData {
  siteName: string;
  siteDescription?: string;
  defaultOgImage?: string;
  gtmId?: string;
  umamiId?: string;
  umamiSrc?: string;
  sentryDsn?: string;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterSocial {
  platform: string;
  url: string;
}

export interface FooterData {
  copyright?: string;
  links: FooterLink[];
  social: FooterSocial[];
}

const settingsModules = import.meta.glob('../../../../content/globals/*/settings.json', {
  query: '?raw',
  import: 'default',
});

const navigationModules = import.meta.glob('../../../../content/globals/*/navigation.json', {
  query: '?raw',
  import: 'default',
});

const footerModules = import.meta.glob('../../../../content/globals/*/footer.json', {
  query: '?raw',
  import: 'default',
});

// Helper to extract language from path
const getLangFromPath = (path: string): string | null => {
  const match = path.match(/\/globals\/([^/]+)\//);
  return match ? match[1] : null;
};

export async function getSettings(lang: SupportedLang): Promise<SettingsData> {
  // Try to find module for specific lang
  let key = Object.keys(settingsModules).find((k) => getLangFromPath(k) === lang);
  
  // Fallback to English if not found
  if (!key) {
    key = Object.keys(settingsModules).find((k) => getLangFromPath(k) === 'en');
  }

  if (!key || !settingsModules[key]) {
    return { siteName: 'Ivangs Bedachungen' };
  }

  try {
    const raw = await settingsModules[key]();
    // raw might be a string (JSON) or an object depending on the glob import
    return typeof raw === 'string' ? JSON.parse(raw) : raw;
  } catch (e) {
    console.warn('Failed to load settings', e);
    return { siteName: 'Ivangs Bedachungen' };
  }
}

export async function getNavigation(lang: SupportedLang): Promise<NavigationData> {
  let key = Object.keys(navigationModules).find((k) => getLangFromPath(k) === lang);
  if (!key) {
    key = Object.keys(navigationModules).find((k) => getLangFromPath(k) === 'en');
  }

  if (!key || !navigationModules[key]) {
    return { items: [] };
  }

  try {
    const raw = await navigationModules[key]();
    return typeof raw === 'string' ? JSON.parse(raw) : raw;
  } catch (e) {
    console.warn('Failed to load navigation', e);
    return { items: [] };
  }
}

export async function getFooter(lang: SupportedLang): Promise<FooterData> {
  let key = Object.keys(footerModules).find((k) => getLangFromPath(k) === lang);
  if (!key) {
    key = Object.keys(footerModules).find((k) => getLangFromPath(k) === 'en');
  }

  if (!key || !footerModules[key]) {
    return { links: [], social: [] };
  }

  try {
    const raw = await footerModules[key]();
    return typeof raw === 'string' ? JSON.parse(raw) : raw;
  } catch (e) {
    console.warn('Failed to load footer', e);
    return { links: [], social: [] };
  }
}
