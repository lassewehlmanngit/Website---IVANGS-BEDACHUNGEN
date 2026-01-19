import type { SupportedLang } from '@/shared/config/i18n';

export interface HeroSettings {
  mediaType: 'video' | 'image';
  backgroundImage?: string;
  videoUrl?: string;
  showQuickForm?: boolean;
}

export interface SettingsData {
  siteName: string;
  siteDescription?: string;
  favicon?: string;
  logo?: string;
  defaultOgImage?: string;
  gtmId?: string;
  gaId?: string;
  umamiId?: string;
  umamiSrc?: string;
  sentryDsn?: string;
  hero?: HeroSettings;
}

export interface NavigationItem {
  label: string;
  href: string;
}

export interface NavigationData {
  logo?: string;
  items: NavigationItem[];
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface SocialLink {
  platform: string;
  url: string;
}

export interface FooterData {
  copyright?: string;
  links: FooterLink[];
  social: SocialLink[];
}

/**
 * Fetch settings data for a given language
 */
export async function getSettings(lang: SupportedLang): Promise<SettingsData> {
  try {
    const data = await import(`../../../../content/globals/${lang}/settings.json`);
    return (data.default || data) as SettingsData;
  } catch {
    // Fallback to German if language file not found
    const data = await import(`../../../../content/globals/de/settings.json`);
    return (data.default || data) as SettingsData;
  }
}

/**
 * Fetch navigation data for a given language
 */
export async function getNavigation(lang: SupportedLang): Promise<NavigationData> {
  try {
    const data = await import(`../../../../content/globals/${lang}/navigation.json`);
    return data.default || data;
  } catch {
    // Fallback to German if language file not found
    const data = await import(`../../../../content/globals/de/navigation.json`);
    return data.default || data;
  }
}

/**
 * Fetch footer data for a given language
 */
export async function getFooter(lang: SupportedLang): Promise<FooterData> {
  try {
    const data = await import(`../../../../content/globals/${lang}/footer.json`);
    return data.default || data;
  } catch {
    // Fallback to German if language file not found
    const data = await import(`../../../../content/globals/de/footer.json`);
    return data.default || data;
  }
}
