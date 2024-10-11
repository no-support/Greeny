'use client';
import { useMutation, useQuery } from '@tanstack/react-query';
import styles from './Bookmark.module.scss';
import Button from '@/components/button/Button';
import { addBookmark, getMyBookmarks, removeBookmark } from '@/app/api/fetch/bookmarkFetch';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
import { UserBookmark } from '@/types/bookmark';
import Spinner from '@/components/spinner/Spinner';

export default function Bookmark() {
  const session = useSession();
  const { _id } = useParams<{ _id: string }>();

  const bookmarkQuery = useQuery({
    queryKey: ['bookmark', _id],
    queryFn: () => getMyBookmarks<UserBookmark>('user', session.data?.accessToken!),
  });
  const { status, data: myBookmarkedUsersData } = bookmarkQuery;

  const addMutation = useMutation({
    mutationFn: () => addBookmark('user', Number(_id), session.data?.accessToken!),
    onSuccess: () => {
      bookmarkQuery.refetch();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => removeBookmark(bookmarkedId!, session.data?.accessToken!),
    onSuccess: () => {
      bookmarkQuery.refetch();
    },
  });

  if (status === 'pending')
    return (
      <div className={styles.layout}>
        <Spinner />
      </div>
    );
  if (status === 'error') return <div>Error</div>;

  const bookmarkedUser = myBookmarkedUsersData.ok && myBookmarkedUsersData.item.find((userBookmark: UserBookmark) => String(userBookmark.user._id) === _id);
  const bookmarkedId = bookmarkedUser && bookmarkedUser._id;

  const handleClick = () => {
    if (bookmarkedId) {
      deleteMutation.mutate();
    } else {
      addMutation.mutate();
    }
  };

  return (
    <div className={styles.layout}>
      <Button onClick={handleClick} btnSize="xs" bgColor={bookmarkedId ? 'line' : 'fill'} radiusStyle="curve">
        {bookmarkedId ? '언팔로' : '팔로우'}
      </Button>
    </div>
  );
}
