import { client } from './client';
import { useGenericPage } from './useGenericPage';
import type { SupportedLang } from '@/shared/config/i18n';

// Stable constants
const RELATIVE_PATH = 'contact.json';
const FALLBACK_PATH = '/content/pages/contact.json';

// GraphQL query for contact builder page (singleton with blocks)
const CONTACT_BUILDER_PAGE_QUERY = `
  query ContactBuilderPageQuery($relativePath: String!) {
    contactBuilderPage(relativePath: $relativePath) {
      _sys { filename }
      title
      slug
      seo {
        title
        description
        ogImage
      }
      blocks {
        ... on ContactBuilderPageBlocksHero {
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
        ... on ContactBuilderPageBlocksContent {
          __typename
          eyebrow
          title
          body
          image
          imagePosition
        }
        ... on ContactBuilderPageBlocksStory {
          __typename
          title
          text1
          text2
          image
          highlights { text icon }
        }
        ... on ContactBuilderPageBlocksFeatures {
          __typename
          eyebrow
          title
          description
          items { icon title description }
          columns
        }
        ... on ContactBuilderPageBlocksEquipment {
          __typename
          icon
          title
          description
        }
        ... on ContactBuilderPageBlocksTeamGrid {
          __typename
          title
          description
          categories
          showEmail
        }
        ... on ContactBuilderPageBlocksJobsList {
          __typename
          title
          emptyMessage
        }
        ... on ContactBuilderPageBlocksForm {
          __typename
          title
          description
          formType
          submitButtonText
          successMessage
        }
        ... on ContactBuilderPageBlocksContactInfo {
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
        ... on ContactBuilderPageBlocksCta {
          __typename
          eyebrow
          title
          description
          button { text link variant }
          variant
        }
        ... on ContactBuilderPageBlocksFaq {
          __typename
          title
          description
          questions { question answer }
        }
      }
    }
  }
`;

export function useContactBuilderPageData(_lang: SupportedLang) {
  const { data, isLoading, error } = useGenericPage({
    query: CONTACT_BUILDER_PAGE_QUERY,
    variables: { relativePath: RELATIVE_PATH },
    fallbackPath: FALLBACK_PATH,
    clientQuery: (vars) => client.queries.contactBuilderPage(vars),
    transformFallback: (jsonData) => ({ contactBuilderPage: jsonData }),
  });

  return { data, isLoading, error };
}
