'use client';
import styles from './BookmarkList.module.scss';
import { isPlantBookmark, isUserBookmark, PlantBookmark, UserBookmark } from '@/types/bookmark';
import BookmarkItem from './(bookmarkItem)/BookmarkItem';
import { removeBookmark } from '@/app/api/fetch/bookmarkFetch';
import { getBookmarksByUserId } from '@/app/api/fetch/userFetch';
import { useBookmarkedSearchFormStore } from '@/store/store';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Spinner from '@/components/spinner/Spinner';
import Button from '@/components/button/Button';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

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
    queryFn: async () => {
      const { item } = await getBookmarksByUserId(userId);
      return item;
    },
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
        {filteredData.map((plantBookmark) => (
          <BookmarkItem
            key={plantBookmark._id}
            href={`/profile/${plantBookmark.product._id}`}
            imgSrc={plantBookmark.product.mainImages.at(0)!.path}
            name={plantBookmark.product.name}
            createdAt={plantBookmark.createdAt}
          >
            {isMe && (
              <Button
                onClick={() => {
                  deleteBookmarkMutation.mutate(plantBookmark._id);
                }}
                bgColor="fill"
                btnSize="sm"
                radiusStyle="curve"
                disabled={deletingId === plantBookmark._id}
              >
                {deletingId === plantBookmark._id ? <Spinner size="xs" /> : <Image src="/images/FollowerDelete.svg" alt="북마크 삭제" width={18} height={18} />}
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
        {filteredData.map((userBookmark) => (
          <BookmarkItem key={userBookmark._id} href={`/profile/${userBookmark.user._id}`} imgSrc={userBookmark.user.image} name={userBookmark.user.name} createdAt={userBookmark.createdAt}>
            {isMe && (
              <Button
                onClick={() => {
                  deleteBookmarkMutation.mutate(userBookmark._id);
                }}
                bgColor="fill"
                btnSize="sm"
                radiusStyle="curve"
                disabled={deletingId === userBookmark._id}
              >
                {deletingId === userBookmark._id ? <Spinner size="xs" /> : <Image src="/images/FollowerDelete.svg" alt="북마크 삭제" width={18} height={18} />}
              </Button>
            )}
          </BookmarkItem>
        ))}
      </ul>
    );
  }
}

function filterPlants(plantBookmarks: PlantBookmark[], keyword: string) {
  return plantBookmarks.filter((plantBookmark) => plantBookmark.product.name.toLowerCase().includes(keyword.toLowerCase()));
}
function filterUsers(userBookmarks: UserBookmark[], keyword: string) {
  return userBookmarks.filter((userBookmark) => userBookmark.user.name.toLowerCase().includes(keyword.toLowerCase()));
}
