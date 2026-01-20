import { useTina } from 'tinacms/dist/react';
import type { SupportedLang } from '@/shared/config/i18n';

export function useAboutPageData(lang: SupportedLang) {
  const relativePath = 'ueber-uns.json';

  return useTina({
    query: `
      query AboutPageQuery($relativePath: String!) {
        aboutPage(relativePath: $relativePath) {
          seo {
            title
            description
          }
          hero {
            eyebrow
            title
            description
          }
          story {
            title
            text1
            text2
            image
          }
          values {
            text
          }
          equipment {
            title
            description
          }
          teamSection {
            title
            description
          }
          cta {
            title
            description
            buttonText
            email
          }
        }
      }
    `,
    variables: { relativePath },
    data: null,
  });
}
