'use client';
import styles from './BookmarkList.module.scss';
import { isPlantBookmark, isUserBookmark, PlantBookmark, UserBookmark } from '@/types/bookmark';
import BookmarkItem from './(bookmarkItem)/BookmarkItem';
import { getBookmarksByUserId, removeBookmark } from '@/app/api/fetch/bookmarkFetch';
import { useBookmarkedSearchFormStore } from '@/store/store';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Spinner from '@/components/spinner/Spinner';
import Button from '@/components/button/Button';
import { useState } from 'react';
import { useSession } from 'next-auth/react';

interface BookmarkListProps {
  isMe: boolean;
  userId: string;
  type: 'plant' | 'user';
}

export default function BookmarkList({ isMe, userId, type }: BookmarkListProps) {
  const session = useSession();
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const queryClient = useQueryClient();
  const bookmarkQuery = useQuery({
    queryKey: ['bookmarkList', userId, type],
    queryFn: () => getBookmarksByUserId(userId),
  });
  const { data, isLoading, isError } = bookmarkQuery;

  const deleteBookmarkMutation = useMutation({
    mutationFn: (bookmarkId: number) => removeBookmark(bookmarkId, session.data!.accessToken!),
    onMutate: (bookmarkId) => {
      setDeletingId(bookmarkId);
      queryClient.invalidateQueries({ queryKey: ['bookmark', userId] });
    },
    onSuccess: () => {
      bookmarkQuery.refetch();
      setDeletingId(null);
    },
    onError: (error) => {
      console.log(error);
      setDeletingId(null);
    },
  });
  const keyword = useBookmarkedSearchFormStore((state) => state.keyword);

  if (!data || isLoading)
    return (
      <div className={styles.loading}>
        <Spinner />
      </div>
    );

  isError && <div>Error</div>;

  const bookmarkList = type === 'plant' ? data.product : data.user;

  if (isPlantBookmark(bookmarkList)) {
    const filteredData = filterPlants(bookmarkList, keyword);
    if (filteredData.length === 0) return <div className={styles.no_bookmark}>검색 결과가 없습니다.</div>;
    return (
      <ul className={styles.bookmark_list}>
        {filteredData.map((bookmarkItem) => (
          <BookmarkItem
            key={bookmarkItem._id}
            href={`/profile/${bookmarkItem.product._id}`}
            imgSrc={bookmarkItem.product.mainImages.at(0)!.path}
            name={bookmarkItem.product.name}
            createdAt={bookmarkItem.createdAt}
          >
            {isMe && (
              <Button
                onClick={() => {
                  deleteBookmarkMutation.mutate(bookmarkItem._id);
                }}
                bgColor="fill"
                btnSize="sm"
                radiusStyle="curve"
                disabled={deletingId === bookmarkItem._id}
              >
                {deletingId === bookmarkItem._id ? <Spinner size="xs" /> : <BookmarkDeleteSVG />}
              </Button>
            )}
          </BookmarkItem>
        ))}
      </ul>
    );
  } else if (isUserBookmark(bookmarkList)) {
    const filteredData = filterUsers(bookmarkList, keyword);
    if (filteredData.length === 0) return <div className={styles.no_bookmark}>검색 결과가 없습니다.</div>;
    return (
      <ul className={styles.bookmark_list}>
        {filteredData.map((bookmarkItem) => (
          <BookmarkItem key={bookmarkItem._id} href={`/profile/${bookmarkItem.user._id}`} imgSrc={bookmarkItem.user.image} name={bookmarkItem.user.name} createdAt={bookmarkItem.createdAt}>
            {isMe && (
              <Button
                onClick={() => {
                  deleteBookmarkMutation.mutate(bookmarkItem._id);
                }}
                bgColor="fill"
                btnSize="sm"
                radiusStyle="curve"
                disabled={deletingId === bookmarkItem._id}
              >
                {deletingId === bookmarkItem._id ? <Spinner size="xs" /> : <BookmarkDeleteSVG />}
              </Button>
            )}
          </BookmarkItem>
        ))}
      </ul>
    );
  }
}

const BookmarkDeleteSVG = () => {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.92334 4.42308C4.92334 3.36099 5.78433 2.5 6.84642 2.5C7.9085 2.5 8.76949 3.36099 8.76949 4.42308C8.76949 5.48516 7.9085 6.34615 6.84642 6.34615C5.78433 6.34615 4.92334 5.48516 4.92334 4.42308ZM6.84642 1.5C5.23205 1.5 3.92334 2.80871 3.92334 4.42308C3.92334 6.03745 5.23205 7.34615 6.84642 7.34615C8.46079 7.34615 9.76949 6.03745 9.76949 4.42308C9.76949 2.80871 8.46079 1.5 6.84642 1.5ZM6.82911 8.95999C7.59024 8.95701 8.33881 9.15396 8.99992 9.53115C9.23977 9.66799 9.54514 9.58449 9.68198 9.34464C9.81882 9.10479 9.73532 8.79942 9.49547 8.66257C8.68225 8.1986 7.76145 7.95633 6.82519 7.96C5.88893 7.96367 4.97005 8.21316 4.1605 8.68349C3.35095 9.15383 2.67911 9.82852 2.2122 10.6401C1.74533 11.4516 1.49973 12.3716 1.5 13.3078V14.923C1.5 15.1992 1.72386 15.423 2 15.423H6.84615C7.1223 15.423 7.34615 15.1992 7.34615 14.923C7.34615 14.6469 7.1223 14.423 6.84615 14.423H2.5V13.3075C2.49976 12.5463 2.69942 11.7985 3.07898 11.1387C3.45855 10.479 4.00473 9.93052 4.66285 9.54816C5.32098 9.1658 6.06798 8.96298 6.82911 8.95999ZM16.3533 11.0803C16.5486 11.2755 16.5486 11.5921 16.3533 11.7874L14.4238 13.7169L16.3533 15.6464C16.5486 15.8417 16.5486 16.1583 16.3533 16.3535C16.158 16.5488 15.8415 16.5488 15.6462 16.3535L13.7167 14.424L11.7871 16.3535C11.5919 16.5488 11.2753 16.5488 11.08 16.3535C10.8848 16.1583 10.8848 15.8417 11.08 15.6464L13.0096 13.7169L11.08 11.7874C10.8848 11.5921 10.8848 11.2755 11.08 11.0803C11.2753 10.885 11.5919 10.885 11.7871 11.0803L13.7167 13.0098L15.6462 11.0803C15.8415 10.885 16.158 10.885 16.3533 11.0803Z"
        fill="white"
      />
    </svg>
  );
};

function filterPlants(plantBookmarks: PlantBookmark[], keyword: string) {
  return plantBookmarks.filter((item) => item.product.name.toLowerCase().includes(keyword.toLowerCase()));
}
function filterUsers(userBookmarks: UserBookmark[], keyword: string) {
  return userBookmarks.filter((item) => item.user.name.toLowerCase().includes(keyword.toLowerCase()));
}
