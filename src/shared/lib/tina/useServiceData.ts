import { useTina } from 'tinacms/dist/react';

export function useServiceData(serviceId: string) {
  const relativePath = `${serviceId}.md`;

  return useTina({
    query: `
      query ServiceQuery($relativePath: String!) {
        service(relativePath: $relativePath) {
          title
          subtitle
          shortDescription
          intro
          heroImage
          image
          icon
          expertTip
          features
          benefits
          sections {
            title
            icon
            content
          }
          processSteps {
            step
            title
            text
          }
          referenceImages
          contactIds
          faq {
            question
            answer
          }
          gallery {
            image
            caption
          }
        }
      }
    `,
    variables: { relativePath },
    data: null,
  });
}
