import styles from './PageTemplate.module.scss';
import BookmarkForm from './(bookmarkForm)/BookmarkForm';
import Heading from '../../Heading';
import BookmarkList from './(bookmarkList)/BookmarkList';

interface PageTemplateProps {
  headingMsg: string;
  isMe: boolean;
  userId: string;
  type: 'plant' | 'user';
}

export default function PageTemplate({ headingMsg, isMe, userId, type }: PageTemplateProps) {
  return (
    <div className={styles.template_wrapper}>
      <Heading>{headingMsg}</Heading>
      <div className={styles.content_wrapper}>
        <div className={styles.form_container}>
          <BookmarkForm />
        </div>
        <BookmarkList isMe={isMe} userId={userId} type={type} />
      </div>
    </div>
  );
}
