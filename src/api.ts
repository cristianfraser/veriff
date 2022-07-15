import { useMutation, useQuery } from 'react-query';

type Check = {
  id: number;
  priority: number;
  description: string;
};

export function fetchChecks() {
  return new Promise((resolve, reject) =>
    setTimeout(
      () =>
        process.env.NODE_ENV === 'test' || Math.random() <= 0.8
          ? resolve([
              {
                id: 'aaa',
                priority: 10,
                description: 'Face on the picture matches face on the document',
              },
              {
                id: 'bbb',
                priority: 5,
                description: 'Veriff supports presented document',
              },
              {
                id: 'ccc',
                priority: 7,
                description: 'Face is clearly visible',
              },
              {
                id: 'ddd',
                priority: 3,
                description: 'Document data is clearly visible',
              },
            ])
          : reject({ success: false }),
      500
    )
  );
}

export const useFetchChecksQuery = () => {
  const { data, ...query } = useQuery<unknown, unknown, Check[]>(
    'fetch-checks',
    fetchChecks
  );

  return {
    checks: data || [],
    ...query,
  };
};

/**
 * @param {Object[]} results - The list of check results
 * @param {string} results[].checkId - Check id
 * @param {string} results[].result - Result value (yes / no)
 */
export function submitCheckResults(results: { [key: string]: string }) {
  return new Promise((resolve, reject) =>
    setTimeout(
      () =>
        Math.random() <= 0.8 ? resolve(results) : reject({ success: false }),
      500
    )
  );
}

export const useSubmitCheckResults = () => {
  const mutation = useMutation((data: { [key: string]: string }) => {
    return submitCheckResults(data);
  });

  return mutation;
};
