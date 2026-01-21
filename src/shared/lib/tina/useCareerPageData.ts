import { client } from './client';
import { useGenericPage } from './useGenericPage';
import type { SupportedLang } from '@/shared/config/i18n';

// Stable constants
const RELATIVE_PATH = 'career.json';
const FALLBACK_PATH = '/content/pages/career.json';

// GraphQL query for career page (singleton with blocks)
const CAREER_PAGE_QUERY = `
  query CareerPageQuery($relativePath: String!) {
    careerPage(relativePath: $relativePath) {
      _sys { filename }
      title
      slug
      seo {
        title
        description
        ogImage
      }
      blocks {
        ... on CareerPageBlocksHero {
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
        ... on CareerPageBlocksContent {
          __typename
          eyebrow
          title
          body
          image
          imagePosition
        }
        ... on CareerPageBlocksStory {
          __typename
          title
          text1
          text2
          image
          highlights { text icon }
        }
        ... on CareerPageBlocksFeatures {
          __typename
          eyebrow
          title
          description
          items { icon title description }
          columns
        }
        ... on CareerPageBlocksEquipment {
          __typename
          icon
          title
          description
        }
        ... on CareerPageBlocksTeamGrid {
          __typename
          title
          description
          categories
          showEmail
        }
        ... on CareerPageBlocksJobsList {
          __typename
          title
          emptyMessage
        }
        ... on CareerPageBlocksForm {
          __typename
          title
          description
          formType
          submitButtonText
          successMessage
        }
        ... on CareerPageBlocksContactInfo {
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
        ... on CareerPageBlocksCta {
          __typename
          eyebrow
          title
          description
          button { text link variant }
          variant
        }
        ... on CareerPageBlocksFaq {
          __typename
          title
          description
          questions { question answer }
        }
      }
    }
  }
`;

export function useCareerPageData(_lang: SupportedLang) {
  const { data, isLoading, error } = useGenericPage({
    query: CAREER_PAGE_QUERY,
    variables: { relativePath: RELATIVE_PATH },
    fallbackPath: FALLBACK_PATH,
    clientQuery: (vars) => client.queries.careerPage(vars),
    transformFallback: (jsonData) => ({ careerPage: jsonData }),
  });

  return { data, isLoading, error };
}
