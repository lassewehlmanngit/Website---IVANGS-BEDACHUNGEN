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
 * Note: Currently content is not localized, so we load from the root globals folder
 */
export async function getSettings(_lang: SupportedLang): Promise<SettingsData> {
  const data = await import(`../../../../content/globals/settings.json`);
  return (data.default || data) as SettingsData;
}

/**
 * Fetch navigation data for a given language
 * Note: Currently content is not localized, so we load from the root globals folder
 */
export async function getNavigation(_lang: SupportedLang): Promise<NavigationData> {
  const data = await import(`../../../../content/globals/navigation.json`);
  return data.default || data;
}

/**
 * Fetch footer data for a given language
 * Note: Currently content is not localized, so we load from the root globals folder
 */
export async function getFooter(_lang: SupportedLang): Promise<FooterData> {
  const data = await import(`../../../../content/globals/footer.json`);
  return data.default || data;
}
