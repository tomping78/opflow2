import { useQuery } from 'react-query';
import { useState } from 'react';

/**
 * Pagination props type
 */
type UsePaginationProps<P> = {
  defaultParams: P;
  fetch: (args: P) => Promise<any>;
};

/**
 * Pagination hooks
 * @param defaultPage
 * @param fetch
 */
export function usePagination<T, P extends object>({
  defaultParams,
  fetch,
}: UsePaginationProps<P>) {
  const [pageParams, changeParams] = useState<P>(defaultParams);

  return {
    ...useQuery<T>(
      ['projects', pageParams.toString()],
      () => fetch(pageParams),
      {
        keepPreviousData: true,
      },
    ),
    changePage: changeParams,
  };
}
