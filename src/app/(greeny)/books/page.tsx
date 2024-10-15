import styles from './page.module.scss';
import Dialog from './Dialog';
import SearchForm from './SearchForm';
import BookList from './BookList';
import { Suspense } from 'react';
import Spinner from '@/components/spinner/Spinner';
import { TSearchParams } from '@/types/plant';

export default function Page({ searchParams }: { searchParams: TSearchParams }) {
  return (
    <div className={styles.page_container}>
      <div className={styles.search_container}>
        <div className={styles.heading_container}>
          <h2 className={styles.heading}>
            어떤 종류의
            <br />
            식물을 찾고 있나요?
          </h2>
        </div>

        <div className={styles.search_form}>
          <div className={styles.btn_wrapper}>
            <SearchForm />
            <Dialog />
          </div>
        </div>
      </div>
      <Suspense
        fallback={
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Spinner size="lg" />
          </div>
        }
      >
        <BookList searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
