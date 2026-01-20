import { useTina } from 'tinacms/dist/react';

export function useJobsData() {
  return useTina({
    query: `
      query JobsQuery {
        jobConnection {
          edges {
            node {
              id
              _sys {
                filename
              }
              title
              location
              type
              shortDesc
              published
              tasks
              profile
              benefits
            }
          }
        }
      }
    `,
    variables: {},
    data: null,
  });
}
