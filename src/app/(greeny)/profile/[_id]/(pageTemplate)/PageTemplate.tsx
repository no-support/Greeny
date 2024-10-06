import styles from './PageTemplate.module.scss';
import BookmarkForm from './(bookmarkForm)/BookmarkForm';
import Heading from '../../Heading';
import BookmarkList from './(bookmarkList)/BookmarkList';
import { PlantBookmark, UserBookmark } from '@/types/bookmark';

interface PageTemplateProps {
  headingMsg: string;
  list: PlantBookmark[] | UserBookmark[];
  isMe: boolean;
  userId: string;
}

export default function PageTemplate({ headingMsg, list, isMe, userId }: PageTemplateProps) {
  return (
    <div className={styles.template_wrapper}>
      <Heading>{headingMsg}</Heading>
      <div className={styles.content_wrapper}>
        <div className={styles.form_container}>
          <BookmarkForm />
        </div>
        <BookmarkList list={list} isMe={isMe} userId={userId} />
      </div>
    </div>
  );
}
