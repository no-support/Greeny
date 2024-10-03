'use client';
import styles from './PageTemplate.module.scss';
import { useState } from 'react';
import { PlantBookmark, UserBookmark } from '@/types/bookmark';
import BookmarkForm from './(bookmarkForm)/BookmarkForm';
import Heading from '../../Heading';
import BookmarkList from './(bookmarkList)/BookmarkList';

interface PageTemplateProps {
  headingMsg: string;
  list: PlantBookmark[] | UserBookmark[];
  isMe: boolean;
  userId: string;
}

export default function PageTemplate({ headingMsg, list, isMe, userId }: PageTemplateProps) {
  const [bookmarkList, setBookmarkList] = useState(list);
  return (
    <div className={styles.template_wrapper}>
      <Heading>{headingMsg}</Heading>
      <div className={styles.content_wrapper}>
        <div className={styles.form_container}>
          <BookmarkForm followingList={bookmarkList} setFollowingList={setBookmarkList} />
        </div>
        <BookmarkList bookmarkList={bookmarkList} isMe={isMe} userId={userId} />
      </div>
    </div>
  );
}
