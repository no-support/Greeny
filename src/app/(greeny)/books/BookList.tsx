'use client';
import { getBookList } from '@/app/api/fetch/plantFetch';
import Spinner from '@/components/spinner/Spinner';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import CardList from './CardList';
import { useSearchParams } from 'next/navigation';

export default function BookList() {
  console.log('NEXT_PUBLIC_LIMIT: ', process.env.NEXT_PUBLIC_LIMIT);
  console.log('NODE_ENV: ', process.env.NODE_ENV);
  console.log('REACT_EDITOR: ', process.env.REACT_EDITOR);
  const { ref, inView } = useInView();

  const params = useSearchParams();
  const grwhstleCode = params.getAll('grwhstleCode');
  const flclrCode = params.getAll('flclrCode');
  const fmldecolrCode = params.getAll('fmldecolrCode');
  const lefmrkCode = params.getAll('lefmrkCode');
  const lighttdemanddoCode = params.getAll('lighttdemanddoCode');
  const waterCycleCode = params.getAll('waterCycleCode');
  const keyword = params.get('keyword');

  const searchParams = {
    grwhstleCode,
    flclrCode,
    fmldecolrCode,
    lefmrkCode,
    lighttdemanddoCode,
    waterCycleCode,
    keyword,
  };

  // useSuspenseInfiniteQuery: null | undedined 체크할 필요 없이 data가 항상 있음을 보장
  // 로딩 상태(data가 undefined)일 때 보여줄 화면은 이 컴포넌트를 호출한 측에서 처리
  const { data, error, fetchNextPage, hasNextPage, isFetchingNextPage } = useSuspenseInfiniteQuery({
    queryKey: ['books', searchParams],
    queryFn: ({ pageParam }) => {
      return getBookList(pageParam, searchParams);
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.pagination.page < lastPage.pagination.totalPages) {
        return lastPage.pagination.page + 1;
      }
      return undefined;
    },
  });
  const total = data.pages.at(0)?.pagination.total;
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, inView, isFetchingNextPage]);

  if (error) return <div>Error</div>;
  const plants = data.pages.flatMap((page) => page.item);
  return (
    <>
      <div>검색 결과: {total}개</div>
      <CardList cards={plants} />

      {hasNextPage && (
        <div ref={ref} style={{ display: 'flex', justifyContent: 'center' }}>
          <Spinner size="lg" />
        </div>
      )}
    </>
  );
}
