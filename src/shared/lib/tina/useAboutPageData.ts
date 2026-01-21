import { client } from './client';
import { useGenericPage } from './useGenericPage';
import type { SupportedLang } from '@/shared/config/i18n';

// Stable constants
const RELATIVE_PATH = 'about.json';
const FALLBACK_PATH = '/content/pages/about.json';

// GraphQL query for about page (singleton with blocks)
const ABOUT_PAGE_QUERY = `
  query AboutPageQuery($relativePath: String!) {
    aboutPage(relativePath: $relativePath) {
      _sys { filename }
      title
      slug
      seo {
        title
        description
        ogImage
      }
      blocks {
        ... on AboutPageBlocksHero {
          __typename
          eyebrow
          title
          subtitle
          description
          primaryButton { text link variant }
          secondaryButton { text link variant }
          backgroundImage
          variant
        }
        ... on AboutPageBlocksContent {
          __typename
          eyebrow
          title
          body
          image
          imagePosition
        }
        ... on AboutPageBlocksStory {
          __typename
          title
          text1
          text2
          image
          highlights { text icon }
        }
        ... on AboutPageBlocksFeatures {
          __typename
          eyebrow
          title
          description
          items { icon title description }
          columns
        }
        ... on AboutPageBlocksEquipment {
          __typename
          icon
          title
          description
        }
        ... on AboutPageBlocksTeamGrid {
          __typename
          title
          description
          categories
          showEmail
        }
        ... on AboutPageBlocksJobsList {
          __typename
          title
          emptyMessage
        }
        ... on AboutPageBlocksForm {
          __typename
          title
          description
          formType
          submitButtonText
          successMessage
        }
        ... on AboutPageBlocksContactInfo {
          __typename
          title
          description
          address { company street city zip }
          phone
          fax
          email
          website
          officeHours { weekdays }
          repairHours { tueThu fri }
        }
        ... on AboutPageBlocksCta {
          __typename
          eyebrow
          title
          description
          button { text link variant }
          variant
        }
        ... on AboutPageBlocksFaq {
          __typename
          title
          description
          questions { question answer }
        }
      }
    }
  }
`;

export function useAboutPageData(_lang: SupportedLang) {
  const { data, isLoading, error } = useGenericPage({
    query: ABOUT_PAGE_QUERY,
    variables: { relativePath: RELATIVE_PATH },
    fallbackPath: FALLBACK_PATH,
    clientQuery: (vars) => client.queries.aboutPage(vars),
    transformFallback: (jsonData) => ({ aboutPage: jsonData }),
  });

  return { data, isLoading, error };
}
