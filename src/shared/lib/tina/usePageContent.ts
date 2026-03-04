import { client } from './client';
import { useTinaOptional } from './useTinaOptional';
import { useEffect, useState, useMemo, useRef } from 'react';
import defaultNavData from '@content/globals/navigation.json';
import defaultFooterData from '@content/globals/footer.json';
import defaultSettingsData from '@content/globals/settings.json';
import defaultHomeData from '@content/home/startseite.json';

/**
 * Page configuration mapping page keys to their Tina collection details
 */
interface PageConfig {
  collectionName: string;
  relativePath: string;
  contentPath: string;
  query: string;
}

const PAGE_CONFIGS: Record<string, PageConfig> = {
  home: {
    collectionName: 'homePage',
    relativePath: 'startseite.json',
    contentPath: '/content/home/startseite.json',
    query: `
      query homePage($relativePath: String!) {
        homePage(relativePath: $relativePath) {
          _sys { filename }
          seo { title description }
          hero {
            eyebrow title subtitle description
            buttons { primaryText primaryLink secondaryText secondaryLink }
            backgroundImage videoUrl showQuickForm
          }
          quickForm {
            title nameLabel contactLabel buttonText disclaimer
          }
          stats { value label icon }
          servicesSection {
            eyebrow title description
            services {
              title description image icon checkpoints ctaText link
            }
          }
          ceoQuote { eyebrow name role quote text image buttonText buttonLink }
          projectsSection {
            eyebrow title
            items { title description image }
          }
          trustIndicators {
            eyebrow title description image
            items { title description icon }
          }
          faqSection {
            title description
            questions { question answer }
            cta { title description phone buttonText buttonLink }
          }
          finalCTA { title description buttonText buttonLink }
        }
      }
    `,
  },
};

// Global content queries
const NAVIGATION_QUERY = `
  query navigation($relativePath: String!) {
    navigation(relativePath: $relativePath) {
      logo
      items { label href }
      ctaButton { text link }
    }
  }
`;

const FOOTER_QUERY = `
  query footer($relativePath: String!) {
    footer(relativePath: $relativePath) {
      copyright
      links { label href }
      social { platform url }
    }
  }
`;

const SETTINGS_QUERY = `
  query settings($relativePath: String!) {
    settings(relativePath: $relativePath) {
      _sys { filename }
      siteName
      siteDescription
      cookieBanner {
        message
        privacyLinkText
        cookieLinkText
        rejectButtonText
        acceptButtonText
      }
      notFoundPage {
        title
        description
        buttonText
      }
    }
  }
`;

// Global content cache pre-warmed with bundled defaults
const globalContentCache: {
  navigation: any | null;
  footer: any | null;
  settings: any | null;
  timestamp: number;
} = {
  navigation: defaultNavData,
  footer: defaultFooterData,
  settings: defaultSettingsData,
  timestamp: Date.now(),
};

// Page content cache pre-warmed for instant load
const pageContentCache: Record<string, { payload: TinaPayload; timestamp: number }> = {
  home: {
    payload: {
      data: { homePage: defaultHomeData },
      query: PAGE_CONFIGS.home.query,
      variables: { relativePath: 'startseite.json' },
    },
    timestamp: Date.now(),
  }
};

// Cache TTL: 5 minutes
const CACHE_TTL = 5 * 60 * 1000;

function isCacheValid(): boolean {
  return Date.now() - globalContentCache.timestamp < CACHE_TTL;
}

interface TinaPayload {
  data: any;
  query: string;
  variables: Record<string, any>;
}

interface GlobalData {
  navigation: any;
  footer: any;
  settings: any;
}

interface UsePageContentResult {
  page: any;
  global: GlobalData;
  isLoading: boolean;
}

/**
 * Centralized hook for loading page content and global settings.
 * 
 * This hook:
 * - Loads page-specific content based on pageKey
 * - Loads global content (navigation, footer, settings) with caching
 * - Integrates with TinaCMS for visual editing
 * 
 * @param pageKey - The page identifier ('home')
 * @returns { page, global, isLoading }
 */
export function usePageContent(pageKey: string): UsePageContentResult {
  const config = PAGE_CONFIGS[pageKey];

  if (!config) {
    console.error(`usePageContent: Unknown page key "${pageKey}". Use 'home' or switch to usePageBuilderData for block-based pages.`);
  }

  const cachedPage = pageContentCache[pageKey];
  const isPageCacheValid = cachedPage && (Date.now() - cachedPage.timestamp < CACHE_TTL);
  const isGlobalCacheValid = Boolean(isCacheValid() && globalContentCache.navigation && globalContentCache.footer && globalContentCache.settings);

  const [pagePayload, setPagePayload] = useState<TinaPayload | null>(isPageCacheValid ? cachedPage.payload : null);
  const [globalData, setGlobalData] = useState<GlobalData>({
    navigation: globalContentCache.navigation,
    footer: globalContentCache.footer,
    settings: globalContentCache.settings,
  });
  const [isLoading, setIsLoading] = useState(!(isPageCacheValid && isGlobalCacheValid));

  // Track if this is the initial mount
  const isMounted = useRef(true);

  // Default variables for page query
  const defaultVariables = useMemo(
    () => ({ relativePath: config?.relativePath || '' }),
    [config?.relativePath]
  );

  useEffect(() => {
    isMounted.current = true;
    if (!config) {
      setIsLoading(false);
      return;
    }

    if (isPageCacheValid && isGlobalCacheValid) {
      return;
    }

    const loadContent = async () => {
      // Load page data and global data in parallel
      const pagePromise = isPageCacheValid
        ? Promise.resolve(cachedPage.payload)
        : loadPageData(config).then(res => {
          pageContentCache[pageKey] = { payload: res, timestamp: Date.now() };
          return res;
        });

      const globalPromise = isGlobalCacheValid
        ? Promise.resolve({
          navigation: globalContentCache.navigation,
          footer: globalContentCache.footer,
          settings: globalContentCache.settings,
        })
        : loadGlobalData();

      const [pageResult, globalResult] = await Promise.all([pagePromise, globalPromise]);

      if (isMounted.current) {
        setPagePayload(pageResult);
        setGlobalData(globalResult as GlobalData);
        setIsLoading(false);
      }
    };

    loadContent();

    return () => {
      isMounted.current = false;
    };
  }, [pageKey, config, isPageCacheValid, isGlobalCacheValid]);

  // Memoize variables for stability
  const tinaVariables = useMemo(
    () => pagePayload?.variables || defaultVariables,
    [pagePayload?.variables, defaultVariables]
  );

  // Memoize page data for stability
  const tinaData = useMemo(
    () => pagePayload?.data || { [config?.collectionName || 'page']: null },
    [pagePayload?.data, config?.collectionName]
  );

  // Use Tina for visual editing
  const { data: tinaPageData } = useTinaOptional({
    query: pagePayload?.query || config?.query || '',
    variables: tinaVariables,
    data: tinaData,
  });

  // Extract page data from Tina response
  const page = config ? tinaPageData?.[config.collectionName] : null;

  return {
    page,
    global: globalData,
    isLoading,
  };
}

/**
 * Load page-specific data from TinaCMS or static files
 */
async function loadPageData(config: PageConfig): Promise<TinaPayload> {
  const { collectionName, relativePath, contentPath, query } = config;

  // Try TinaCMS client first
  if (client) {
    try {
      // Dynamically call the correct query based on collection name
      const queryFn = (client.queries as any)[collectionName];
      if (queryFn) {
        const response = await queryFn({ relativePath });
        return {
          data: response.data,
          query: response.query,
          variables: response.variables,
        };
      }
    } catch (error) {
      console.error(`Error fetching ${collectionName} from TinaCMS:`, error);
    }
  }

  // Fallback: Load from static JSON file
  try {
    const response = await fetch(contentPath);
    const jsonData = await response.json();
    return {
      data: { [collectionName]: jsonData },
      query,
      variables: { relativePath },
    };
  } catch (error) {
    console.error(`Error loading static ${collectionName} data:`, error);
    return {
      data: { [collectionName]: null },
      query,
      variables: { relativePath },
    };
  }
}

/**
 * Load global content (navigation, footer, settings) with caching
 */
async function loadGlobalData(): Promise<GlobalData> {
  // Return cached data if valid
  if (isCacheValid() && globalContentCache.navigation && globalContentCache.footer && globalContentCache.settings) {
    return {
      navigation: globalContentCache.navigation,
      footer: globalContentCache.footer,
      settings: globalContentCache.settings,
    };
  }

  // Load all global content in parallel
  const [navigation, footer, settings] = await Promise.all([
    loadNavigation(),
    loadFooter(),
    loadSettings(),
  ]);

  // Update cache
  globalContentCache.navigation = navigation;
  globalContentCache.footer = footer;
  globalContentCache.settings = settings;
  globalContentCache.timestamp = Date.now();

  return { navigation, footer, settings };
}

async function loadNavigation(): Promise<any> {
  if (client) {
    try {
      const response = await client.queries.navigation({ relativePath: 'navigation.json' });
      return response.data?.navigation;
    } catch (error) {
      console.error('Error fetching navigation from TinaCMS:', error);
    }
  }

  try {
    const response = await fetch('/content/globals/navigation.json');
    return await response.json();
  } catch (error) {
    console.error('Error loading static navigation data:', error);
    return { items: [] };
  }
}

async function loadFooter(): Promise<any> {
  if (client) {
    try {
      const response = await client.queries.footer({ relativePath: 'footer.json' });
      return response.data?.footer;
    } catch (error) {
      console.error('Error fetching footer from TinaCMS:', error);
    }
  }

  try {
    const response = await fetch('/content/globals/footer.json');
    return await response.json();
  } catch (error) {
    console.error('Error loading static footer data:', error);
    return { links: [], social: [] };
  }
}

async function loadSettings(): Promise<any> {
  if (client) {
    try {
      const response = await client.queries.settings({ relativePath: 'settings.json' });
      return response.data?.settings;
    } catch (error) {
      console.error('Error fetching settings from TinaCMS:', error);
    }
  }

  try {
    const response = await fetch('/content/globals/settings.json');
    return await response.json();
  } catch (error) {
    console.error('Error loading static settings data:', error);
    return null;
  }
}

/**
 * Export page configs for use in other modules (e.g., route mapping)
 */
export { PAGE_CONFIGS };
