import { useTina } from 'tinacms/dist/react';
import type { SupportedLang } from '@/shared/config/i18n';

export function useContactPageData(lang: SupportedLang) {
  const relativePath = 'kontakt.json';

  return useTina({
    query: `
      query ContactPageQuery($relativePath: String!) {
        contactPage(relativePath: $relativePath) {
          seo {
            title
            description
          }
          title
          description
          address {
            company
            street
            city
            zip
          }
          phone
          fax
          email
          website
          facebook
          officeHours {
            weekdays
          }
          repairHours {
            tueThu
            fri
          }
        }
      }
    `,
    variables: { relativePath },
    data: null,
  });
}
