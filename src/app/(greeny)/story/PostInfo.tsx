import styles from '@greeny/story/Community.module.scss';
import { formatAgo } from '@/utils/format';
import Like from '@greeny/story/Like';
import { PostRes } from '@/types/post';

export default async function PostInfo({ post, isLoggedin }: { post: PostRes; isLoggedin: boolean }) {
  return (
    <div className={styles.post_info}>
      <Like number={post.bookmarks} targetId={post._id.toString()} bookmarkId={post.myBookmarkId} content={post.content} isLoggedIn={isLoggedin} />
      <div className={styles.time_and_views}>
        <div>{formatAgo(post.createdAt)}</div>
        <div>조회수 {post.views}</div>
      </div>
    </div>
  );
}
