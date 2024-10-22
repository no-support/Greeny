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
import FollowerDelete from '@images/FollowerDelete.svg';
import { useRouter } from 'next/navigation';

interface BookmarkListProps {
  isMe: boolean;
  userId: string;
  type: 'plant' | 'user';
}

export default function BookmarkList({ isMe, userId, type }: BookmarkListProps) {
  const router = useRouter();
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
      /**
       * NOTE: 내 프로파일 페이지에서 식물/식집사 페이지로 이동 및 북마크 삭제 후 뒤로 가기를 누르면
       * 카운트가 줄지 않는 이슈 해결. 라우터 전체를 리프레시하는 게 효과적으로 보이진 않음.
       * /profile에서 export const revalidate = 0; 및 export const dynamic = "force-dynamic"을 해도 적용되지 않아
       * 아래 방법으로 해결
       */
      router.refresh();
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
                {deletingId === plantBookmark._id ? <Spinner size="xs" /> : <Image src={FollowerDelete} alt="북마크 삭제" width={18} height={18} />}
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
                {deletingId === userBookmark._id ? <Spinner size="xs" /> : <Image src={FollowerDelete} alt="북마크 삭제" width={18} height={18} />}
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
