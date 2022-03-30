import { usePagination } from './usePagination';
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';

export function useSearchParamPagination<T = any>(
  fetch: (params: URLSearchParams) => Promise<T>,
) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { changePage, ...rest } = usePagination<T, URLSearchParams>({
    defaultParams: searchParams,
    fetch: fetch,
  });

  useEffect(() => {
    changePage(searchParams);
  }, [searchParams]);

  return {
    ...rest,
    searchParams,
    changeSearchParams: setSearchParams,
  };
}
