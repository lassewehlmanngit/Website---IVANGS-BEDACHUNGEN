import { client } from './client';
import { useGenericPage } from './useGenericPage';
import type { SupportedLang } from '@/shared/config/i18n';

// GraphQL query for page builder pages
const PAGE_QUERY = `
  query page($relativePath: String!) {
    page(relativePath: $relativePath) {
      _sys { filename }
      title
      slug
      seo {
        title
        description
        ogImage
      }
      blocks {
        ... on PageBlocksHero {
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
        ... on PageBlocksContent {
          __typename
          eyebrow
          title
          body
          image
          imagePosition
        }
        ... on PageBlocksStory {
          __typename
          title
          text1
          text2
          image
          highlights { text icon }
        }
        ... on PageBlocksFeatures {
          __typename
          eyebrow
          title
          description
          items { icon title description }
          columns
        }
        ... on PageBlocksEquipment {
          __typename
          icon
          title
          description
        }
        ... on PageBlocksTeamGrid {
          __typename
          title
          description
          categories
          showEmail
        }
        ... on PageBlocksJobsList {
          __typename
          title
          emptyMessage
        }
        ... on PageBlocksForm {
          __typename
          title
          description
          formType
          submitButtonText
          successMessage
        }
        ... on PageBlocksContactInfo {
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
        ... on PageBlocksCta {
          __typename
          eyebrow
          title
          description
          button { text link variant }
          variant
        }
        ... on PageBlocksFaq {
          __typename
          title
          description
          questions { question answer }
        }
      }
    }
  }
`;

export function usePageBuilderData(_lang: SupportedLang, slug: string) {
  const relativePath = `${slug}.json`;
  const fallbackPath = `/content/pages/${relativePath}`;

  const { data, isLoading, error } = useGenericPage({
    query: PAGE_QUERY,
    variables: { relativePath },
    fallbackPath,
    clientQuery: (vars) => client.queries.page(vars),
    transformFallback: (jsonData) => ({ page: jsonData }),
  });

  return { data, isLoading, error };
}
